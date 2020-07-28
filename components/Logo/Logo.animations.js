import Vue from 'vue';

export class PlayLogoAnimations {
  $anime = Vue.prototype.$anime;
  color = {
    red: 'rgba(238, 51, 51, 1)',
    black: 'rgba(50, 49, 47, 1)',
    bg: '#FBF7ED'
  }

  constructor() {
    this._playLogoStrokeRevealAnim();
    this._playLogoFlashAnim();
    this._playRoleAnim();
    this._playGridAnimation();
  }

  _playGridAnimation() {
    const getLines = (direction) => Array.from({length: 14}).map((_, index) => '#grid-' + direction + (index + 1));
    this.$anime.timeline({
      easing: 'easeInOutExpo',
      duration: 1600,
      direction: 'alternate'
    })
    .add({
      targets: getLines('v'),
      strokeDashoffset: [this.$anime.setDashoffset, 0],
      delay: this.$anime.stagger(100),
    })
    .add({
      targets: getLines('h'),
      strokeDashoffset: [this.$anime.setDashoffset, 0],
      delay: this.$anime.stagger(100),
    }, 300)
  }

  _playLogoStrokeRevealAnim() {
    this.$anime.timeline({
      targets: [
        '#a-logo-letter #a-asta', 
        '#a-logo-letter #a-bucle',
        '#s-logo-letter #s-bucle',
        '#m-logo-letter #m-bucle-1',
        '#m-logo-letter #m-bucle-2',
      ],
      easing: 'easeInOutQuart',
      delay: this.$anime.stagger(250),
    })
      .add({
        strokeOpacity: [0, 1],
        strokeDashoffset: [this.$anime.setDashoffset, 0],
        duration: 1400,
      })
      .add({
        strokeOpacity: [1, 0],
        duration: 500,
        easing: 'linear',
      }, '-=250')
  }

  _playLogoFlashAnim() {
    const flash = color => [
      {value: this.color.bg, duration: 50},
      {value: color, duration: 50},
      {value: this.color.bg, duration: 150},
      {value: color, duration: 500} 
    ]
    this.$anime.timeline({ easing: 'easeInOutQuart', delay: 1800})
      .add({
        targets: '#a-logo-letter #a-bucle',
        fill: flash(this.color.black),
      }, 0)
      .add({ 
        targets: '#a-logo-letter #a-asta', 
        fill: flash(this.color.red), 
      }, 150)
      .add({ 
        targets: '#s-logo-letter #s-bucle', 
        fill: flash(this.color.red), 
      }, 500)
      .add({ targets: '#m-logo-letter #m-bucle-2', fill: flash(this.color.black), }, 900)
      .add({ targets: '#m-logo-letter #m-bucle-1', fill: flash(this.color.red), }, 1050)
  }

  _playRoleAnim() {
    this.$anime.timeline({
      easing: 'easeInOutExpo',
      delay: 1400
    })
    .add({ targets: '.Logo', translateY: 0, opacity: 1 }, 0)
    .add({ targets: '.Role', scaleY: 1, translateY: 0, opacity: 1 }, 0)
    .add({ 
      targets: '.RoleText', 
      opacity: 1, 
      translateX: 0, 
      // easing: 'spring(1, 70, 10, 0)',
      delay: this.$anime.stagger(250)
    }, '-=300')
  }

}