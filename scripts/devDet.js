let detectedDevice;

let deviceDetection = function(){
    if(navigator.getVRDisplays) {
        console.log('WebVR 1.1 supported');
        navigator.getVRDisplays().then(function(displays) {
            if(displays.length > 0) {
                detectedDevice = displays[0];
                console.log(detectedDevice.displayName);
                window.addEventListener("gamepadconnected", function(e) {
                    console.log(`controller ${e.gamepad.index} (${e.gamepad.id}) connected`);
                    if(e.gamepad.pose && e.gamepad.pose.hasOrientation && e.gamepad.pose.hasPosition){
                        do_devDet_6DoF(e.gamepad.id);
                    }
                    else if(e.gamepad.pose && e.gamepad.pose.hasOrientation){
                        do_devDet_3DoF(e.gamepad.id);
                    }
                    else {
                        do_devDet_0DoF();
                    }
                });
                window.addEventListener("gamepaddisconnected", function(e) {
                    console.log(`controller ${e.gamepad.index} (${e.gamepad.id}) disconnected`);
                    do_devDet_disconnect(e.gamepad.id);
                });
            }
            else{
                console.log('no device detected'); // adds cursor
                do_devDet_0DoF();
            }
        });
      }
      else{
          console.log('No WebVR support'); // adds cursor
          do_devDet_0DoF();
      }
};

document.addEventListener('DOMContentLoaded', function() {
    deviceDetection();
});