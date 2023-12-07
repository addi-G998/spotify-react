# spotify-react
You want to play music from spotify on your website, but don't want to build the actual player? Worry not

Check out my GH-Pages https://addi-g998.github.io/spotify-react/# (Since the API is currently in Developer mode only a few selected people can actually use the music feature)

Due to complexity i'm not gonna explain how to connect to the API.



<img width="945" alt="spotify" src="https://github.com/addi-G998/spotify-react/assets/66442736/5db9050f-6d65-4552-9dac-544fb9575e4a">

This is what it's going to look like

`<iframe
            className="h-[352px] w-[100%] rounded-lg"
            src={`https://open.spotify.com/embed/track/${song}?utm_source=generator`}             //use embeded spotify player with modifiable song id
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>`
