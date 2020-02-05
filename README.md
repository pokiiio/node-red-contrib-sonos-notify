# node-red-contrib-sonos-notify

***The most simple node for Sonos ever.***

![ポキオ Sonos IFTTT](https://lh3.googleusercontent.com/EL4CbWEkowVlXIqRIj1fy_TFtY896akj4HCRswZMzlEGuzsDPb-txWcreQ34KQhR2p4p3EYh4zWiradQS-f6kvtQ9QQfS7kM_HG9lNOE2wq6JjguI0wcfI5ScDkyWH7U4M_RjEx-uwM=s600 "ポキオ Sonos IFTTT")

This node receives music track updates from Sonos devices and notifies track infomation to the next node. Sonos devices must be on the same local network.


# Settings

To use this node, following parameters are required.

 - Address
     - A local IP address of the target Sonos device.
 - Port
     - A port number of the target Sonos devices. 

## Experimental Feature : Auto Device Discovery (from ver. 0.1.0)
If parameters above are not configured, this node will search Sonos devices on the local network and notify music update of all Sonos devices found.

# Usage

If the target Sonos device starts playing new track, the infomation will be notified to the next node. Enjoy!  


# Special Thanks

 - https://www.npmjs.com/package/sonos