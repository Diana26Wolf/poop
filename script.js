Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90,
    flip_horiz: true
})
camera= document.getElementById("camera")
Webcam.attach("#camera")
function capture(){
    Webcam.snap(
        function(data_uri){
                document.getElementById("result").innerHTML= "<img id='captured_img' src= '"+data_uri+"'>";
        }
    )
}
//teachable machine starts here
var p1= ""
var p2= ""
console.log("ml5 version", ml5.version)
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/J7qVKtPWf/model.json", modelLoaded)
function modelLoaded(){
    console.log("model loaded successfully")
}
function speak(){
    var synth= window.speechSynthesis
     spk1= "The first prediction is" + p1
     spk2= "The second prediction is" + p2
    var utterThis= new SpeechSynthesisUtterance(spk1 + spk2)
    synth.speak(utterThis)
}
function compare(){
    img=document.getElementById("captured_img")
    classifier.classify(img, gotResult)
}
function gotResult(error, results){
if(error){
console.error(error)
}
else{
    console.log(results)
    p1= results[0].label
    p2= results[1].label
    document.getElementById("e1").innerHTML=p1
    document.getElementById("e2").innerHTML=p2
    speak()
    if(p1=="Left"){
        document.getElementById("emoji1").innerHTML="&#128072"
    }
    if(p1=="Good"){
        document.getElementById("emoji1").innerHTML="&#128076"
    }
    if(p1=="Down"){
        document.getElementById("emoji1").innerHTML="&#128071"
    }

    if(p2=="Left"){
        document.getElementById("emoji2").innerHTML="&#128072"
    }
    if(p2=="Good"){
        document.getElementById("emoji2").innerHTML="&#128076"
    }
    if(p2=="Down"){
        document.getElementById("emoji2").innerHTML="&#128071"
    }
    
}
}
