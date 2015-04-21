var OneDigitProto = Object.create(HTMLElement.prototype);

Object.defineProperty(OneDigitProto, "numbers", {
  value: {
    1: [
      0,0,0,1,
      0,0,0,1,
      0,0,0,1,
      0,0,0,1,
      0,0,0,1,
    ],
    2: [
      1,1,1,1,
      0,0,0,1,
      1,1,1,1,
      1,0,0,0,
      1,1,1,1,
    ],
    3: [
      1,1,1,1,
      0,0,0,1,
      1,1,1,1,
      0,0,0,1,
      1,1,1,1,
    ],
    4: [
      1,0,0,1,
      1,0,0,1,
      1,1,1,1,
      0,0,0,1,
      0,0,0,1,
    ],
    5: [
      1,1,1,1,
      1,0,0,0,
      1,1,1,1,
      0,0,0,1,
      1,1,1,1,
    ],
    6: [
      1,1,1,1,
      1,0,0,0,
      1,1,1,1,
      1,0,0,1,
      1,1,1,1,
    ],
    7: [
      1,1,1,1,
      0,0,0,1,
      0,0,0,1,
      0,0,0,1,
      0,0,0,1,
    ],
    8: [
      1,1,1,1,
      1,0,0,1,
      1,1,1,1,
      1,0,0,1,
      1,1,1,1,
    ],
    9: [
      1,1,1,1,
      1,0,0,1,
      1,1,1,1,
      0,0,0,1,
      1,1,1,1,
    ],
    0: [
      1,1,1,1,
      1,0,0,1,
      1,0,0,1,
      1,0,0,1,
      1,1,1,1,
    ],
  }
});

OneDigitProto.createdCallback = function() {
  var color  = this.dataset.color || "darkseagreen";
  var size   = this.dataset.size  || 20;
  var styles = "<style>:host{display:inline-block;font-size:0;}.block{width:" + size + "px;height:" + size + "px;display:inline-block;}.block.active{background:" + color + ";}</style>";
  var divs   = ('<div>' + '<div class="block"></div>'.repeat(4) + "</div>").repeat(5);

  this.createShadowRoot().innerHTML = styles + divs;
  OneDigitProto.setNumber(this, this.dataset.value || 0);
};

OneDigitProto.setNumber = function(element, value) {
  var divs   = element.shadowRoot.querySelectorAll(".block");
  var number = OneDigitProto.numbers[value];
  if (divs && number) {
    for (var i = 0, length = divs.length; i < length; i++) {
      divs[i].className = (number[i] === 1) ? "block active" : "block";
    }
  }
};

OneDigitProto.attributeChangedCallback = function(attrName, oldValue, newValue) {
  switch (attrName) {
    case "data-value":
      OneDigitProto.setNumber(this, newValue);
      break;
  }
};

document.registerElement("one-digit", {prototype: OneDigitProto});