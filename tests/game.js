 // TODO: Use angular and jQuery
(function () {
  var collider = {
    _comEnergy: 500,  // GeV
    _luminosity: 1.,  // TODO: some unit
    collide: function () {
      return this._comEnergy * this._luminosity;  // or something that makes a little bit more sense...
    }
  };

  var detector = {
    _efficiency: .8,
    _view: document.getElementById('Detector'),
    click: function () {
      lab.acquire(collider.collide() * this._efficiency);
    }
  };

  var lab = {
    _name: 'My Awesome Lab',
    _data: 0,
    _money: 0,
    _view: document.getElementById('Lab'),
    updateView: function () {
      this._view.innerHTML = '<h1>' + this._name + '</h1><p>Data: ' + this._data + '</p><p>Money: ' + this._money + '</p>';
    },
    acquire: function (amount) {
      this._data += amount;
    },
    discover: function (cost) {
      if (this._data >= cost) {
        this._data -= cost;
        return true;
      }
      return false;
    },
    grant: function (amount) {
      this._money += amount;
    }
  };

  var discoveries = {
    _items: {
      'e': {
        name: 'Electron',
        description: 'It\'s an electron. Seriously nothing special.',
        cost: 10,
        grant: 5,
        discovered: true
      },
      'W': {
        name: 'W-Boson',
        description: 'The W-Boson is the carrier particle of the weak force.',
        cost: 100000,
        grant: 5000,
        discovered: false
      },
      'Higgs': {
        name: 'Higgs-Boson',
        description: 'The Higgs mechanism explains masses of elementary particles...',
        cost: 1000000000,
        grant: 2500000,
        discovered: false
      }
    },
    _view: document.getElementById('Discoveries'),
    updateView: function () {
      this._view.innerHTML = '<h1>Discoveries</h1>';
      for (var key in this._items) {
        var item = this._items[key];
        this._view.innerHTML += '<div id="Discovery' + key + '"><h2>' + item.name + '</h2>';
        if (!item.discovered) {
          this._view.innerHTML += '</p><button>Discover ('+ item.cost + ' data)</button>';
        } else {
          this._view.innerHTML += '<p>' + item.description + '</p>';
        }
        this._view.innerHTML += '</div>';
      }
    },
    discover: function (key) {
      var item = this._items[key];
      if (item && !item.discovered && lab.discover(item.cost)) {
        item.discovered = true;
        lab.grant(item.grant);
      }
    }
  };

  var hr = {
    _personel: {
      'PhDstud': {
        name: 'PhD Students',
        description: 'Basically slaves, just with fewer rights.',
        cost: 100,
        hired: 0
      },
      'Postdoc': {
        name: 'Postdocs',
        description: 'Can do shit for money.',
        cost: 10000,
        hired: 0
      },
    },
    _view: document.getElementById('HR'),
    updateView: function () {
      this._view.innerHTML = '<h1>HR Department</h1>';
      for (var key in this._personel) {
        var person = this._personel[key];
        this._view.innerHTML += '<div id="Person' + key + '"><h2>' + person.name + '</h2><p>' + person.description + '</p><p>You have ' + person.hired + ' ' + person.name + '</p><button>Hire (' + person.cost + ' money)</button></div>';
      }
    },
    hire: function (key) {
      var person = this._personel[key];
      if (person && lab.hire(person.cost)) {
        person.hired++;
      }
    }
  };

  // set up clicky stuff
  var clickers = [detector];
  for (var i = 0; i < clickers.length; i++) {
    var c = clickers[i];
    c._view.onclick = function () {
      c.click();
      updateViews();
    }
  }

  var updateViews = function () {
    lab.updateView();
    discoveries.updateView();
    hr.updateView();
  };

  updateViews();
})();
