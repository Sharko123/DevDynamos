import os
import click
import librosa
import numpy as np
import utilities
from drums_generator import predict
from methods import beat_tracking
from methods.bass_generator import generate_bass
from methods.chord_recognition import rearrange_by_chord_recognition, chord_rec
from drums_generator.midi2wav import convert_midi_to_wav
from methods.novelty_detection import NoveltyDetection
import soundfile as sf


def beat_maker(track_name, drums, bass, k):
    # audio processing
    audio_path = "{}".format(track_name)
    audio_data, samp_rate = utilities.get_wav_data(audio_path)
    audio_data, index = librosa.effects.trim(audio_data)

    # apply clustering and splitting the track into k-clusters
    intervals, bound_segs = NoveltyDetection(audio_data, samp_rate, k).novelty_detection()
    print(intervals)
    print(samp_rate)
    print("AUDIODATA", len(audio_data))
    # beat tracking and rearranging each interval by chord detection
    remix = list()
    for interval in intervals:
        try:
            time_1, time_2 = np.array([(interval[0] * samp_rate).astype(np.int32), (interval[1] * samp_rate).astype(np.int32)])
            tempo, bt_slices = beat_tracking.slice_by_beat_tracking(audio_data[time_1:time_2],
                                                                    samp_rate)
            inner_arrangement = audio_data[time_1:time_2]
        except:
            continue
        remix.append(inner_arrangement)

    # rearranging the clusters
    remix = rearrange_by_chord_recognition(remix, samp_rate)
    print("REMIX", remix)
    print(len(remix))

    tempo, beats = librosa.beat.beat_track(y=remix, sr=samp_rate)

    # bass generation into midi file and converting the midi to wav file
    if bass:
        chord_times = np.ediff1d(librosa.frames_to_time(beats, sr=samp_rate)[::4] * 1000)
        chords = chord_rec(remix, samp_rate)
        midi_bass = generate_bass(chords, tempo, chord_times)
        print(midi_bass)
        midi_bass.save('latest_bass.mid')
        convert_midi_to_wav('latest_bass.mid', 'latest_bass.wav')

        bass_wav_data, _ = utilities.get_wav_data('latest_bass.wav')
        print("BASS", bass_wav_data.shape)
        print(bass_wav_data)
        bass_wav_data = (librosa.util.normalize(bass_wav_data))
        print(bass_wav_data)

    else:
        bass_wav_data = np.zeros(remix.shape)
        print("No bass")

    # drums generation into midi file and converting the midi to wav file
    if drums:
        midi_drums = predict.generate(tempo=tempo)
        midi_drums.save('latest_drums.mid')
        convert_midi_to_wav('latest_drums.mid', 'latest_drums.wav')

        drums_wav_data, _ = utilities.get_wav_data('latest_drums.wav')
        drums_wav_data = (librosa.util.normalize(drums_wav_data)) * 2

    else:
        drums_wav_data = np.zeros(remix.shape)

    # sync
    remix_wav_data = librosa.util.normalize(remix)
    print(drums_wav_data.shape)
    print(drums_wav_data)
    remix_wav_len = remix_wav_data.shape[0]
    drums_wav_len = (drums_wav_data.shape[0])
    bass_wav_len = (bass_wav_data.shape[0])
    print(remix_wav_data.shape)

    min_length = min(remix_wav_len, drums_wav_len, bass_wav_len)
    print(min_length)

    wav_data = remix_wav_data[:min_length] + drums_wav_data[:min_length] + bass_wav_data[:min_length]

    return wav_data, samp_rate



def main(track, drums, bass, k, output_audio_path):
    final_res, samp_rate = beat_maker(track, drums, bass, k)
    print("DONE WITH THIS YYAYYAYA~!!!!")
    sf.write(f'{output_audio_path}', final_res, samp_rate)
