$(document).ready(function () {
  var page = $('.page');
  var w = $(window);

  svg4everybody();

  // tabs
  (function () {
    var tabContents = $('.tab-content');
    var tabMetas = $('.tab-meta');
    var tabItems;

    function changeTab() {
      if (window.location.hash) {
        var tabContentId = window.location.hash;
        var tabMeta = tabContentId.slice(1, tabContentId.length);
        var tabLink = $('.tabs__link[href="' + tabContentId + '"]');
        tabItems = tabLink.closest('.tabs').find('.tabs__item');
        tabContents.removeClass('tab-content--active');
        tabMetas.removeClass('tab-meta--active');
        tabItems.removeClass('tabs__item--active');
        $(tabContentId).addClass('tab-content--active');
        $('.tab-meta[data-tab="' + tabMeta + '"]').addClass('tab-meta--active');
        tabLink.closest('.tabs__item').addClass('tabs__item--active');
        window.location.hash = tabContentId;
      }
    }

    function pageLoadChangeTab() {
      changeTab();
      setTimeout(function () {
        window.scrollTo(0, 0);
      });
    }

    pageLoadChangeTab();

    $('.tabs__link').on('click', changeTab);

    $(window).on('hashchange', changeTab);

    $('.side-menu .tabs__link').on('click', function () {
      page.removeClass('page--no-scroll');
    });

    $('.side-menu .tabs__link').on('click', function () {
      var sideMenu = $(this).closest('.side-menu');
      sideMenu.removeClass('side-menu--visible');
    });
  })();

  // side-menu
  $('.side-menu__close').on('click', function () {
    $(this).closest('.side-menu').removeClass('side-menu--visible');
    page.removeClass('page--no-scroll');
  });

  // typeahead
  (function () {
    var source = ['Flower', 'Category Flo12'];
    var source2 = {
      products: [
        {
          title: 'Cannabis product 1',
          img: 'http://placehold.it/50x50',
          price: '$25.30'
        },
        {
          title: 'Cannabis test product 2',
          img: 'images/products/product-thumb-1.jpg',
          price: '$21.20'
        }
      ]
    };

    const productSearchTmp =
      '<div class="search-result">' +
      '<img src="images/products/{{img}}" class="search-result__img">' +
      '<div class="search-result__title">{{name}}</div>' +
      '<div class="search-result__price">{{price}}</div>' +
      '</div>';

    var typeaheadCategories = $('.js-typeahead-categories');
    var typeaheadSearch = $('.js-typeahead-search');
    const typeaheadProducts = $('.js-typeahead-products');

    if (typeaheadCategories.length > 0) {
      if (w.width() > 767) {
        typeaheadCategories.typeahead({
          source: source,
          searchOnFocus: true,
          minLength: 0,
        });
      } else {
        typeaheadCategories.typeahead({
          source: source,
          searchOnFocus: true,
          minLength: 0
        });
      }
    }

    if (typeaheadSearch.length > 0) {
      typeaheadSearch.typeahead({
        source: source,
        searchOnFocus: true,
        minLength: 0,
        callback: {
          onShowLayout: function (node) {
            if (w.width() > 767) return;
            var container = node.closest('.search');
            container.addClass('search--active');
            page.addClass('page--no-scroll');
          },
          onHideLayout: function (node) {
            if (node.val().length <= 0) {
              var container = node.closest('.search');
              container.removeClass('search--active');
            }

            page.removeClass('page--no-scroll');
          }
        }
      });
    }

    // if (typeaheadProducts.length > 0) {
    //   typeaheadProducts.typeahead({
    //     source: source,
    //     searchOnFocus: true,
    //     minLength: 0,
    //     template: function(query, item) {
    //       console.log(query);
    //       console.log(item);
    //     }
    //   })
    // }

    // $.typeahead({
    //   input: '.js-typeahead-products',
    //   searchOnFocus: true,
    //   minLength: 0,
    //   maxItem: 8,
    //   maxItemPerGroup: 6,
    //   order: "asc",
    //   hint: true,
    //   group: {
    //     key: "division",
    //     template: function (item) {
    //
    //       var division = item.division;
    //       if (~division.toLowerCase().indexOf('north')) {
    //         division += " ---> Snow!";
    //       } else if (~division.toLowerCase().indexOf('south')) {
    //         division += " ---> Beach!";
    //       }
    //
    //       return division;
    //     }
    //   },
    //   display: ["name", "city", "division"],
    //   dropdownFilter: [{
    //     key: 'conference',
    //     template: '<strong>{{conference}}</strong> Conference',
    //     all: 'All Conferences'
    //   }],
    //   template: productSearchTmp,
    //   correlativeTemplate: true,
    //   source: {
    //     products: {
    //       url: "data/teams.json"
    //     }
    //   }
    // });
  })();

  // dropdown
  (function () {
    var dropdowns = $('.dropdown');
    var prevDropdown;

    function toggleVisibility(e) {
      e.preventDefault();
      var container = $(this).closest('.dropdown');
      page.removeClass('page--no-scroll');

      if (prevDropdown && prevDropdown[0] !== container[0]) {
        prevDropdown.removeClass('dropdown--visible');
        container.addClass('dropdown--visible');
        dropdowns.trigger('filter-hide');
      } else {
        container.toggleClass('dropdown--visible');
      }
      prevDropdown = container;
    }

    $('.dropdown__toggle').on('click', toggleVisibility);
    $('.dropdown__close').on('click', toggleVisibility);

    $(window).on('click', function (e) {
      if ($(e.target).closest('.dropdown__menu').length > 0 || $(e.target).closest('.dropdown__toggle').length > 0) return;
      dropdowns.removeClass('dropdown--visible');
      dropdowns.trigger('filter-hide');
    });
  })();

  // chat
  $('.chat__textarea').on('keyup', function () {
    var form = $(this).closest('.chat__form');
    var button = $('.button', form);
    if (this.value.length > 0) {
      button.removeClass('button--disable');
    } else {
      button.addClass('button--disable');
    }
  });

  // accordion
  (function () {
    $('.accordion__toggle').on('click', function () {
      var w = $(window);
      var container = $(this).closest('.accordion');

      if (w.width() > 767 && container.hasClass('accordion--sm')) return;

      var content = $('.accordion__content', container);
      container.toggleClass('accordion--hidden');
      content.slideToggle();
    });
  })();

  // attach
  (function () {
    function createFileElement(e) {
      var fileEl = $('<div class="attach__file"></div>');
      var fileIcon = $('<svg class="icon icon--file"><use xlink:href="sprites/sprite.svg#file"></use></svg>');
      var fileNameEl = $('<div class="attach__filename"></div>');
      var closeBtn = $('<button type="button" class="icon icon--remove"><svg class="icon icon--close"><use xlink:href="sprites/sprite.svg#close"></use></svg></button>');
      var fileName = e.target.value.split('\\').pop();
      if (fileName) {
        fileNameEl.html(fileName);
        fileEl.append(fileIcon, fileNameEl, closeBtn);
        return fileEl;
      } else {
        return false;
      }
    }

    $('.attach__input').on('change', function (e) {
      var input = $(this);
      var container = input.closest('.attach');
      var fileElement = createFileElement(e);
      var closeBtn = $('.icon--remove', fileElement);
      var fileElements = $('.attach__file', container);

      container.removeClass('attach--file-selected');
      fileElements.remove();

      if (fileElement) {
        container.append(fileElement);
        container.addClass('attach--file-selected');

        closeBtn.on('click', function () {
          fileElement.remove();
          input.val('');
          container.removeClass('attach--file-selected');
        });
      }
    });
  })();

  // carousel
  $('.carousel').slick({
    slidesToShow: 1,
    dots: true,
    prevArrow: '<button class="carousel__button carousel__button--prev"><svg class="icon icon--angle-left"><use xlink:href="sprites/sprite.svg#angle-left"></use></svg></button>',
    nextArrow: '<button class="carousel__button carousel__button--next"><svg class="icon icon--angle-right"><use xlink:href="sprites/sprite.svg#angle-right"></use></svg></button>',
    dotsClass: 'carousel__dots',
    adaptiveHeight: true
  });

  // cart-dropdown
  $('.nav__link--cart').on('click', function () {
    if (w.width() < 768) {
      page.addClass('page--no-scroll');
    }
  });

  // filter
  (function () {
    var products = $('.vendor__products');
    var pagination = $('.pagination');

    var icon;
    var container;
    var button;

    function toggleVisibility() {
      container = $(this).closest('.dropdown');
      button = $(this);

      if (button.hasClass('filter__toggle')) {
      } else {
        button = $('.filter__toggle', container);
      }

      if (!icon) {
        icon = $('.icon', button);
      }

      if (container.hasClass('dropdown--visible')) {
        button.html(icon).append('Hide Filter');
        products.addClass('vendor__products--hidden');
        pagination.addClass('pagination--hidden');

        if (w.width() < 768) {
          page.addClass('page--no-scroll')
        }
      } else {
        button.html(icon).append('Show Filter');
        products.removeClass('vendor__products--hidden');
        pagination.removeClass('pagination--hidden');
      }
    }

    $('.filter__toggle').on('click', toggleVisibility);
    $('.filter__dropdown .dropdown__close').on('click', toggleVisibility);

    $('.filter').on('filter-hide', function () {
      products.removeClass('vendor__products--hidden');
      pagination.removeClass('pagination--hidden');
      toggleVisibility.call(this);
    });

    $(window).on('click', function (e) {
      if ($(e.target).closest('.dropdown__menu').length > 0 || $(e.target).closest('.dropdown__toggle').length > 0) return;
      if (icon) {
        button.html(icon).append('Show Filter');
      }
    });
  })();

  // header__menu-toggle
  $('.header__menu-toggle').on('click', function () {
    $('.side-menu').addClass('side-menu--visible');
    page.addClass('page--no-scroll');
  });

  // input-group--password
  $('.input-group--password .input').on('keyup', function () {
    var container = $(this).closest('.input-group');
    var icon = $('.input-group__toggle', container);
    if (this.value.length > 0) {
      icon.addClass('input-group__toggle--active');
    } else {
      icon.removeClass('input-group__toggle--active');
    }
  });

  // input-group__toggle
  var toggles = $('.input-group__toggle');
  toggles.on('click', function () {
    var container = $(this).closest('.input-group');
    var input = $('.input', container);
    var openedEye = $('<svg class="icon icon--eye"><use xlink:href="sprites/sprite.svg#eye"></use></svg>');
    var closedEye = $('<svg class="icon icon--eye-closed"><use xlink:href="sprites/sprite.svg#eye-closed"></use></svg>');

    if (input.attr('type') === 'password') {
      input.prop('type', 'text');
      $(this).html(closedEye);
    } else {
      input.prop('type', 'password');
      $(this).html(openedEye);
    }
  });

  // product__preview
  $('.product__thumbs').on('click', '.product__thumb', function (e) {
    e.preventDefault();
    const path = this.pathname;
    $('.product__img img').attr('src', 'images/products' + path);
  });

  // search
  $('.js-typeahead-search').on('click', function () {
    if (w.width() > 767) return;
    const container = $(this).closest('.search');
    container.addClass('search--active');
  });

  $('.search__close-btn').on('click', function () {
    const container = $(this).closest('.search');
    container.removeClass('search--active');
    page.removeClass('page--no-scroll');
  });

  // slider
  (function () {
    const configDefault = {
      cssPrefix: 'slider',
      cssClasses: {
        target: '--target',
        ltr: '--ltr',
        horizontal: '--horizontal',
        base: '__base',
        connects: '__connects',
        connect: '__connect',
        origin: '__origin',
        handle: '__handle',
        drag: '--state-drag'
      }
    };

    function createSlider(el) {
      el = $(el);
      const start = el.data('start');
      const end = el.data('end');
      const min = el.data('min');
      const max = el.data('max');
      const prefix = el.data('prefix');
      const labelMin = $('.slider__label--min', el);
      const labelMax = $('.slider__label--max', el);
      const fieldLower = $('.slider__field--lower', el);
      const fieldHigher = $('.slider__field--higher', el);


      let minValue = min;
      let maxValue = max;

      if (prefix) {
        minValue = prefix + min;
        maxValue = prefix + max;
      }

      labelMin.text(minValue);
      labelMax.text(maxValue);

      noUiSlider.create(el[0], $.extend(configDefault, {
        start: [start, end],
        range: {min: min, max: max},
        connect: true
      }));

      el[0].noUiSlider.on('update', function (values) {
        fieldLower.val(parseInt(values[0]));
        fieldHigher.val(parseInt(values[1]));
      });

      fieldLower.on('change', function () {
        el[0].noUiSlider.set([this.value, null]);
      });

      fieldHigher.on('change', function () {
        el[0].noUiSlider.set([null, this.value]);
      });
    }

    const sliders = $('.slider');
    sliders.each(function (i, slider) {
      createSlider(slider)
    });
  })();
});
