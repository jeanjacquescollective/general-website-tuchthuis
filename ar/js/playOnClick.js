AFRAME.registerComponent('video-handler',{
  init: function(){
   let el = this.el;
   let video = document.querySelector("a-video");
   // video.pause();
   el.addEventListener('mouseenter',function(){
      video.play();
   });
   el.addEventListener('mouseleave',function(){
      video.pause();
   });
  }
});
