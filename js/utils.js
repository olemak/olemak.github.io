const ready = () => { function fn() {
	// "On document ready" commands:
	console.log(document.readyState);
};  
  if (document.readyState != 'loading') {fn()}
  else {document.addEventListener('DOMContentLoaded', fn)}
};

export { ready }