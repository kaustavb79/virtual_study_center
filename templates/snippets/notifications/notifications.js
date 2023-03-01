$('#showError').on('click', function(e) {
    displayNotification('error', 'This is an error notification', 2000);
    e.preventDefault();
});
$('#showInfo').on('click', function(e) {
    displayNotification('info', 'This is an info notification', 2000);
    e.preventDefault();
});
$('#showSuccess').on('click', function(e) {
    displayNotification('success', 'This is an success notification', 2000);
    e.preventDefault();
});
$('#showWarning').on('click', function(e) {
    displayNotification('warning', 'This is an warning notification', 2000);
    e.preventDefault();
});
$('#showNothing').on('click', function(e) {
    displayNotification('unknown', 'This is an unknown notification', 2000);
    e.preventDefault();
});
