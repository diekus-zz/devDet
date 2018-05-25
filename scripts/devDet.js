let detectedDevice;

//device detection
function deviceDetectionAF(){
    navigator.getVRDisplays().then(function (displays) {
        if(AFDevice.isGearVR()){
            detectedDevice = device.type.GEARVR;
        }
        else if(AFDevice.isMobile()){
            detectedDevice = device.type.MOBILE;
        }
        else if (displays.length > 0){ //trys to match high end headsets
             switch (displays[0].displayName) {
                case 'Oculus VR HMD':
                    detectedDevice = device.type.RIFT;
                    break;
                case 'HTC Vive MV':
                    detectedDevice = device.type.VIVE;
                    break;          
                default: //undetected
                    console.log('undetected device name: ' + displays[0].displayName);
                    break;
            }
        }
        else {detectedDevice = device.type.UNKNOWN;}
        displayDevice = displays[0];
    });
};

let deviceDetection = function(){
    if(navigator.getVRDisplays) {
        console.log('WebVR 1.1 supported');
        navigator.getVRDisplays().then(function(displays) {
          if(displays.length > 0) {
            detectedDevice = displays[0];
          }
          else{
              console.log('no device detected');
          }
        });
      }
      else{
          console.log('No WebVR support');
      }
};

deviceDetection();