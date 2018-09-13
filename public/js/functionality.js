document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var elem = document.querySelectorAll('select');


  var instances = M.Dropdown.init(elems);
  var instances = M.FormSelect.init(elem);

});
