// All the code is nasty, don't use it, please

'use strict'

var $ribbon = $('.ribbon')
  , $ribbonBefore = $('> :first-child', $ribbon)
  , $ribbonAfter = $('> :last-child', $ribbon)

  , $i = $('i', $ribbon)
  , $iBefore = $('> :first-child', $i)
  , $iAfter = $('> :last-child', $i)

  , $u = $('u', $ribbon)
  , $uBefore = $('> :first-child', $u)
  , $uAfter = $('> :last-child', $u)

var Color = net.brehaut.Color
    // By default, take a color from this theme http://kuler.adobe.com/#themeID/2221 (Kuler API sucks)
  , startColors = ['#FFF8E3', '#CCCC9F', '#33332D', '#9FB4CC', '#DB4105']
  , color = null
  , styleSheet = document.styleSheets[1];


/*
location.hash && !function() {
    var data = location.hash.split(',')
    if (Color.isValid(data[0])) {
        color = data[0]
        $u.text(data[1])
    }
}()
*/

$('input[type=color]')
.on('change', function(e) {
    color = new Color(this.value)

    $u.css('background', '-webkit-linear-gradient(' + color.toCSS() + ', ' + color.darkenByAmount(.12).toCSS() + ')')

    // To HSLA à faire
    var moins10 = color.darkenByAmount(.3)
      , hsla = 'hsla(' + moins10.hue + ', ' + moins10.saturation * 100 + '%, ' + moins10.value * 100 + '%, '

    $u.css('text-shadow', '0 1px 1px ' + hsla + '.8), 0 2px 1px ' + hsla + '.6)')

    var moins14 = color.darkenByAmount(.12).toCSS()
    $ribbonBefore.css('border-color', moins14 + ' ' + moins14 + ' ' + moins14 + ' transparent')
    $iBefore.css('border-color', moins14 + ' transparent ' + moins14 + ' ' + moins14)

    var moins20 = color.darkenByAmount(.20).toCSS()

    $iAfter.css('border-color', 'transparent transparent ' + moins20 + ' transparent')
    $uAfter.css('border-color', 'transparent transparent ' + moins20 + ' transparent')
    $uBefore.css('background', moins20)


    styleSheet.insertRule('.ribbon u::selection { background-color: ' + moins20 + ' }');
    styleSheet.insertRule('.ribbon u::-moz-selection { background-color: ' + moins20 + ' }');
})
.val(
    (function() {
        return color = color || startColors[~~(Math.random() * startColors.length)]
    })()
)
.change()

$u.on('blur', function(e) {
    location.hash = [color.toCSS().substr(1), this.innerText].join(',')
})



$('input[type=range]').on('change', function(e) {
    $('div').css('max-width', this.value)
})

$('input[type=button]').on('click', function(e) {
  $ribbon.toggleClass('up down');
})