document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var elem = document.querySelectorAll('select');
  var modal = document.querySelectorAll('.modal');


  var instances = M.Dropdown.init(elems);
  var instances = M.FormSelect.init(elem);
  var instances = M.Modal.init(modal);

});
