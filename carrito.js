 // Carrito de compras
        let carrito = [];
        const carritoIcono = document.getElementById('carrito-icono');
        const carritoPanel = document.getElementById('carrito-panel');
        const carritoItems = document.getElementById('carrito-items');
        const carritoContador = document.getElementById('carrito-contador');
        const carritoTotal = document.getElementById('carrito-total');
        const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
        const finalizarCompraBtn = document.getElementById('finalizar-compra');
        const mensajeExito = document.getElementById('mensaje-exito');
        const botonesAgregar = document.querySelectorAll('.agregar-carrito');

        // Mostrar/ocultar el panel del carrito
        carritoIcono.addEventListener('click', () => {
            carritoPanel.classList.toggle('visible');
        });

        // Cerrar el panel al hacer clic fuera de él
        document.addEventListener('click', (e) => {
            if (!carritoPanel.contains(e.target) && e.target !== carritoIcono && !carritoIcono.contains(e.target)) {
                carritoPanel.classList.remove('visible');
            }
        });

        // Agregar productos al carrito
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', () => {
                const form = boton.closest('.form-carrito');
                const producto = form.querySelector('[name="producto"]').value;
                const precio = parseInt(form.querySelector('[name="precio"]').value);
                const cantidad = parseInt(form.querySelector('[name="cantidad"]').value);
                
                agregarAlCarrito(producto, precio, cantidad);
                
                // Mostrar mensaje de éxito
                mensajeExito.textContent = `${producto} agregado al carrito`;
                mensajeExito.classList.add('visible');
                setTimeout(() => {
                    mensajeExito.classList.remove('visible');
                }, 2000);
            });
        });

        // Función para agregar productos al carrito
        function agregarAlCarrito(producto, precio, cantidad) {
            // Verificar si el producto ya está en el carrito
            const index = carrito.findIndex(item => item.producto === producto);
            
            if (index !== -1) {
                // Si ya existe, actualizar cantidad
                carrito[index].cantidad += cantidad;
            } else {
                // Si no existe, agregar nuevo item
                carrito.push({
                    producto,
                    precio,
                    cantidad
                });
            }
            
            actualizarCarrito();
        }

        // Función para actualizar la visualización del carrito
        function actualizarCarrito() {
            // Actualizar contador
            const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
            carritoContador.textContent = totalItems;
            
            // Actualizar lista de items
            if (carrito.length === 0) {
                carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
            } else {
                carritoItems.innerHTML = '';
                carrito.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'carrito-item';
                    itemElement.innerHTML = `
                        <div class="carrito-item-info">
                            <div class="carrito-item-nombre">${item.producto}</div>
                            <div class="carrito-item-precio">$${item.precio.toLocaleString()}</div>
                        </div>
                        <div class="carrito-item-cantidad">
                            <button class="cantidad-btn restar" data-index="${index}">-</button>
                            <span>${item.cantidad}</span>
                            <button class="cantidad-btn sumar" data-index="${index}">+</button>
                        </div>
                        <button class="eliminar-item" data-index="${index}">×</button>
                    `;
                    carritoItems.appendChild(itemElement);
                });
                
                // Agregar event listeners a los botones de cantidad
                document.querySelectorAll('.cantidad-btn.restar').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const index = parseInt(btn.dataset.index);
                        if (carrito[index].cantidad > 1) {
                            carrito[index].cantidad--;
                            actualizarCarrito();
                        }
                    });
                });
                
                document.querySelectorAll('.cantidad-btn.sumar').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const index = parseInt(btn.dataset.index);
                        if (carrito[index].cantidad < 10) {
                            carrito[index].cantidad++;
                            actualizarCarrito();
                        }
                    });
                });
                
                // Agregar event listeners a los botones de eliminar
                document.querySelectorAll('.eliminar-item').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const index = parseInt(btn.dataset.index);
                        carrito.splice(index, 1);
                        actualizarCarrito();
                    });
                });
            }
            
            // Actualizar total
            const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
            carritoTotal.textContent = `$${total.toLocaleString()}`;
        }

        // Vaciar carrito
        vaciarCarritoBtn.addEventListener('click', () => {
            carrito = [];
            actualizarCarrito();
        });

        // Finalizar compra
        finalizarCompraBtn.addEventListener('click', () => {
            if (carrito.length > 0) {
                alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
                carrito = [];
                actualizarCarrito();
                carritoPanel.classList.remove('visible');
            } else {
                alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
            }
        });

        // Inicializar carrito
        actualizarCarrito();
(function()
{function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');
    d.innerHTML="window.__CF$cv$params={r:'947f683d8650db3f',t:'MTc0ODYyMDQzNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}
    if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||
        function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})()
