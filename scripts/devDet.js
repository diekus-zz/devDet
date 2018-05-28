let detectedDevice = null;

let vrDetection = function(){
    if(navigator.getVRDisplays) {
        console.log('WebVR 1.1 supported');
        navigator.getVRDisplays().then(function(displays) {
            if(displays.length > 0) { // if there are VR devices present
                detectedDevice = displays[0];
                console.log(detectedDevice.displayName); 
            }
            else{ // if there are no vr devices present adds cursor
                console.log('no device detected'); 
                do_devDet_0DoF(-1);
            }
        });
      }
      else{
          console.log('No WebVR support'); // adds cursor
          do_devDet_0DoF(-1);
      }
};

document.addEventListener('DOMContentLoaded', function() {
    vrDetection();
    controller_detection();
});

let controller_detection = function(){
    if(navigator.getGamepads != null){
        window.addEventListener("gamepadconnected", function(e) {
            console.log(`controller ${e.gamepad.index} (${e.gamepad.id}) connected`);
            if(e.gamepad.pose && e.gamepad.pose.hasOrientation && e.gamepad.pose.hasPosition){
                do_devDet_6DoF(e.gamepad.index, e.gamepad.hand);
            }
            else if(e.gamepad.pose && e.gamepad.pose.hasOrientation){
                do_devDet_3DoF(e.gamepad.index, e.gamepad.hand);
            }
            else {
                do_devDet_0DoF(e.gamepad.index);
            }
        });
        window.addEventListener("gamepaddisconnected", function(e) {
            console.log(`controller ${e.gamepad.index} (${e.gamepad.id}) disconnected`);
            do_devDet_disconnect(e.gamepad.index);
        });
    }
};