/* 딴짓플레이 공통 스크립트 — 숫자 포맷, 복사, 연도 표시 */
(function () {
  "use strict";

  var SL = {};

  /* 숫자 → "1억 2,000만" 같은 한국식 표기 (단위: 만원) */
  SL.formatMan = function (manwon) {
    var n = Math.round(Number(manwon) || 0);
    var neg = n < 0;
    n = Math.abs(n);
    var eok = Math.floor(n / 10000);
    var man = n % 10000;
    var out = "";
    if (eok > 0) out += eok.toLocaleString("ko-KR") + "억 ";
    if (man > 0 || eok === 0) out += man.toLocaleString("ko-KR") + "만";
    return (neg ? "-" : "") + out.trim();
  };

  /* 숫자 → "1,234,567원" */
  SL.formatWon = function (won, withUnit) {
    var n = Math.round(Number(won) || 0);
    var s = n.toLocaleString("ko-KR");
    return withUnit === false ? s : s + "원";
  };

  /* 숫자 → "12,345.67원" (소수 자리 지정) */
  SL.formatDecimal = function (value, digits, unit) {
    var n = Number(value) || 0;
    var s = n.toLocaleString("ko-KR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });
    return unit === false ? s : s + (unit || "원");
  };

  /* 입력값을 숫자로 (콤마/공백 허용, 비면 fallback) */
  SL.num = function (raw, fallback) {
    if (raw === null || raw === undefined) return fallback === undefined ? 0 : fallback;
    var cleaned = String(raw).replace(/[,\s원%]/g, "");
    var v = parseFloat(cleaned);
    return isFinite(v) ? v : (fallback === undefined ? 0 : fallback);
  };

  /* 입력 중 콤마 자동 삽입 (정수 전용) */
  SL.bindCommaInput = function (input) {
    function clean() {
      var v = input.value.replace(/[^\d]/g, "");
      if (v === "") { input.value = ""; return; }
      input.value = Number(v).toLocaleString("ko-KR");
    }
    input.addEventListener("input", clean);
    clean();
  };

  /* 클립보드 복사 (구형 브라우저/비보안 컨텍스트 폴백 포함) */
  SL.copy = function (text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return SL.copyFallback(text);
      });
    }
    return SL.copyFallback(text);
  };

  SL.copyFallback = function (text) {
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error("copy failed"));
      } catch (e) {
        reject(e);
      }
    });
  };

  /* 버튼에 "복사됨" 피드백 */
  SL.flashButton = function (btn, label, doneLabel) {
    var original = label || btn.textContent;
    btn.textContent = doneLabel || "복사했어요 ✓";
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = original;
      btn.disabled = false;
    }, 1600);
  };

  /* 푸터 연도 */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  });

  window.SL = SL;
})();
