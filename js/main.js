'use strict';

document.addEventListener('DOMContentLoaded', function() {
	var blocks = document.querySelectorAll('pre code, code[class]')
	Array.prototype.forEach.call(blocks, hljs.highlightBlock)
})

function childrenWithClass(e, clazz) {
	return Array.prototype.filter.call(e.children, function(c) {
		return c.classList.contains(clazz)
	})
}

function MaterialTabsFixed(element) {
	MaterialTabs.call(this, element)
}

function setTabActive(tab, ctx) {
	var frag = tab.href.split('#')[1]
	var panel = ctx.element_.querySelector('#' + frag)
	ctx.resetTabState_()
	ctx.resetPanelState_()
	tab.classList.add(ctx.CssClasses_.ACTIVE_CLASS)
	panel.classList.add(ctx.CssClasses_.ACTIVE_CLASS)
	return frag
}

var tabCtxs = new WeakMap

function loadTab() {
	var activePanel = document.querySelector(window.location.hash)
	if (!window.location.hash || !activePanel) return
	
	var tabSpine = []
	for (var elem = activePanel; elem !== document.documentElement; elem = elem.parentElement) {
		if (elem.classList.contains('mdl-tabs__panel')) {
			var tab = document.querySelector('a.mdl-tabs__tab[href="#' + elem.getAttribute('id') +'"]')
			if (tab) {
				tabSpine.push(tab)
			}
		}
	}
	
	console.log(tabSpine)
	if (!tabSpine) return
	
	tabSpine.forEach(function(tab) {
		setTabActive(tab, tabCtxs.get(tab))
	})
}

MaterialTabsFixed.prototype = Object.create(MaterialTabs.prototype)
MaterialTabsFixed.prototype.constructor = MaterialTabsFixed
MaterialTabsFixed.prototype.initTabs_ = function() {
	if (this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
		this.element_.classList.add(
			this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
	}
	
	var tabBar = childrenWithClass(this.element_, 'mdl-tabs__tab-bar')[0]
	
	this.tabs_ = childrenWithClass(tabBar, this.CssClasses_.TAB_CLASS)
	this.panels_ = childrenWithClass(this.element_, this.CssClasses_.PANEL_CLASS)
	
	for (var i = 0; i < this.tabs_.length; i++) {
		new MaterialTab(this.tabs_[i], this)
	}
	
	this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS)
}

function MaterialTab(tab, ctx) {
	if (tab) {
		if (ctx.element_.classList.contains(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
			var rippleContainer = document.createElement('span')
			rippleContainer.classList.add(ctx.CssClasses_.MDL_RIPPLE_CONTAINER)
			rippleContainer.classList.add(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT)
			var ripple = document.createElement('span')
			ripple.classList.add(ctx.CssClasses_.MDL_RIPPLE)
			rippleContainer.appendChild(ripple)
			tab.appendChild(rippleContainer)
		}
		
		tab.addEventListener('click', function(e) {
			e.preventDefault()
			var frag = setTabActive(tab, ctx)
			window.history.pushState(frag, '', '#' + frag)
		})
		
		tabCtxs.set(tab, ctx)
	}
}

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
	constructor: MaterialTabsFixed,
	classAsString: 'MaterialTabsFixed',
	cssClass: 'mdl-js-tabs-fixed',
})

window.addEventListener('load', function() {
	componentHandler.downgradeElements(document.querySelectorAll('.mdl-js-ripple-effect'))
	componentHandler.upgradeElements(document.querySelectorAll('.mdl-js-ripple-effect'))
	
	loadTab()
})
