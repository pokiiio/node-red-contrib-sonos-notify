# node-red-contrib-sonos-notify

***The most simple node for Sonos ever.***

![ポキオ Sonos IFTTT](https://lh3.googleusercontent.com/EL4CbWEkowVlXIqRIj1fy_TFtY896akj4HCRswZMzlEGuzsDPb-txWcreQ34KQhR2p4p3EYh4zWiradQS-f6kvtQ9QQfS7kM_HG9lNOE2wq6JjguI0wcfI5ScDkyWH7U4M_RjEx-uwM=s600 "ポキオ Sonos IFTTT")

This node receives music track updates from Sonos devices and notifies track infomation to the next node. Sonos devices must be on the same local network.


# Settings

To use this node, no configurations required. This node will search Sonos devices on the local network and notify music update of all Sonos devices found.


If you configure parameters below, you can also specify a Sonos device which you want to get notify from. 

 - Address
     - A local IP address of the target Sonos device.
 - Port
     - A port number of the target Sonos devices. 


> And from 0.1.7, this node supports more events like `Volume` and `PlayState`. It can be enabled from properties of the node.
> 
> ![ポキオ Node-RED Sonos](https://lh3.googleusercontent.com/sDfTjlGjKgWsBaJMuabJJ3PR6MegaXUvyx3gb3a2H-nkniTpZaOGNh5dNackDWwoysAltz2TaTyTtTOYtBOjiOG8T4VTPvSKDlilRFol060IOXaQsF7Y1eeixql20oYIVqtTXbJ9KmQ=s600 "ポキオ Node-RED Sonos")


# Usage

If the target Sonos device starts playing new track, the infomation will be notified to the next node. Enjoy!  

Following is a sample output.

```json
{
    "name": "Living Room",   // a name of Sonos player.
    "event": "CurrentTrack",   // event kind. if `More Events` is checked, this may vary.
    "address": "192.168.1.35",   // an ip address of Sonos player.
    "payload": {   // current track info is included in `payload`.
        "id": null,
        "parentID": null,
        "title": "Scream & Shout",
        "artist": "will.i.am",
        "album": "#willpower",
        "albumArtURI": "https://i.scdn.co/image/ab67616d0000b2738165b764264fb3705d7367d6",
        "uri": "x-sonos-spotify:spotify:track:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "duration": 282,
        "queuePosition": 1
    },
    "_msgid": "xxxxxxxx.xxxxxx"
}
```



# Special Thanks

 - https://www.npmjs.com/package/sonos
