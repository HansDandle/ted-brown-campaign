/*
 * Campaign donation popup with election-deadline countdowns.
 * Runs from now through October 14, 2026; after that it never shows again.
 */
(function () {
    'use strict';

    // Central Time expressed as UTC. DST ends November 1, 2026, so dates
    // through October 31 are CDT (UTC-5) and November dates are CST (UTC-6).
    function centralTime(year, month, day, hour, minute, cdt) {
        return Date.UTC(year, month - 1, day, hour + (cdt ? 5 : 6), minute);
    }

    var CAMPAIGN_END = centralTime(2026, 10, 14, 23, 59, true);

    var DEADLINES = [
        {
            name: 'Last day to register to vote',
            when: 'Mon, Oct 5, 2026',
            icon: 'fa-user-check',
            at: centralTime(2026, 10, 5, 23, 59, true)
        },
        {
            name: 'Early voting begins',
            when: 'Mon, Oct 19, 2026',
            icon: 'fa-person-walking',
            at: centralTime(2026, 10, 19, 7, 0, true)
        },
        {
            name: 'Last day to apply for a mail ballot',
            when: 'Fri, Oct 23, 2026',
            icon: 'fa-envelope-open-text',
            at: centralTime(2026, 10, 23, 23, 59, true)
        },
        {
            name: 'Last day of early voting',
            when: 'Fri, Oct 30, 2026',
            icon: 'fa-hourglass-half',
            at: centralTime(2026, 10, 30, 19, 0, true)
        },
        {
            name: 'Election Day',
            when: 'Tue, Nov 3, 2026',
            icon: 'fa-check-to-slot',
            at: centralTime(2026, 11, 3, 19, 0, false)
        }
    ];

    // The progress rail spans the campaign push, ending on Election Day.
    var RAIL_START = centralTime(2026, 9, 1, 0, 0, true);
    var RAIL_END = DEADLINES[DEADLINES.length - 1].at;

    var STORAGE_KEY = 'tb_donate_popup_snooze';
    var SHOW_DELAY_MS = 12000;
    var SNOOZE_LATER_MS = 3 * 24 * 60 * 60 * 1000;
    var SNOOZE_DISMISS_MS = 14 * 24 * 60 * 60 * 1000;
    var SNOOZE_DONATED_MS = 90 * 24 * 60 * 60 * 1000;

    var overlay = document.getElementById('donate-popup');
    if (!overlay) return;

    var popup = overlay.querySelector('.donate-popup');
    var clock = overlay.querySelector('.donate-clock');
    var clockLabel = overlay.querySelector('.donate-countdown-target');
    var datesList = overlay.querySelector('.donate-dates');
    var rail = overlay.querySelector('.donate-rail');
    var railFill = overlay.querySelector('.donate-rail-fill');
    var railMarker = overlay.querySelector('.donate-rail-today');
    var lastFocused = null;
    var tickTimer = null;
    var openTimer = null;

    function readSnooze() {
        try {
            var value = window.localStorage.getItem(STORAGE_KEY);
            return value ? parseInt(value, 10) : 0;
        } catch (e) {
            return 0;
        }
    }

    function writeSnooze(ms) {
        try {
            window.localStorage.setItem(STORAGE_KEY, String(Date.now() + ms));
        } catch (e) {
            /* storage blocked; the popup simply reappears on the next visit */
        }
    }

    function nextDeadline(now) {
        for (var i = 0; i < DEADLINES.length; i++) {
            if (DEADLINES[i].at > now) return DEADLINES[i];
        }
        return null;
    }

    function pad(n) {
        return n < 10 ? '0' + n : String(n);
    }

    function percentOnRail(at) {
        var span = RAIL_END - RAIL_START;
        var pct = ((at - RAIL_START) / span) * 100;
        return Math.max(0, Math.min(100, pct));
    }

    function buildRail() {
        var html = '';
        for (var i = 0; i < DEADLINES.length; i++) {
            html +=
                '<span class="donate-rail-dot" data-at="' + DEADLINES[i].at + '"' +
                ' style="left:' + percentOnRail(DEADLINES[i].at).toFixed(2) + '%"' +
                ' title="' + DEADLINES[i].when + ' &mdash; ' + DEADLINES[i].name + '"></span>';
        }
        rail.insertAdjacentHTML('beforeend', html);
    }

    function buildDates() {
        var html = '';
        for (var i = 0; i < DEADLINES.length; i++) {
            html +=
                '<li data-at="' + DEADLINES[i].at + '">' +
                '<i class="fas ' + DEADLINES[i].icon + ' donate-date-icon" aria-hidden="true"></i>' +
                '<span class="donate-date-name">' + DEADLINES[i].name + '</span>' +
                '<span class="donate-date-when">' + DEADLINES[i].when + '</span>' +
                '<span class="donate-date-days"></span>' +
                '</li>';
        }
        datesList.innerHTML = html;
    }

    function renderClock(now) {
        var target = nextDeadline(now);
        if (!target) return false;

        clockLabel.textContent = target.name.toLowerCase();

        var remaining = Math.max(0, target.at - now);
        var seconds = Math.floor(remaining / 1000);
        var values = [
            Math.floor(seconds / 86400),
            Math.floor((seconds % 86400) / 3600),
            Math.floor((seconds % 3600) / 60),
            seconds % 60
        ];

        var slots = clock.querySelectorAll('.donate-clock-value');
        for (var i = 0; i < slots.length; i++) {
            slots[i].textContent = i === 0 ? String(values[i]) : pad(values[i]);
        }
        return true;
    }

    function renderDates(now) {
        var items = datesList.querySelectorAll('li');
        for (var i = 0; i < items.length; i++) {
            var at = parseInt(items[i].getAttribute('data-at'), 10);
            var daysEl = items[i].querySelector('.donate-date-days');
            if (at <= now) {
                items[i].classList.add('is-past');
                daysEl.textContent = 'passed';
            } else {
                items[i].classList.remove('is-past');
                var days = Math.ceil((at - now) / 86400000);
                daysEl.textContent = days === 1 ? '1 day' : days + ' days';
            }
        }
    }

    function renderRail(now) {
        var pct = percentOnRail(now);
        railFill.style.width = pct + '%';
        railMarker.style.left = pct + '%';
        railMarker.title = 'Today';

        var dots = rail.querySelectorAll('.donate-rail-dot');
        for (var i = 0; i < dots.length; i++) {
            var at = parseInt(dots[i].getAttribute('data-at'), 10);
            dots[i].classList.toggle('is-past', at <= now);
        }
    }

    function tick() {
        var now = Date.now();
        if (!renderClock(now)) {
            close();
            return;
        }
        renderDates(now);
        renderRail(now);
    }

    function open() {
        lastFocused = document.activeElement;
        tick();
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        tickTimer = window.setInterval(tick, 1000);

        var firstAction = overlay.querySelector('.donate-popup-actions .btn');
        if (firstAction) firstAction.focus();
        document.addEventListener('keydown', onKeydown);
    }

    function close() {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        popup.classList.remove('show-joke');
        document.body.style.overflow = '';
        if (tickTimer) {
            window.clearInterval(tickTimer);
            tickTimer = null;
        }
        document.removeEventListener('keydown', onKeydown);
        if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function onKeydown(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            writeSnooze(SNOOZE_LATER_MS);
            close();
        }
    }

    function dismiss(snoozeMs) {
        writeSnooze(snoozeMs);
        close();
    }

    buildDates();
    buildRail();

    overlay.addEventListener('click', function (event) {
        var action = event.target.closest ? event.target.closest('[data-donate-action]') : null;
        if (action) {
            var name = action.getAttribute('data-donate-action');
            if (name === 'now' || name === 'joke-donate') {
                writeSnooze(SNOOZE_DONATED_MS);
                close();
            } else if (name === 'later' || name === 'signup') {
                dismiss(SNOOZE_LATER_MS);
            } else if (name === 'government') {
                popup.classList.add('show-joke');
            } else if (name === 'close') {
                dismiss(SNOOZE_DISMISS_MS);
            }
            return;
        }
        if (event.target === overlay) {
            dismiss(SNOOZE_LATER_MS);
        }
    });

    // ?donate=preview opens it immediately, for checking the design.
    if (window.location.search.indexOf('donate=preview') !== -1) {
        open();
        return;
    }

    // Schedule the first appearance.
    var now = Date.now();
    if (now > CAMPAIGN_END) return;
    if (now < readSnooze()) return;
    if (!nextDeadline(now)) return;

    // Whichever trigger fires first opens it once and cancels the other,
    // so a dismissal isn't undone by the remaining trigger.
    function showOnce() {
        window.removeEventListener('scroll', onScroll);
        window.clearTimeout(openTimer);
        if (Date.now() <= CAMPAIGN_END && Date.now() >= readSnooze()) open();
    }

    // Show sooner if the visitor is clearly engaged.
    function onScroll() {
        if (window.pageYOffset > window.innerHeight * 1.5) showOnce();
    }

    openTimer = window.setTimeout(showOnce, SHOW_DELAY_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
})();
