var Stopwatch = function(id, delay) {

  var _elements = {
    stopwatch:     document.querySelector("#" + id),

    numbers: {
      hundreds:    document.querySelector("#" + id + " .hundreds"),
      tens:        document.querySelector("#" + id + " .tens"),
      ones:        document.querySelector("#" + id + " .ones"),
      tenths:      document.querySelector("#" + id + " .tenths"),
      hundredths:  document.querySelector("#" + id + " .hundredths"),
    },

    buttons: {     
      start:       document.querySelector("#" + id + " .start"),
      stop:        document.querySelector("#" + id + " .stop"),
      reset:       document.querySelector("#" + id + " .reset"),
    }
  };
  
  var _delay = Math.abs(_elements.stopwatch.dataset.delay) || 1000;
  var _interval;
  var _offset;
  var _clock;
  
  //Initialize
  init();
  
  function init() {
    reset();
    attachButtonEvent(_elements.buttons.start, start);
    attachButtonEvent(_elements.buttons.stop,  stop);
    attachButtonEvent(_elements.buttons.reset, reset);
  }
  
  function attachButtonEvent(button, handler) {
    if (button) {
      button.addEventListener("click", function(event) {
        event.preventDefault();
        handler();
      });
    }
  }
  
  function setStatus(status) {
    _elements.stopwatch.dataset.status = status;
  }
  
  function start() {
    if (!_interval) {
      _offset   = Date.now();
      _interval = setInterval(update, _delay);
      setStatus("running");
    }
  }
  
  function stop() {
    if (_interval) {
      clearInterval(_interval);
      _interval = null;
      setStatus("stopped");
    }
  }
  
  function reset() {
    _clock = 0;
    render(0);
  }
  
  function update() {
    _clock += delta();
    render();
  }
  
  function delta() {
    var now = Date.now();
    var d   = now - _offset;
    
    _offset = now;
    return d;
  }
  
  function render() {
    var numbers = getNumbers(_clock);
    updateElements(numbers);
  }
  
  function getNumbers(clock) {
    var value = clock / 1000;
    
    var valueIntPart = intPart(value);
    var valueDecPart = decPart(value, 2);
    
    return {
      hundreds:   hundreds(valueIntPart),
      tens:       tens(valueIntPart),
      ones:       ones(valueIntPart),
      tenths:     tens(valueDecPart),
      hundredths: ones(valueDecPart),
    };
  }
  
  function updateElements(numbers) {
    Object.keys(numbers).forEach(function(key) {
      var element = _elements.numbers[key];
      if (element) {
        element.innerHTML = numbers[key];
        element.dataset.value = numbers[key];
      }
    });
  }
  
  function intPart(number) {
    return number | 0;
  }
  
  function decPart(number, numberOfDecimals) {
    return parseInt(parseFloat(number).toFixed(numberOfDecimals).split(".")[1]);
  }
  
  function hundreds(number) {
    return number % 1000 / 100 | 0;
  }
  
  function tens(number) {
    return number % 100 / 10 | 0;
  }
  
  function ones(number) {
    return number % 10;
  }
  
  this.start = start;
  this.stop  = stop;
  this.reset = reset;
};