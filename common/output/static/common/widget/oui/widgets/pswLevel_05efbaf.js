define('common:widget/oui/widgets/pswLevel', function (require, exports, module) {
  var pswLevel = function (psw) {
    var r_number = psw.match(/\d/g),
      r_lowercase = psw.match(/[a-z]/g),
      r_uppercase = psw.match(/[A-Z]/g),
      r_symbol = psw.match(/[!%#$\^*~.&]/g),
      len = psw.length,
      r_number_len = r_number ? r_number.length : 0,
      r_lowercase_len = r_lowercase ? r_lowercase.length : 0,
      r_uppercase_len = r_uppercase ? r_uppercase.length : 0,
      r_symbol_len = r_symbol ? r_symbol.length : 0,
      has_letter = false,
      has_letter_upper_lower = false,
      has_number = false,
      has_symbol = false,
      score = 0,
      level,
      result = {};

    if (len <= 6 && len >= 8) {
      score += 10;
    } else if (len > 8) {
      score += 25;
    }

    if (r_lowercase_len > 0 && r_uppercase_len > 0) {
      has_letter_upper_lower = true;
      has_letter = true;
      score += 20;
    } else if (r_lowercase_len || r_uppercase_len) {
      has_letter = true;
      score += 10;
    }

    if (r_number_len >= 1 && r_number_len <= 2) {
      has_number = true;
      score += 10;
    } else if (r_number_len >= 3) {
      has_number = true;
      score += 20;
    }

    if (r_symbol_len == 1) {
      has_symbol = true;
      score += 10;
    } else if (r_symbol_len > 1) {
      has_symbol = true;
      score += 25;
    }

    if (has_letter_upper_lower && has_number && has_symbol) {
      score += 10;
    } else if (has_letter && has_number && has_symbol) {
      score += 5;
    } else if (has_letter && has_number) {
      score += 2;
    }

    if (score > 80) {
      level = '强';
    } else if (score >= 50 && score <= 80) {
      level = '中';
    } else {
      level = '弱';
    }

    result.score = score;
    result.level = level;
    return result;
  };

  module.exports = pswLevel;
});
