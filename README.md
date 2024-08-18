# DevDynamos
## Inspiration
We wanted to create a way for small artists to find a simple way to share their music with the world and provide tools to help them with their creations. Small artists especially would benefit from a beat generator for their music, so we created a beat generator using machine learning, eliminating the need to hire a dedicated producer. We also noticed that people enjoy scrolling, like on TikTok, so we decided to create BeatTok, where people can scroll through different user-uploaded music/beats.
## What it does
An artist can upload their track to our app, and it will automatically add drums and/or bass to their track through a Machine Learning model. This is a simple free way that users can add beats to their music without having to hire expensive production services, benefiting small artists significantly. Moreover, users who want to listen to music/beats can do so simply by scrolling through different creators' music. If they like something, they can download it and play it again later or use it themselves. We also created a login and signup page for users.
## How we built it
Our Machine Learning model uses Long Short-Term Memory (LSTM) to add bass/drums to our music. An LSTM is a type of Recurrent Neural Network that specializes in remembering past information. We took advantage of an open-source pretrained model to power our generation algorithm. Next, we used Python in the backend to interact and get results from the model. Specifically, to connect the frontend with the model, we used flask within Python. For the frontend, we used typescript with next.js.
## Challenges we ran into
Creating an infinitely scrolling system
Beat visualization with music
Connecting the frontend with the backend
Modifying the open-source model to work with our app
## Accomplishments that we're proud of
We are proud of our frontend design, as we believe that the web app is very aesthetically pleasing and smooth. We are also proud of our ability to overcome challenges in getting the frontend and backend to work together and modify the machine learning model as needed.
## What we learned
We learned that machine learning models have far-reaching abilities and potential through working with the beat generator. We also learned that connecting the backend to frontend is more challenging than it seems, as it was our primary challenge.
## What's next for BeatGen AI beat generator
In the future, we hope to create a mobile app as well, to expand its reach. We also plan to add more features, such as more rigorous authentication as well as a user karma system based on quality of beats. Lastly, we would polish the web app and finish some aspects of our existing features.
