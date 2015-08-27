/*
 * @require common:widget/oui/widgets/pagination.css
 */

define(function(require, exports, module) {

  var $ = require('jquery');
  var Common = require('common');
  var Protocol = require('protocol');
  require('simplePagination');


  DEFAULT_DELAY = 750;


  var Filter = function(conf, list) {
    $.extend(this, {
      conf: conf,
      activeClass: conf.activeClass,
      delay: conf.delay || DEFAULT_DELAY,
      container: conf.container,
      checkboxTrigger: conf.checkboxTrigger,
      isMultiterm: conf.isMultiterm || false,
      categoryTag: conf.categoryTag || '.category-tag',
      changed: conf.changed,
      switcher: '.ui-filter-switcher',
      status: null,
      list: list,
			timer: null
    });
  };

  $.extend(Filter.prototype, {

    init: function() {
      this.initTags();
      this.initSwitcher();
      this.loadStatus();
      return this;
    },

    getParams: function() {
      var me = this;
      var getRowValue = arguments.callee.getRowValue;
      if (getRowValue === undefined) {
        getRowValue = function(row, type) {
          var _arr = [];
          if (row.length === 0) {
            return type == 'boolean' ? 'false' : '';
          }
          row.each(function(i, e) {
            var val = e.value;
            if (val == 'all') {
              val = '';
            }
            _arr.push(val);
          });
          return type == 'boolean' ? 'true' : _arr.join(',');
        };
      }
      var categorys = function() {
        var _arr = [];
        var catgoryItem = me.container.find("ul.category");
        catgoryItem.each(function() {
          _arr.push($(this).data("category"));
        });
        return _arr;
      }();

      for (var i = 0, paramObj = {}, value; i < categorys.length; i++) {
        value = getRowValue($('input[name=' + categorys[i] + '][checked=checked]'));
        if (value !== '') {
          paramObj[categorys[i]] = value;
        }
      }

      return paramObj;
    },

    loadStatus: function() {
      var params = this.getParams();
      var newStr = $.param(params);

      if (this.status !== null && this.status !== newStr) {
        this.changed(this.list, params);
      }
      this.status = newStr;
    },

    initSwitcher: function() {
      var me = this;
      $(me.switcher).click(function() {
        if (me.isMultiterm) {
          $(this).removeClass('active');
          me.isMultiterm = false;
          me.container.find("li.all").click();
        }
        else {
          $(this).addClass('active');
          me.isMultiterm = true;
        }
      });

    },

    activate: function($li) {
      $li.addClass('active');
      $li.children('input').attr('checked', 'checked');
    },

    deactivate: function($li) {
      $li.removeClass('active');
      $li.children('input').removeAttr('checked');
    },

    initTags: function() {
      var me = this;
      $(me.categoryTag).click(function() {
        var $this = $(this);
        var $all = $this.siblings('li.all');
        if (me.isMultiterm && !$this.hasClass('all')) {
          if ($this.hasClass('active')) {
            if ($this.siblings('.active').length === 0) {
              me.activate($all);
            }
            me.deactivate($this);
          } else {
            if ($all.hasClass('active')) {
              me.deactivate($all);
            }
            me.activate($this);
          }
        } else {
          me.deactivate($this.siblings());
          me.activate($this);
        }
        if (me.timer) {
          window.clearTimeout(me.timer);
        }
        me.timer = window.setTimeout(function() {
          me.loadStatus();
        }, me.delay);
      });
    }
  });


  var Header = function(conf, list) {
    $.extend(this, {
      list: list,

      id: conf.id,
      clicked: conf.clicked || function() {},
      delay: conf.delay || DEFAULT_DELAY,

      _timer: null,
      _status: {
        sortable: {},
        filterable: {}
      },

      _ui: {}
    });
  };

  $.extend(Header.prototype, {
    init: function() {
      this.update();
      return this;
    },

    _clicked: function() {
      var me = this;
      if (me._timer) {
        window.clearTimeout(me._timer);
      }
      me._timer = window.setTimeout(function() {
        me.clicked(me.list);
      }, me.delay);
    },

    render2: function() {
      var me = this, ui = this._ui;
      $.each(ui.sortable, function(i, elem) {
        var item = $(elem);
        var name = item.attr('name');
        if (me._status.sortable.orderBy == name) {
          item.addClass(me._status.sortable.order);
          // TODO: ugly >>>
          if (item.hasClass('asc')) {
            //item.children('em').text('（升序）');
          } else if (item.hasClass('desc')) {
            //item.children('em').text('（降序）');
          } else {
            //item.children('em').text('（排序）');
          }
          // <<<
        }
      });

      $.each(ui.filterable, function(i, elem) {
        var item = $(elem);
        var name = item.data('name');
        if (me._status.filterable[name]) {
          item.addClass(me._status.filterable[name]);
        }
      });
    },

    update: function() {
      var me = this, ui = this._ui;

      var header = $(this.id);
      ui.sortable = header.children('.ui-list-title-sortable');
      ui.filterable = header.children('.ui-list-title-filterable');

      this.render2();

      ui.sortable.unbind("click").bind("click",function(event) {
    	event.stopPropagation();
        // Exclusive sorting
        var curr = $(this);
        var name = curr.attr('name');
        var next = curr.attr('next');
        if(-1 == next){return false;};
        var status = me._status.sortable;
        curr.siblings('.ui-list-title-sortable').removeClass('asc').removeClass('desc');
        //curr.siblings('.ui-list-title-sortable').children('em').text('（排序）'); // TODO: ugly

        status.orderBy = name;
        if("REFRESH"!=name){
	      
	        if (!curr.hasClass('desc') && !curr.hasClass('asc')) {
	          curr.addClass(next);
	          status.order = next;
	        }
	        else {
	          var prev = next == 'asc' ? 'desc' : 'asc';
	          if (curr.hasClass(next)) {
	            curr.removeClass(next);
	            curr.addClass(prev);
	            status.order = prev;
	          }
	          else {
	        	   curr.removeClass(prev);
	               curr.addClass(next);
	               status.order = next;
	          }
	        }
	        // TODO: ugly >>>
	        if (curr.hasClass('asc')) {
	          //curr.children('em').text('（升序）');
	        } else if (curr.hasClass('desc')) {
	          //curr.children('em').text('（降序）');
	        } else {
	          //curr.children('em').text('（排序）');
	        }
        }else{
        	  curr.removeClass('asc').removeClass('desc');
        	  status.order = "";
        }
        	
        // <<<
        me._clicked();
        
      });

      ui.filterable.click(function() {
        var curr = $(this);
        var name = curr.data('name');
        var status = me._status.filterable;
        if (curr.hasClass('checked')) {
          curr.removeClass('checked');
          status[name] = '';
        }
        else {
          curr.addClass('checked');
          status[name] = 'checked';
        }
        me._clicked();
      });
    },

    getParams: function() {
      var ret = {}, i, item, name;

      var s = this._ui.sortable;
      for (i = 0; i < s.length; i++) {
        item = $(s[i]);
        name = item.attr('name');
        if (item.hasClass('asc')) {
          ret.orderBy = name;
          ret.order = 'ASC';
        }
        else if (item.hasClass('desc')) {
          ret.orderBy = name;
          ret.order = 'DESC';
        }
      }

      var f = this._ui.filterable;
      for (i = 0; i < f.length; i++) {
        item = $(f[i]);
        name = item.data('name');
        if (item.hasClass('checked')) {
          ret[name] = true;
        }
      }

      return ret;
    }
  });


  var Pagination = function(conf, list) {
    $.extend(this, {
      list: list,
      container: conf.container,
      clicked: conf.clicked || function() {},

      _count: null,
      _index: null
    });
  };

  $.extend(Pagination.prototype, {
    init: function(index, count) {
      this.update(index, count);
      return this;
    },

    update: function(index, count) {
      if (count != this._count || index != this._index) {
        this.container.empty();
        this._count = count;
        this._index = index;
        if (count <= 1) {
          return;
        }
        var me = this;
        this.container.pagination({
          cssStyle: 'ui-pagination',
          pages: count,
          currentPage: index,
          onPageClick: function(index, event) {
            me.clicked(me.list, index);
          }
        });
      }
    }
  });


  var List = function(conf) {
    $.extend(this, {
      name: conf.name,
      api: conf.api,

      hasFilter: conf.filter,
      hasHeader: conf.header,
      hasMore: conf.more,
      hasPagination: conf.pagination,

      rendered: conf.rendered || function() {},

      delay: conf.delay || DEFAULT_DELAY,

      container: conf.container || $('#' + conf.name),
      template: conf.template || $('#' + conf.name + '-template'),
      templateForItem: conf.templateForItem || $('#' + conf.name + '-item-template'),

      renderMode: conf.renderMode,

      _params: conf.params || {},
      _filter: null,
      _header: null,

      _isLoading: false
    });
  };

  $.extend(List.prototype, {
    init: function(rsp) {
      this.startLoading();

      if (this.hasFilter) {
        this._initFilter();
      }

      if (rsp) {
        var pageIndex = 0, pageCount = 0;
        if (rsp.data) {
          rsp.data = Protocol.translator.translate(this.api, rsp.data);
          pageIndex = rsp.data.pageIndex;
          pageCount = rsp.data.pageCount;
        }
        this.render(rsp);

        if (this.hasHeader) {
          this._initHeader();
        }
        if (this.hasPagination) {
          this._initPagination(pageIndex, pageCount);
        }
      }
      this.stopLoading();
      return this;
    },

    _initFilter: function() {
      var conf = this.hasFilter;
      if (typeof this.hasFilter === 'boolean') {
        conf = {
          container: $('#' + this.name + '-filter'),
          changed: function(list, filterBy) {
            var params = list.getParams(true);
            $.extend(params, filterBy);
            list._update(params);
          }
        };
      }
      this._filter = new Filter(conf, this).init();
    },

    _initHeader: function() {
      var conf = this.hasHeader;
      if (typeof conf === 'boolean') {
        conf = {
          id: '#' + this.name + '-header',
          clicked: function(list) {
            list._update(list.getParams());
          }
        };
      }
      this._header = new Header(conf, this).init();
    },

    _initPagination: function(index, count) {
      var conf = this.hasPagination;
      if (typeof conf === 'boolean') {
        conf = {
          container: $('#' + this.name + '-pagination'),
          clicked: function(list, pageIndex) {
            var params = list.getParams();
            params.pageIndex = pageIndex;
            list._update(params);
          }
        };
      }
      this._pagination = new Pagination(conf, this).init(index, count);
    },

    _update: function(params, callback) {
      if (!this.api) {
        return;
      }
      var me = this;
      me.startLoading();
      Protocol[this.api](params, function(status, message, data) {
        me.render({ status: status, message: message, data: data });
        me.stopLoading();
        if (callback) {
          callback(status, message, data);
        }
      });
    },

    getParams: function(withoutFilter, withoutHeader) {
      var ret = jQuery.extend(true, {}, this._params);
      if (this.hasFilter && !withoutFilter) {
        $.extend(ret, this._filter.getParams());
      }
      if (this.hasHeader && !withoutHeader) {
        $.extend(ret, this._header.getParams());
      }
      return ret;
    },

    render: function(rsp) {
      var data = rsp.data;
      data._hasHeader = this.hasHeader;
      data._hasMore = this.hasMore;
      if (rsp.status !== 0) {
        data._message = rsp.message;
      }
      var html = Common.fillTemplate({ data: data, template: this.template });
      this.container.html(html);

      if (this.hasHeader) {
        if (this._header) {
          this._header.update();
        }
        else {
          this._initHeader();
        }
      }

      if (this.hasPagination) {
        if (this._pagination) {
          this._pagination.update(data.pageIndex, data.pageCount);
        }
        else {
          this._initPagination(data.pageIndex, data.pageCount);
        }
      }

      this.rendered(rsp);
    },

    add: function(data, prepend, templateForItem) {
      var template = templateForItem || this.templateForItem;
      var html = Common.fillTemplate({ data: data, template: template });
      if (prepend) {
        var $header = this.container.children('.ui-list-header');
        if ($header.length > 0) {
          $header.after(html);
        }
        else {
          this.container.prepend(html);
        }
      }
      else {
        var $more = this.container.children('.ui-list-more');
        if ($more.length > 0) {
          $more.before(html);
        }
        else {
          this.container.append(html);
        }
      }

      var $status = this.container.children('.ui-list-status');
      if ($status.length > 0) {
        $status.remove();
      }
    },

    startLoading: function() {
      this._isLoading = true;
      if (this.container.children('li.ui-list-loading').length === 0) {
        this.container.append('<li class="ui-list-loading" style="display: none;"></li>');
      }
      this.container.children('li.ui-list-loading').show();
    },

    stopLoading: function() {
      this._isLoading = false;
      this.container.children('li.ui-list-loading').hide();
    }

  });

  module.exports = List;
});
