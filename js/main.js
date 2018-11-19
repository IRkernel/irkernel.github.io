'use strict'

document.addEventListener('DOMContentLoaded', function() {
	var blocks = document.querySelectorAll('pre code, code[class]')
	for (const block of blocks) {
		hljs.highlightBlock(block)
	}
})

function childrenWithClass(e, clazz) {
	return Array.from(e.children)
		.filter(c => c.classList.contains(clazz))
}

function setTabActive(tab, ctx) {
	var frag = tab.href.split('#')[1]
	var panel = ctx.element_.querySelector(`#${frag}`)
	ctx.resetTabState_()
	ctx.resetPanelState_()
	tab.classList.add(ctx.CssClasses_.ACTIVE_CLASS)
	panel.classList.add(ctx.CssClasses_.ACTIVE_CLASS)
	return frag
}

const tabCtxs = new WeakMap

function loadTab() {
	const activePanel = document.querySelector(window.location.hash)
	if (!window.location.hash || !activePanel) return
	
	const tabSpine = []
	for (let elem = activePanel; elem !== document.documentElement; elem = elem.parentElement) {
		if (elem.classList.contains('mdl-tabs__panel')) {
			const tab = document.querySelector(`a.mdl-tabs__tab[href="#${elem.getAttribute('id')}"]`)
			if (tab) tabSpine.push(tab)
		}
	}
	
	console.log(tabSpine)
	
	for (const tab of tabSpine) {
		setTabActive(tab, tabCtxs.get(tab))
	}
}

function updateLinks() {
	for (const tab of document.querySelectorAll('.mdl-tabs__tab')) {
		const frag = tab.href.split('#')[1]
		const links = document.querySelectorAll(`a:not(.mdl-tabs__tab)[href="#${frag}"]`)
		for (const link of links) {
			link.addEventListener('click', (e) => {
				e.preventDefault()
				const frag = setTabActive(tab, tabCtxs.get(tab))
				window.history.pushState(frag, '', `#${frag}`)
			})
		}
	}
}

class MaterialTabsFixed extends MaterialTabs {
	initTabs_() {
		if (this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
			this.element_.classList.add(
				this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS)
		}
		
		const tabBar = childrenWithClass(this.element_, 'mdl-tabs__tab-bar')[0]
		
		this.tabs_ = childrenWithClass(tabBar, this.CssClasses_.TAB_CLASS)
		this.panels_ = childrenWithClass(this.element_, this.CssClasses_.PANEL_CLASS)
		
		for (const tab of this.tabs_) {
			new MaterialTab(tab, this)
		}
		
		this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS)
	}
}

class MaterialTab {
	constructor(tab, ctx) {
		if (!tab) return
		if (ctx.element_.classList.contains(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
			const rippleContainer = document.createElement('span')
			rippleContainer.classList.add(ctx.CssClasses_.MDL_RIPPLE_CONTAINER)
			rippleContainer.classList.add(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT)
			const ripple = document.createElement('span')
			ripple.classList.add(ctx.CssClasses_.MDL_RIPPLE)
			rippleContainer.appendChild(ripple)
			tab.appendChild(rippleContainer)
		}
		
		tab.addEventListener('click', (e) => {
			e.preventDefault()
			const frag = setTabActive(tab, ctx)
			window.history.pushState(frag, '', `#${frag}`)
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

window.addEventListener('load', () => {
	componentHandler.downgradeElements(document.querySelectorAll('.mdl-js-ripple-effect'))
	componentHandler.upgradeElements(document.querySelectorAll('.mdl-js-ripple-effect'))

	loadTab()
	updateLinks()
})
