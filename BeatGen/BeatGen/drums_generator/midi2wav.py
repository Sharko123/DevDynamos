import ctypes.util
from midi2audio import FluidSynth
import os

orig_ctypes_util_find_library = ctypes.util.find_library


def proxy_find_library(lib):
    if lib == 'fluidsynth':
        return 'libfluidsynth.so.1'
    else:
        return orig_ctypes_util_find_library(lib)

ctypes.util.find_library = proxy_find_library


def convert_midi_to_wav(midi_path, output_path, sound_font=None):
    # Get the directory of the current script (predict.py)
    script_dir = os.path.dirname(__file__)

    # Construct the path to the SoundFont file
    soundfont_path = os.path.join(script_dir, '808.sf2')
    fs = FluidSynth(soundfont_path)
    fs.midi_to_audio(midi_path, output_path)
