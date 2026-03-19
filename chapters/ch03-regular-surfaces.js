window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Regular Surfaces',
    subtitle: 'Patches, charts, and the definition of a surface',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>From Curves to Surfaces</h2>

<div class="env-block intuition">
    <div class="env-title">Why Surfaces?</div>
    <div class="env-body">
        <p>A curve is a one-dimensional object living in space: it takes one parameter to trace it out. A surface is the next step, a two-dimensional object in \\(\\mathbb{R}^3\\). It takes <em>two</em> parameters to describe a point on a surface, the way longitude and latitude describe a point on the Earth.</p>
        <p>But not every two-parameter family of points deserves to be called a "surface." A figure eight in the plane fails to be a curve at the crossing point. Similarly, surfaces need a regularity condition that rules out self-intersections, cusps, and other pathologies. The goal of this chapter is to make this precise.</p>
    </div>
</div>

<p>In the previous chapters, we studied curves \\(\\alpha: I \\to \\mathbb{R}^3\\) parametrized by a single variable \\(t\\). The regularity condition was simple: \\(\\alpha'(t) \\neq 0\\). This ensured a well-defined tangent line at every point.</p>

<p>For surfaces, the situation is richer. A surface patch is a map \\(\\mathbf{x}: U \\subset \\mathbb{R}^2 \\to \\mathbb{R}^3\\) depending on two parameters \\((u, v)\\). The regularity condition must ensure that at every point, there is a well-defined tangent <em>plane</em>, not just a tangent line.</p>

<h3>Surfaces We Already Know</h3>

<p>Many familiar surfaces arise naturally:</p>
<ul>
    <li><strong>Graphs:</strong> \\(z = f(x, y)\\), parametrized by \\(\\mathbf{x}(u,v) = (u, v, f(u,v))\\).</li>
    <li><strong>Level sets:</strong> \\(F(x,y,z) = c\\) for a smooth function \\(F\\) with \\(\\nabla F \\neq 0\\).</li>
    <li><strong>Surfaces of revolution:</strong> rotate a plane curve about an axis.</li>
</ul>

<p>The abstract definition of a regular surface must encompass all of these while excluding degenerate cases. We want a framework flexible enough to handle surfaces that cannot be covered by a single parametrization (like the sphere) yet rigid enough to do calculus on.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Gauss's 1827 <em>Disquisitiones generales circa superficies curvas</em> was the first systematic treatment of the intrinsic geometry of surfaces. He introduced the idea of parametrizing a surface by two coordinates and studying properties that depend only on the first fundamental form. The definition we give here follows do Carmo's formalization, which descends directly from Gauss's original framework.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-surface-gallery"></div>
`,
            visualizations: [
                {
                    id: 'viz-surface-gallery',
                    title: 'Gallery of Surfaces',
                    description: 'Explore classic surfaces in 3D. Each surface is parametrized by two variables (u, v). Drag to rotate; use the selector to switch between surfaces.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 200, scale: 60
                        });

                        var surfaces = {
                            'Sphere': function(u, v) {
                                return [Math.cos(u)*Math.sin(v), Math.sin(u)*Math.sin(v), Math.cos(v)];
                            },
                            'Torus': function(u, v) {
                                var R = 1.8, r = 0.6;
                                return [(R + r*Math.cos(v))*Math.cos(u), (R + r*Math.cos(v))*Math.sin(u), r*Math.sin(v)];
                            },
                            'Hyperboloid': function(u, v) {
                                return [Math.cosh(v)*Math.cos(u), Math.cosh(v)*Math.sin(u), Math.sinh(v)];
                            },
                            'Monkey Saddle': function(u, v) {
                                return [u, v, u*u*u - 3*u*v*v];
                            },
                            'Enneper': function(u, v) {
                                return [u - u*u*u/3 + u*v*v, v - v*v*v/3 + v*u*u, u*u - v*v];
                            }
                        };

                        var surfaceRanges = {
                            'Sphere': { u:[0, 2*Math.PI], v:[0, Math.PI], su:30, sv:20, sc:1.4 },
                            'Torus': { u:[0, 2*Math.PI], v:[0, 2*Math.PI], su:30, sv:20, sc:0.8 },
                            'Hyperboloid': { u:[0, 2*Math.PI], v:[-1, 1], su:30, sv:15, sc:1.0 },
                            'Monkey Saddle': { u:[-1, 1], v:[-1, 1], su:25, sv:25, sc:1.5 },
                            'Enneper': { u:[-1.2, 1.2], v:[-1.2, 1.2], su:30, sv:30, sc:0.8 }
                        };

                        var surfaceNames = Object.keys(surfaces);
                        var currentSurface = 'Sphere';
                        var angleX = 0.4, angleY = 0.6;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        // Surface selector buttons
                        surfaceNames.forEach(function(name) {
                            var btn = VizEngine.createButton(controls, name, function() {
                                currentSurface = name;
                                draw();
                            });
                            if (name === currentSurface) btn.style.borderColor = viz.colors.teal;
                        });

                        viz.canvas.addEventListener('mousedown', function(e) {
                            dragging = true; lastMX = e.clientX; lastMY = e.clientY;
                        });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleY += (e.clientX - lastMX) * 0.008;
                            angleX += (e.clientY - lastMY) * 0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });

                        // Touch support
                        viz.canvas.addEventListener('touchstart', function(e) {
                            dragging = true; lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY;
                            e.preventDefault();
                        }, {passive: false});
                        viz.canvas.addEventListener('touchmove', function(e) {
                            if (!dragging) return;
                            angleY += (e.touches[0].clientX - lastMX) * 0.008;
                            angleX += (e.touches[0].clientY - lastMY) * 0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY;
                            draw(); e.preventDefault();
                        }, {passive: false});
                        viz.canvas.addEventListener('touchend', function() { dragging = false; });

                        function project(x, y, z, sc) {
                            // Rotation around X then Y
                            var cy = Math.cos(angleY), sy = Math.sin(angleY);
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var x1 = cy*x + sy*z;
                            var z1 = -sy*x + cy*z;
                            var y1 = cx*y - sx*z1;
                            var z2 = sx*y + cx*z1;
                            return [280 + x1*sc*60, 200 - y1*sc*60, z2];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var fn = surfaces[currentSurface];
                            var rng = surfaceRanges[currentSurface];
                            var sc = rng.sc;

                            // Generate mesh
                            var su = rng.su, sv = rng.sv;
                            var pts = [];
                            for (var i = 0; i <= su; i++) {
                                pts[i] = [];
                                for (var j = 0; j <= sv; j++) {
                                    var u = rng.u[0] + (rng.u[1] - rng.u[0]) * i / su;
                                    var v = rng.v[0] + (rng.v[1] - rng.v[0]) * j / sv;
                                    var p = fn(u, v);
                                    pts[i][j] = project(p[0], p[1], p[2], sc);
                                }
                            }

                            // Collect and sort quads by depth (painter's algorithm)
                            var quads = [];
                            for (var i = 0; i < su; i++) {
                                for (var j = 0; j < sv; j++) {
                                    var p0 = pts[i][j], p1 = pts[i+1][j], p2 = pts[i+1][j+1], p3 = pts[i][j+1];
                                    var avgZ = (p0[2] + p1[2] + p2[2] + p3[2]) / 4;
                                    quads.push({p0:p0, p1:p1, p2:p2, p3:p3, z:avgZ, i:i, j:j});
                                }
                            }
                            quads.sort(function(a, b) { return a.z - b.z; });

                            // Draw sorted quads
                            for (var q = 0; q < quads.length; q++) {
                                var quad = quads[q];
                                // Normal for shading
                                var ax = quad.p1[0]-quad.p0[0], ay = quad.p1[1]-quad.p0[1];
                                var bx = quad.p3[0]-quad.p0[0], by = quad.p3[1]-quad.p0[1];
                                var nz = ax*by - ay*bx;
                                var shade = Math.abs(nz) / (Math.sqrt(ax*ax+ay*ay)*Math.sqrt(bx*bx+by*by) + 0.001);
                                shade = 0.25 + 0.75 * shade;

                                var hue, fillCol;
                                // Color by surface type
                                if (currentSurface === 'Sphere') {
                                    var t = quad.j / sv;
                                    var r = Math.round(88 * shade + 30 * t);
                                    var g = Math.round(166 * shade);
                                    var b = Math.round(255 * shade - 30 * t);
                                    fillCol = 'rgb(' + r + ',' + g + ',' + b + ')';
                                } else if (currentSurface === 'Torus') {
                                    var t = quad.i / su;
                                    var r = Math.round((63 + 192*t) * shade);
                                    var g = Math.round((185 - 80*t) * shade);
                                    var b = Math.round((160 - 100*t) * shade);
                                    fillCol = 'rgb(' + r + ',' + g + ',' + b + ')';
                                } else {
                                    var t = (quad.i + quad.j) / (su + sv);
                                    var r = Math.round((88 + 150*t) * shade);
                                    var g = Math.round((150 + 50*Math.sin(t*3.14)) * shade);
                                    var b = Math.round((200 - 100*t) * shade);
                                    fillCol = 'rgb(' + r + ',' + g + ',' + b + ')';
                                }

                                ctx.fillStyle = fillCol;
                                ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(quad.p0[0], quad.p0[1]);
                                ctx.lineTo(quad.p1[0], quad.p1[1]);
                                ctx.lineTo(quad.p2[0], quad.p2[1]);
                                ctx.lineTo(quad.p3[0], quad.p3[1]);
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();
                            }

                            // Title
                            viz.screenText(currentSurface, viz.width/2, 20, viz.colors.white, 16);
                            viz.screenText('Drag to rotate', viz.width/2, viz.height - 16, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Regular Surfaces — Definition
        // ================================================================
        {
            id: 'sec-definition',
            title: 'Regular Surfaces',
            content: `
<h2>Regular Surfaces</h2>

<div class="env-block intuition">
    <div class="env-title">The Key Idea</div>
    <div class="env-body">
        <p>A regular surface is a subset \\(S \\subset \\mathbb{R}^3\\) that "locally looks like a piece of \\(\\mathbb{R}^2\\)." At each point, we can flatten out a neighborhood of \\(S\\) into an open set in the plane. The flattening must be smooth, invertible, and non-degenerate.</p>
    </div>
</div>

<p>We need three conditions on a parametrization \\(\\mathbf{x}: U \\to \\mathbb{R}^3\\) to ensure that \\(\\mathbf{x}(U)\\) is a well-behaved piece of surface:</p>

<div class="env-block definition">
    <div class="env-title">Definition 3.1 (Parametrized Surface Patch)</div>
    <div class="env-body">
        <p>Let \\(U \\subset \\mathbb{R}^2\\) be open. A <strong>parametrized surface patch</strong> is a smooth (\\(C^\\infty\\)) map \\(\\mathbf{x}: U \\to \\mathbb{R}^3\\),</p>
        \\[
        \\mathbf{x}(u,v) = \\bigl(x(u,v),\\, y(u,v),\\, z(u,v)\\bigr),
        \\]
        <p>satisfying the <strong>regularity condition</strong>: the partial derivatives</p>
        \\[
        \\mathbf{x}_u = \\frac{\\partial \\mathbf{x}}{\\partial u}, \\qquad \\mathbf{x}_v = \\frac{\\partial \\mathbf{x}}{\\partial v}
        \\]
        <p>are linearly independent at every point of \\(U\\). Equivalently, \\(\\mathbf{x}_u \\times \\mathbf{x}_v \\neq \\mathbf{0}\\) for all \\((u,v) \\in U\\).</p>
    </div>
</div>

<p>The regularity condition \\(\\mathbf{x}_u \\times \\mathbf{x}_v \\neq 0\\) ensures that the image of \\(\\mathbf{x}\\) has a well-defined tangent plane at every point: the two partial derivatives span a two-dimensional subspace of \\(\\mathbb{R}^3\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 3.2 (Regular Surface)</div>
    <div class="env-body">
        <p>A subset \\(S \\subset \\mathbb{R}^3\\) is a <strong>regular surface</strong> if for every point \\(p \\in S\\), there exists a neighborhood \\(V\\) of \\(p\\) in \\(\\mathbb{R}^3\\), an open set \\(U \\subset \\mathbb{R}^2\\), and a map \\(\\mathbf{x}: U \\to V \\cap S\\) such that:</p>
        <ol>
            <li><strong>Smoothness:</strong> \\(\\mathbf{x}\\) is a \\(C^\\infty\\) map.</li>
            <li><strong>Homeomorphism:</strong> \\(\\mathbf{x}\\) is a homeomorphism onto \\(V \\cap S\\) (continuous bijection with continuous inverse).</li>
            <li><strong>Regularity:</strong> \\(d\\mathbf{x}_q: \\mathbb{R}^2 \\to \\mathbb{R}^3\\) is injective for all \\(q \\in U\\) (equivalently, \\(\\mathbf{x}_u \\times \\mathbf{x}_v \\neq 0\\)).</li>
        </ol>
        <p>The map \\(\\mathbf{x}\\) is called a <strong>coordinate chart</strong> (or <strong>local parametrization</strong>), and the pair \\((U, \\mathbf{x})\\) is a <strong>coordinate neighborhood</strong>.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why Three Conditions?</div>
    <div class="env-body">
        <p><strong>Smoothness</strong> lets us differentiate. <strong>Homeomorphism</strong> prevents self-intersections (the surface does not cross itself within the patch). <strong>Regularity</strong> prevents the surface from degenerating (no cusps, no collapsed dimensions).</p>
        <p>Dropping any one leads to pathology: a parametrization that doubles back on itself (fails homeomorphism), a cusp (fails regularity), or an object we cannot do calculus on (fails smoothness).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Graph of a Smooth Function</div>
    <div class="env-body">
        <p>Let \\(f: U \\to \\mathbb{R}\\) be a smooth function on an open set \\(U \\subset \\mathbb{R}^2\\). The graph \\(\\{(x,y,f(x,y)) : (x,y) \\in U\\}\\) is a regular surface. The parametrization</p>
        \\[\\mathbf{x}(u,v) = (u, v, f(u,v))\\]
        <p>satisfies all three conditions. In particular, \\(\\mathbf{x}_u = (1, 0, f_u)\\) and \\(\\mathbf{x}_v = (0, 1, f_v)\\), so</p>
        \\[\\mathbf{x}_u \\times \\mathbf{x}_v = (-f_u, -f_v, 1) \\neq \\mathbf{0}\\]
        <p>everywhere. This is the simplest way to produce regular surfaces.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-surface-patch"></div>
`,
            visualizations: [
                {
                    id: 'viz-surface-patch',
                    title: 'Parametric Surface Patch',
                    description: 'See how a rectangular domain in (u,v)-space maps to a surface patch in 3D. Adjust the surface type to see different parametrizations. The grid lines show how the (u,v)-grid deforms onto the surface.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 60
                        });

                        var surfaceType = 'Sphere';
                        var angleX = 0.35, angleY = 0.7;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        var types = ['Sphere', 'Torus', 'Paraboloid'];
                        types.forEach(function(name) {
                            VizEngine.createButton(controls, name, function() {
                                surfaceType = name;
                                draw();
                            });
                        });

                        var showDomain = true;
                        VizEngine.createButton(controls, 'Toggle Domain', function() {
                            showDomain = !showDomain;
                            draw();
                        });

                        viz.canvas.addEventListener('mousedown', function(e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleY += (e.clientX - lastMX) * 0.008;
                            angleX += (e.clientY - lastMY) * 0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });
                        viz.canvas.addEventListener('touchstart', function(e) { dragging = true; lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY; e.preventDefault(); }, {passive:false});
                        viz.canvas.addEventListener('touchmove', function(e) {
                            if (!dragging) return;
                            angleY += (e.touches[0].clientX - lastMX) * 0.008;
                            angleX += (e.touches[0].clientY - lastMY) * 0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY;
                            draw(); e.preventDefault();
                        }, {passive:false});
                        viz.canvas.addEventListener('touchend', function() { dragging = false; });

                        function paramFn(u, v) {
                            if (surfaceType === 'Sphere') {
                                return [1.5*Math.cos(u)*Math.sin(v), 1.5*Math.sin(u)*Math.sin(v), 1.5*Math.cos(v)];
                            } else if (surfaceType === 'Torus') {
                                var R = 1.6, r = 0.55;
                                return [(R+r*Math.cos(v))*Math.cos(u), (R+r*Math.cos(v))*Math.sin(u), r*Math.sin(v)];
                            } else {
                                return [u, v, 0.4*(u*u + v*v)];
                            }
                        }

                        function getRange() {
                            if (surfaceType === 'Sphere') return {u:[0.3, 2.2], v:[0.4, 2.4]};
                            if (surfaceType === 'Torus') return {u:[0.3, 3.5], v:[0.3, 4.5]};
                            return {u:[-1.8, 1.8], v:[-1.8, 1.8]};
                        }

                        function project(x, y, z) {
                            var cy = Math.cos(angleY), sy = Math.sin(angleY);
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var x1 = cy*x + sy*z;
                            var z1 = -sy*x + cy*z;
                            var y1 = cx*y - sx*z1;
                            var z2 = sx*y + cx*z1;
                            return [280 + x1*60, 210 - y1*60, z2];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var rng = getRange();
                            var N = 25;

                            // Draw domain rectangle if toggled
                            if (showDomain) {
                                var dx0 = 50, dy0 = 310, dw = 140, dh = 90;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(dx0, dy0, dw, dh);
                                ctx.fillStyle = viz.colors.teal + '15';
                                ctx.fillRect(dx0, dy0, dw, dh);
                                // Grid
                                ctx.strokeStyle = viz.colors.teal + '44';
                                ctx.lineWidth = 0.5;
                                for (var i = 1; i < 5; i++) {
                                    ctx.beginPath(); ctx.moveTo(dx0 + i*dw/5, dy0); ctx.lineTo(dx0 + i*dw/5, dy0+dh); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(dx0, dy0+i*dh/5); ctx.lineTo(dx0+dw, dy0+i*dh/5); ctx.stroke();
                                }
                                viz.screenText('(u, v) domain', dx0+dw/2, dy0-10, viz.colors.teal, 11);
                                viz.screenText('u', dx0+dw+12, dy0+dh/2, viz.colors.text, 10);
                                viz.screenText('v', dx0+dw/2, dy0+dh+14, viz.colors.text, 10);

                                // Arrow from domain to surface
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4,3]);
                                ctx.beginPath(); ctx.moveTo(dx0+dw+5, dy0+10); ctx.quadraticCurveTo(280, dy0-40, 300, 120); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('x(u,v)', 240, dy0-50, viz.colors.orange, 12);
                            }

                            // Draw wireframe surface
                            // u-curves
                            for (var j = 0; j <= N; j++) {
                                var v = rng.v[0] + (rng.v[1]-rng.v[0])*j/N;
                                ctx.strokeStyle = (j % 5 === 0) ? viz.colors.blue + 'aa' : viz.colors.blue + '33';
                                ctx.lineWidth = (j % 5 === 0) ? 1.5 : 0.7;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= N; i++) {
                                    var u = rng.u[0] + (rng.u[1]-rng.u[0])*i/N;
                                    var p = paramFn(u, v);
                                    var sp = project(p[0], p[1], p[2]);
                                    if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; }
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }
                            // v-curves
                            for (var i = 0; i <= N; i++) {
                                var u = rng.u[0] + (rng.u[1]-rng.u[0])*i/N;
                                ctx.strokeStyle = (i % 5 === 0) ? viz.colors.teal + 'aa' : viz.colors.teal + '33';
                                ctx.lineWidth = (i % 5 === 0) ? 1.5 : 0.7;
                                ctx.beginPath();
                                var started = false;
                                for (var j = 0; j <= N; j++) {
                                    var v = rng.v[0] + (rng.v[1]-rng.v[0])*j/N;
                                    var p = paramFn(u, v);
                                    var sp = project(p[0], p[1], p[2]);
                                    if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; }
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            viz.screenText(surfaceType + ' Patch', viz.width/2, 18, viz.colors.white, 15);
                            viz.screenText('Drag to rotate', viz.width/2, viz.height-16, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the parametrization \\(\\mathbf{x}(u,v) = (u, v, u^2 + v^2)\\) of the paraboloid satisfies the regularity condition.',
                    hint: 'Compute \\(\\mathbf{x}_u\\) and \\(\\mathbf{x}_v\\), then their cross product.',
                    solution: '\\(\\mathbf{x}_u = (1, 0, 2u)\\) and \\(\\mathbf{x}_v = (0, 1, 2v)\\). The cross product is \\(\\mathbf{x}_u \\times \\mathbf{x}_v = (-2u, -2v, 1)\\). Since the \\(z\\)-component is always 1, this is never zero. The regularity condition holds everywhere.'
                },
                {
                    question: 'Why does the parametrization \\(\\mathbf{x}(u,v) = (u^2, v^2, 0)\\) fail to be a regular surface patch? Where does it fail?',
                    hint: 'Check what happens at \\(u = 0\\) or \\(v = 0\\).',
                    solution: '\\(\\mathbf{x}_u = (2u, 0, 0)\\) and \\(\\mathbf{x}_v = (0, 2v, 0)\\). At \\(u = 0\\) we have \\(\\mathbf{x}_u = \\mathbf{0}\\), and at \\(v = 0\\) we have \\(\\mathbf{x}_v = \\mathbf{0}\\). In both cases the cross product vanishes, so the regularity condition fails along the lines \\(u = 0\\) and \\(v = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Examples
        // ================================================================
        {
            id: 'sec-examples',
            title: 'Examples',
            content: `
<h2>Examples of Regular Surfaces</h2>

<p>The power of Definition 3.2 is that it applies uniformly to a wide range of geometric objects. We verify the definition for several classical surfaces.</p>

<h3>The Sphere</h3>

<div class="env-block example">
    <div class="env-title">Example 3.1: The Unit Sphere \\(S^2\\)</div>
    <div class="env-body">
        <p>The unit sphere \\(S^2 = \\{(x,y,z) \\in \\mathbb{R}^3 : x^2 + y^2 + z^2 = 1\\}\\) is a regular surface. No single parametrization covers the entire sphere (this follows from topological considerations: \\(S^2\\) is compact, but \\(\\mathbb{R}^2\\) is not). We need at least two charts.</p>
        <p>One standard choice: the <strong>stereographic projections</strong> from the north and south poles. Another: six graphs (upper/lower hemispheres in each coordinate direction). The simplest local parametrization is the spherical coordinates</p>
        \\[
        \\mathbf{x}(\\theta, \\varphi) = (\\sin\\varphi\\cos\\theta,\\, \\sin\\varphi\\sin\\theta,\\, \\cos\\varphi)
        \\]
        <p>for \\(\\theta \\in (0, 2\\pi)\\) and \\(\\varphi \\in (0, \\pi)\\). This covers \\(S^2\\) minus a half-meridian. Regularity: \\(\\mathbf{x}_\\theta \\times \\mathbf{x}_\\varphi = -\\sin\\varphi\\,(\\sin\\varphi\\cos\\theta, \\sin\\varphi\\sin\\theta, \\cos\\varphi)\\), which vanishes only when \\(\\sin\\varphi = 0\\), i.e., at the poles; but we have excluded the poles from the domain.</p>
    </div>
</div>

<h3>The Torus</h3>

<div class="env-block example">
    <div class="env-title">Example 3.2: The Torus</div>
    <div class="env-body">
        <p>Rotate the circle \\((x - R)^2 + z^2 = r^2\\) (where \\(0 < r < R\\)) about the \\(z\\)-axis. The resulting torus has the parametrization</p>
        \\[
        \\mathbf{x}(u,v) = \\bigl((R + r\\cos v)\\cos u,\\, (R + r\\cos v)\\sin u,\\, r\\sin v\\bigr)
        \\]
        <p>for \\(u, v \\in (0, 2\\pi)\\). This covers the torus minus two circles. The cross product \\(\\mathbf{x}_u \\times \\mathbf{x}_v\\) has magnitude \\(r(R + r\\cos v)\\), which is strictly positive since \\(R > r > 0\\).</p>
    </div>
</div>

<h3>The Hyperboloid of One Sheet</h3>

<div class="env-block example">
    <div class="env-title">Example 3.3: Hyperboloid of One Sheet</div>
    <div class="env-body">
        <p>The surface \\(x^2 + y^2 - z^2 = 1\\) can be parametrized as</p>
        \\[
        \\mathbf{x}(u,v) = (\\cosh v \\cos u,\\, \\cosh v \\sin u,\\, \\sinh v)
        \\]
        <p>for \\(u \\in (0, 2\\pi)\\), \\(v \\in \\mathbb{R}\\). Regularity follows because \\(|\\mathbf{x}_u \\times \\mathbf{x}_v| = \\cosh v \\sqrt{\\cosh^2 v + \\sinh^2 v} > 0\\) for all \\(v\\).</p>
    </div>
</div>

<h3>The Mobius Strip</h3>

<div class="env-block example">
    <div class="env-title">Example 3.4: The Mobius Strip</div>
    <div class="env-body">
        <p>The Mobius strip is constructed by taking a rectangular strip and gluing the short edges with a half-twist. A parametrization:</p>
        \\[
        \\mathbf{x}(u,v) = \\left(\\left(1 + \\tfrac{v}{2}\\cos\\tfrac{u}{2}\\right)\\cos u,\\; \\left(1 + \\tfrac{v}{2}\\cos\\tfrac{u}{2}\\right)\\sin u,\\; \\tfrac{v}{2}\\sin\\tfrac{u}{2}\\right)
        \\]
        <p>for \\(u \\in (0, 2\\pi)\\) and \\(v \\in (-1, 1)\\). This is a regular surface patch (one can verify \\(\\mathbf{x}_u \\times \\mathbf{x}_v \\neq 0\\) on this domain). The full Mobius strip requires overlapping charts with a twist in the transition maps.</p>
        <p>Notably, the Mobius strip is <strong>non-orientable</strong>: there is no consistent choice of unit normal vector over the entire surface. We will return to this in the section on orientability.</p>
    </div>
</div>

<h3>The Klein Bottle</h3>

<div class="env-block example">
    <div class="env-title">Example 3.5: The Klein Bottle (Immersion)</div>
    <div class="env-body">
        <p>The Klein bottle is a closed, non-orientable surface that cannot be embedded in \\(\\mathbb{R}^3\\) without self-intersection. However, it admits an <strong>immersion</strong> (a smooth map whose differential is everywhere injective):</p>
        \\[
        \\mathbf{x}(u,v) = \\bigl((2 + \\cos v)\\cos u,\\, (2 + \\cos v)\\sin u,\\, \\sin v + u\\bigr)
        \\]
        <p>This is not an embedding (it self-intersects), but locally every patch satisfies the regularity condition. The Klein bottle is an example of an abstract regular surface that cannot be realized as a subset of \\(\\mathbb{R}^3\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-coordinate-curves"></div>
`,
            visualizations: [
                {
                    id: 'viz-coordinate-curves',
                    title: 'Coordinate Curves on a Surface',
                    description: 'The u-curves (v = const, shown in blue) and v-curves (u = const, shown in teal) form a coordinate grid on the surface. Adjust the parameter to highlight specific curves.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 60
                        });

                        var surfType = 'Sphere';
                        var highlightU = 0.5, highlightV = 0.5;
                        var angleX = 0.4, angleY = 0.7;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        VizEngine.createButton(controls, 'Sphere', function() { surfType='Sphere'; draw(); });
                        VizEngine.createButton(controls, 'Torus', function() { surfType='Torus'; draw(); });
                        VizEngine.createButton(controls, 'Paraboloid', function() { surfType='Paraboloid'; draw(); });

                        VizEngine.createSlider(controls, 'u-curve', 0, 1, highlightU, 0.05, function(v) { highlightU = v; draw(); });
                        VizEngine.createSlider(controls, 'v-curve', 0, 1, highlightV, 0.05, function(v) { highlightV = v; draw(); });

                        viz.canvas.addEventListener('mousedown', function(e) { dragging=true; lastMX=e.clientX; lastMY=e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleY += (e.clientX-lastMX)*0.008; angleX += (e.clientY-lastMY)*0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX=e.clientX; lastMY=e.clientY; draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging=false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging=false; });
                        viz.canvas.addEventListener('touchstart', function(e) { dragging=true; lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
                        viz.canvas.addEventListener('touchmove', function(e) {
                            if (!dragging) return;
                            angleY += (e.touches[0].clientX-lastMX)*0.008; angleX += (e.touches[0].clientY-lastMY)*0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY; draw(); e.preventDefault();
                        }, {passive:false});
                        viz.canvas.addEventListener('touchend', function() { dragging=false; });

                        function paramFn(u, v) {
                            if (surfType === 'Sphere') {
                                var theta = u * 2*Math.PI, phi = v * Math.PI;
                                return [1.5*Math.cos(theta)*Math.sin(phi), 1.5*Math.sin(theta)*Math.sin(phi), 1.5*Math.cos(phi)];
                            } else if (surfType === 'Torus') {
                                var a = u*2*Math.PI, b = v*2*Math.PI;
                                var R = 1.6, r = 0.55;
                                return [(R+r*Math.cos(b))*Math.cos(a), (R+r*Math.cos(b))*Math.sin(a), r*Math.sin(b)];
                            } else {
                                var uu = (u-0.5)*3.2, vv = (v-0.5)*3.2;
                                return [uu, vv, 0.25*(uu*uu+vv*vv)];
                            }
                        }

                        function project(x, y, z) {
                            var cy=Math.cos(angleY), sy=Math.sin(angleY), cx=Math.cos(angleX), sx=Math.sin(angleX);
                            var x1=cy*x+sy*z, z1=-sy*x+cy*z, y1=cx*y-sx*z1, z2=sx*y+cx*z1;
                            return [280+x1*60, 210-y1*60, z2];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var N = 40;

                            // Background wireframe
                            for (var j = 0; j <= 20; j++) {
                                var vv = j/20;
                                ctx.strokeStyle = viz.colors.text + '18';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var i = 0; i <= N; i++) {
                                    var uu = i/N;
                                    var p = paramFn(uu, vv);
                                    var sp = project(p[0], p[1], p[2]);
                                    i === 0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }
                            for (var i = 0; i <= 20; i++) {
                                var uu = i/20;
                                ctx.strokeStyle = viz.colors.text + '18';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var j = 0; j <= N; j++) {
                                    var vv = j/N;
                                    var p = paramFn(uu, vv);
                                    var sp = project(p[0], p[1], p[2]);
                                    j === 0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            // Highlighted u-curve (v = const)
                            var vConst = highlightV;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var i = 0; i <= N; i++) {
                                var uu = i/N;
                                var p = paramFn(uu, vConst);
                                var sp = project(p[0], p[1], p[2]);
                                i === 0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.stroke();

                            // Highlighted v-curve (u = const)
                            var uConst = highlightU;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var j = 0; j <= N; j++) {
                                var vv = j/N;
                                var p = paramFn(uConst, vv);
                                var sp = project(p[0], p[1], p[2]);
                                j === 0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.stroke();

                            // Intersection point
                            var ip = paramFn(uConst, vConst);
                            var sip = project(ip[0], ip[1], ip[2]);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(sip[0], sip[1], 5, 0, Math.PI*2); ctx.fill();

                            viz.screenText('Coordinate Curves on ' + surfType, viz.width/2, 18, viz.colors.white, 15);
                            viz.screenText('u-curve (v=const)', 100, viz.height-32, viz.colors.blue, 11);
                            viz.screenText('v-curve (u=const)', 100, viz.height-16, viz.colors.teal, 11);
                            viz.screenText('Drag to rotate', viz.width/2, viz.height-16, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the cylinder \\(x^2 + y^2 = 1\\) (for \\(z \\in \\mathbb{R}\\)) is a regular surface by giving an explicit parametrization and verifying the regularity condition.',
                    hint: 'Use \\(\\mathbf{x}(u,v) = (\\cos u, \\sin u, v)\\).',
                    solution: 'Let \\(\\mathbf{x}(u,v) = (\\cos u, \\sin u, v)\\) for \\(u \\in (0, 2\\pi)\\), \\(v \\in \\mathbb{R}\\). Then \\(\\mathbf{x}_u = (-\\sin u, \\cos u, 0)\\) and \\(\\mathbf{x}_v = (0, 0, 1)\\). The cross product is \\(\\mathbf{x}_u \\times \\mathbf{x}_v = (\\cos u, \\sin u, 0)\\), which has magnitude 1, so it never vanishes. The map is a homeomorphism onto its image (minus one ruling), and additional charts (e.g., shifted by \\(\\pi\\)) cover the full cylinder.'
                },
                {
                    question: 'For the torus parametrization in Example 3.2, compute \\(\\mathbf{x}_u \\times \\mathbf{x}_v\\) explicitly and verify it is never zero when \\(R > r > 0\\).',
                    hint: 'Compute each partial derivative, then use the determinant formula for the cross product.',
                    solution: '\\(\\mathbf{x}_u = (-(R+r\\cos v)\\sin u,\\, (R+r\\cos v)\\cos u,\\, 0)\\) and \\(\\mathbf{x}_v = (-r\\sin v\\cos u,\\, -r\\sin v\\sin u,\\, r\\cos v)\\). The cross product is \\(\\mathbf{x}_u \\times \\mathbf{x}_v = r(R+r\\cos v)(\\cos v\\cos u,\\, \\cos v\\sin u,\\, \\sin v) + \\cdots\\). Its magnitude simplifies to \\(r(R + r\\cos v)\\). Since \\(R > r\\), we have \\(R + r\\cos v \\geq R - r > 0\\), so the cross product never vanishes.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Tangent Plane
        // ================================================================
        {
            id: 'sec-tangent-plane',
            title: 'Tangent Plane',
            content: `
<h2>The Tangent Plane</h2>

<div class="env-block intuition">
    <div class="env-title">The Key Idea</div>
    <div class="env-body">
        <p>At a point \\(p\\) on a regular surface \\(S\\), the tangent plane \\(T_pS\\) is the best linear approximation to \\(S\\) near \\(p\\). It is the plane that "just touches" the surface at \\(p\\), containing all velocity vectors of curves on \\(S\\) passing through \\(p\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 3.3 (Tangent Vector)</div>
    <div class="env-body">
        <p>Let \\(S\\) be a regular surface and \\(p \\in S\\). A vector \\(w \\in \\mathbb{R}^3\\) is <strong>tangent to \\(S\\) at \\(p\\)</strong> if there exists a smooth curve \\(\\alpha: (-\\varepsilon, \\varepsilon) \\to S\\) with \\(\\alpha(0) = p\\) and \\(\\alpha'(0) = w\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Proposition 3.1 (Tangent Plane)</div>
    <div class="env-body">
        <p>Let \\(\\mathbf{x}: U \\to S\\) be a parametrization of \\(S\\) around \\(p = \\mathbf{x}(u_0, v_0)\\). Then the set of all tangent vectors to \\(S\\) at \\(p\\) is a two-dimensional subspace of \\(\\mathbb{R}^3\\) given by</p>
        \\[
        T_pS = \\text{span}\\{\\mathbf{x}_u(u_0, v_0),\\, \\mathbf{x}_v(u_0, v_0)\\}.
        \\]
        <p>This subspace is called the <strong>tangent plane</strong> to \\(S\\) at \\(p\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Any curve \\(\\alpha(t)\\) on \\(S\\) passing through \\(p\\) can be written in local coordinates as \\(\\alpha(t) = \\mathbf{x}(u(t), v(t))\\) with \\(u(0) = u_0\\), \\(v(0) = v_0\\). By the chain rule,</p>
        \\[
        \\alpha'(0) = u'(0)\\,\\mathbf{x}_u + v'(0)\\,\\mathbf{x}_v.
        \\]
        <p>Since \\(u'(0)\\) and \\(v'(0)\\) can be any real numbers, every tangent vector is a linear combination of \\(\\mathbf{x}_u\\) and \\(\\mathbf{x}_v\\). Conversely, for any \\(a, b \\in \\mathbb{R}\\), the curve \\(\\alpha(t) = \\mathbf{x}(u_0 + at, v_0 + bt)\\) has \\(\\alpha'(0) = a\\mathbf{x}_u + b\\mathbf{x}_v\\). The regularity condition ensures \\(\\mathbf{x}_u\\) and \\(\\mathbf{x}_v\\) are linearly independent, so \\(T_pS\\) is two-dimensional.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 3.4 (Unit Normal)</div>
    <div class="env-body">
        <p>At a point \\(p = \\mathbf{x}(u_0, v_0)\\) on a regular surface, the <strong>unit normal vector</strong> is</p>
        \\[
        N(p) = \\frac{\\mathbf{x}_u \\times \\mathbf{x}_v}{|\\mathbf{x}_u \\times \\mathbf{x}_v|}\\bigg|_{(u_0, v_0)}.
        \\]
        <p>The normal \\(N\\) is perpendicular to \\(T_pS\\). Note: \\(N\\) depends on the parametrization (reversing the roles of \\(u\\) and \\(v\\) flips \\(N\\)).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-tangent-plane-surface"></div>

<div class="viz-placeholder" data-viz="viz-normal-vector"></div>
`,
            visualizations: [
                {
                    id: 'viz-tangent-plane-surface',
                    title: 'Tangent Plane at a Point on a Surface',
                    description: 'Drag the point along the surface to see the tangent plane move with it. The tangent plane is spanned by the partial derivatives x_u and x_v at that point.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 60
                        });

                        var uPt = 0.5, vPt = 0.5;
                        var angleX = 0.35, angleY = 0.5;
                        var dragging = false, lastMX = 0, lastMY = 0;
                        var dragMode = 'rotate'; // 'rotate' or 'point'

                        VizEngine.createSlider(controls, 'u\u2080', 0.1, 0.9, uPt, 0.02, function(v) { uPt = v; draw(); });
                        VizEngine.createSlider(controls, 'v\u2080', 0.1, 0.9, vPt, 0.02, function(v) { vPt = v; draw(); });

                        viz.canvas.addEventListener('mousedown', function(e) { dragging=true; lastMX=e.clientX; lastMY=e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleY += (e.clientX-lastMX)*0.008; angleX += (e.clientY-lastMY)*0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX=e.clientX; lastMY=e.clientY; draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging=false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging=false; });
                        viz.canvas.addEventListener('touchstart', function(e) { dragging=true; lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
                        viz.canvas.addEventListener('touchmove', function(e) {
                            if (!dragging) return;
                            angleY += (e.touches[0].clientX-lastMX)*0.008; angleX += (e.touches[0].clientY-lastMY)*0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY; draw(); e.preventDefault();
                        }, {passive:false});
                        viz.canvas.addEventListener('touchend', function() { dragging=false; });

                        function paramFn(u, v) {
                            var theta = u*2*Math.PI, phi = v*Math.PI;
                            return [1.5*Math.cos(theta)*Math.sin(phi), 1.5*Math.sin(theta)*Math.sin(phi), 1.5*Math.cos(phi)];
                        }

                        function partials(u, v) {
                            var h = 0.001;
                            var p = paramFn(u, v);
                            var pu = paramFn(u+h, v);
                            var pv = paramFn(u, v+h);
                            var xu = [(pu[0]-p[0])/h, (pu[1]-p[1])/h, (pu[2]-p[2])/h];
                            var xv = [(pv[0]-p[0])/h, (pv[1]-p[1])/h, (pv[2]-p[2])/h];
                            return {xu: xu, xv: xv};
                        }

                        function cross(a, b) {
                            return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
                        }

                        function normalize(v) {
                            var l = Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
                            return l < 1e-10 ? [0,0,0] : [v[0]/l, v[1]/l, v[2]/l];
                        }

                        function project(x, y, z) {
                            var cy=Math.cos(angleY), sy=Math.sin(angleY), cx=Math.cos(angleX), sx=Math.sin(angleX);
                            var x1=cy*x+sy*z, z1=-sy*x+cy*z, y1=cx*y-sx*z1, z2=sx*y+cx*z1;
                            return [280+x1*60, 210-y1*60, z2];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var N = 30;

                            // Wireframe sphere
                            for (var j = 0; j <= 20; j++) {
                                var vv = j/20;
                                ctx.strokeStyle = viz.colors.text + '22';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var i = 0; i <= N; i++) {
                                    var uu = i/N;
                                    var p = paramFn(uu, vv);
                                    var sp = project(p[0], p[1], p[2]);
                                    i===0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }
                            for (var i = 0; i <= 20; i++) {
                                var uu = i/20;
                                ctx.strokeStyle = viz.colors.text + '22';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var j = 0; j <= N; j++) {
                                    var vv = j/N;
                                    var p = paramFn(uu, vv);
                                    var sp = project(p[0], p[1], p[2]);
                                    j===0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            // Point and tangent plane
                            var pt = paramFn(uPt, vPt);
                            var d = partials(uPt, vPt);
                            var xu = d.xu, xv = d.xv;
                            var n = normalize(cross(xu, xv));

                            // Draw tangent plane as a filled quad
                            var planeSize = 0.7;
                            var xuN = normalize(xu), xvN = normalize(xv);
                            var corners = [
                                [pt[0]-planeSize*xuN[0]-planeSize*xvN[0], pt[1]-planeSize*xuN[1]-planeSize*xvN[1], pt[2]-planeSize*xuN[2]-planeSize*xvN[2]],
                                [pt[0]+planeSize*xuN[0]-planeSize*xvN[0], pt[1]+planeSize*xuN[1]-planeSize*xvN[1], pt[2]+planeSize*xuN[2]-planeSize*xvN[2]],
                                [pt[0]+planeSize*xuN[0]+planeSize*xvN[0], pt[1]+planeSize*xuN[1]+planeSize*xvN[1], pt[2]+planeSize*xuN[2]+planeSize*xvN[2]],
                                [pt[0]-planeSize*xuN[0]+planeSize*xvN[0], pt[1]-planeSize*xuN[1]+planeSize*xvN[1], pt[2]-planeSize*xuN[2]+planeSize*xvN[2]]
                            ];
                            var sc = corners.map(function(c) { return project(c[0], c[1], c[2]); });

                            ctx.fillStyle = viz.colors.purple + '33';
                            ctx.strokeStyle = viz.colors.purple + '88';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(sc[0][0], sc[0][1]);
                            for (var k = 1; k < 4; k++) ctx.lineTo(sc[k][0], sc[k][1]);
                            ctx.closePath();
                            ctx.fill(); ctx.stroke();

                            // Tangent vectors x_u and x_v
                            var vecScale = 0.4;
                            var xuLen = Math.sqrt(xu[0]*xu[0]+xu[1]*xu[1]+xu[2]*xu[2]);
                            var xvLen = Math.sqrt(xv[0]*xv[0]+xv[1]*xv[1]+xv[2]*xv[2]);
                            var xuS = [xu[0]/xuLen*vecScale, xu[1]/xuLen*vecScale, xu[2]/xuLen*vecScale];
                            var xvS = [xv[0]/xvLen*vecScale, xv[1]/xvLen*vecScale, xv[2]/xvLen*vecScale];

                            var sp0 = project(pt[0], pt[1], pt[2]);
                            var sp1 = project(pt[0]+xuS[0], pt[1]+xuS[1], pt[2]+xuS[2]);
                            var sp2 = project(pt[0]+xvS[0], pt[1]+xvS[1], pt[2]+xvS[2]);
                            var sp3 = project(pt[0]+n[0]*0.5, pt[1]+n[1]*0.5, pt[2]+n[2]*0.5);

                            // x_u vector
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(sp0[0], sp0[1]); ctx.lineTo(sp1[0], sp1[1]); ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(sp1[0], sp1[1], 4, 0, Math.PI*2); ctx.fill();
                            viz.screenText('x_u', sp1[0]+10, sp1[1]-8, viz.colors.blue, 12);

                            // x_v vector
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(sp0[0], sp0[1]); ctx.lineTo(sp2[0], sp2[1]); ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(sp2[0], sp2[1], 4, 0, Math.PI*2); ctx.fill();
                            viz.screenText('x_v', sp2[0]+10, sp2[1]-8, viz.colors.teal, 12);

                            // Normal vector
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(sp0[0], sp0[1]); ctx.lineTo(sp3[0], sp3[1]); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(sp3[0], sp3[1], 4, 0, Math.PI*2); ctx.fill();
                            viz.screenText('N', sp3[0]+10, sp3[1]-8, viz.colors.orange, 12);

                            // Point
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(sp0[0], sp0[1], 5, 0, Math.PI*2); ctx.fill();

                            viz.screenText('Tangent Plane T_pS', viz.width/2, 18, viz.colors.white, 15);
                            viz.screenText('p', sp0[0]-12, sp0[1]-10, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-normal-vector',
                    title: 'Normal Vector Field on a Surface',
                    description: 'The unit normal vector N at each point is perpendicular to the tangent plane. This visualization shows a field of normals across the surface.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 60
                        });

                        var surfType = 'Sphere';
                        var angleX = 0.35, angleY = 0.6;
                        var dragging = false, lastMX = 0, lastMY = 0;
                        var normalLen = 0.4;

                        VizEngine.createButton(controls, 'Sphere', function() { surfType='Sphere'; draw(); });
                        VizEngine.createButton(controls, 'Paraboloid', function() { surfType='Paraboloid'; draw(); });
                        VizEngine.createSlider(controls, 'Normal length', 0.1, 0.8, normalLen, 0.05, function(v) { normalLen=v; draw(); });

                        viz.canvas.addEventListener('mousedown', function(e) { dragging=true; lastMX=e.clientX; lastMY=e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleY += (e.clientX-lastMX)*0.008; angleX += (e.clientY-lastMY)*0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX=e.clientX; lastMY=e.clientY; draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging=false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging=false; });
                        viz.canvas.addEventListener('touchstart', function(e) { dragging=true; lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
                        viz.canvas.addEventListener('touchmove', function(e) {
                            if (!dragging) return;
                            angleY += (e.touches[0].clientX-lastMX)*0.008; angleX += (e.touches[0].clientY-lastMY)*0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY; draw(); e.preventDefault();
                        }, {passive:false});
                        viz.canvas.addEventListener('touchend', function() { dragging=false; });

                        function paramFn(u, v) {
                            if (surfType === 'Sphere') {
                                var theta = u*2*Math.PI, phi = v*Math.PI;
                                return [1.4*Math.cos(theta)*Math.sin(phi), 1.4*Math.sin(theta)*Math.sin(phi), 1.4*Math.cos(phi)];
                            } else {
                                var uu = (u-0.5)*3, vv = (v-0.5)*3;
                                return [uu, vv, 0.22*(uu*uu+vv*vv)];
                            }
                        }

                        function getNormal(u, v) {
                            var h = 0.001;
                            var p = paramFn(u,v), pu = paramFn(u+h,v), pv = paramFn(u,v+h);
                            var xu = [(pu[0]-p[0])/h, (pu[1]-p[1])/h, (pu[2]-p[2])/h];
                            var xv = [(pv[0]-p[0])/h, (pv[1]-p[1])/h, (pv[2]-p[2])/h];
                            var n = [xu[1]*xv[2]-xu[2]*xv[1], xu[2]*xv[0]-xu[0]*xv[2], xu[0]*xv[1]-xu[1]*xv[0]];
                            var l = Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);
                            return l < 1e-10 ? [0,0,0] : [n[0]/l, n[1]/l, n[2]/l];
                        }

                        function project(x, y, z) {
                            var cy=Math.cos(angleY), sy=Math.sin(angleY), cx=Math.cos(angleX), sx=Math.sin(angleX);
                            var x1=cy*x+sy*z, z1=-sy*x+cy*z, y1=cx*y-sx*z1, z2=sx*y+cx*z1;
                            return [280+x1*60, 200-y1*60, z2];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var N = 30;

                            // Wireframe
                            for (var j = 0; j <= 20; j++) {
                                var vv = j/20;
                                ctx.strokeStyle = viz.colors.text + '1a';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var i = 0; i <= N; i++) {
                                    var uu = i/N;
                                    var p = paramFn(uu, vv);
                                    var sp = project(p[0], p[1], p[2]);
                                    i===0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }
                            for (var i = 0; i <= 20; i++) {
                                var uu = i/20;
                                ctx.strokeStyle = viz.colors.text + '1a';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                for (var j = 0; j <= N; j++) {
                                    var vv = j/N;
                                    var p = paramFn(uu, vv);
                                    var sp = project(p[0], p[1], p[2]);
                                    j===0 ? ctx.moveTo(sp[0], sp[1]) : ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            // Normal vectors at grid of points
                            var ns = 8;
                            for (var i = 1; i < ns; i++) {
                                for (var j = 1; j < ns; j++) {
                                    var uu = i/ns, vv = j/ns;
                                    var p = paramFn(uu, vv);
                                    var n = getNormal(uu, vv);
                                    var sp0 = project(p[0], p[1], p[2]);
                                    var sp1 = project(p[0]+n[0]*normalLen, p[1]+n[1]*normalLen, p[2]+n[2]*normalLen);

                                    ctx.strokeStyle = viz.colors.orange + 'cc';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(sp0[0], sp0[1]); ctx.lineTo(sp1[0], sp1[1]); ctx.stroke();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath(); ctx.arc(sp1[0], sp1[1], 2, 0, Math.PI*2); ctx.fill();
                                    ctx.fillStyle = viz.colors.white + '88';
                                    ctx.beginPath(); ctx.arc(sp0[0], sp0[1], 2, 0, Math.PI*2); ctx.fill();
                                }
                            }

                            viz.screenText('Normal Vector Field on ' + surfType, viz.width/2, 18, viz.colors.white, 15);
                            viz.screenText('Drag to rotate', viz.width/2, viz.height-16, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the tangent plane to the surface \\(z = x^2 + y^2\\) at the point \\(p = (1, 1, 2)\\).',
                    hint: 'Use the parametrization \\(\\mathbf{x}(u,v) = (u, v, u^2+v^2)\\) and compute the tangent vectors at \\((u_0, v_0) = (1, 1)\\).',
                    solution: '\\(\\mathbf{x}_u = (1, 0, 2u)\\) and \\(\\mathbf{x}_v = (0, 1, 2v)\\). At \\((1,1)\\): \\(\\mathbf{x}_u = (1, 0, 2)\\), \\(\\mathbf{x}_v = (0, 1, 2)\\). The tangent plane passes through \\(p = (1,1,2)\\) with normal \\(\\mathbf{x}_u \\times \\mathbf{x}_v = (-2, -2, 1)\\). Equation: \\(-2(x-1) - 2(y-1) + (z-2) = 0\\), i.e., \\(z = 2x + 2y - 2\\).'
                },
                {
                    question: 'Show that the tangent plane to the sphere \\(x^2 + y^2 + z^2 = R^2\\) at a point \\(p = (a, b, c)\\) has the equation \\(ax + by + cz = R^2\\).',
                    hint: 'The sphere is a level set \\(F(x,y,z) = x^2+y^2+z^2 = R^2\\). The gradient \\(\\nabla F\\) is normal to the level set.',
                    solution: 'The gradient of \\(F(x,y,z) = x^2+y^2+z^2\\) is \\(\\nabla F = (2x, 2y, 2z)\\). At \\(p = (a,b,c)\\), the normal is \\((2a, 2b, 2c)\\), proportional to \\((a, b, c)\\). The tangent plane equation is \\(a(x-a) + b(y-b) + c(z-c) = 0\\), which simplifies to \\(ax + by + cz = a^2 + b^2 + c^2 = R^2\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Smooth Maps Between Surfaces
        // ================================================================
        {
            id: 'sec-smooth-maps',
            title: 'Smooth Maps Between Surfaces',
            content: `
<h2>Smooth Maps Between Surfaces</h2>

<div class="env-block intuition">
    <div class="env-title">Maps That Preserve Smoothness</div>
    <div class="env-body">
        <p>Given two surfaces \\(S_1\\) and \\(S_2\\), we need a notion of "smooth map" \\(F: S_1 \\to S_2\\). Since surfaces are subsets of \\(\\mathbb{R}^3\\), the definition reduces to checking smoothness in local coordinates.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 3.5 (Smooth Map Between Surfaces)</div>
    <div class="env-body">
        <p>A continuous map \\(F: S_1 \\to S_2\\) between regular surfaces is <strong>smooth</strong> if for every \\(p \\in S_1\\), there exist parametrizations \\(\\mathbf{x}_1: U_1 \\to S_1\\) around \\(p\\) and \\(\\mathbf{x}_2: U_2 \\to S_2\\) around \\(F(p)\\) such that the composition</p>
        \\[
        \\mathbf{x}_2^{-1} \\circ F \\circ \\mathbf{x}_1: U_1 \\to U_2
        \\]
        <p>is a smooth map between open subsets of \\(\\mathbb{R}^2\\).</p>
    </div>
</div>

<p>The composite \\(\\mathbf{x}_2^{-1} \\circ F \\circ \\mathbf{x}_1\\) is called the <strong>local representation</strong> or <strong>coordinate expression</strong> of \\(F\\). It is a map from \\((u_1, v_1)\\)-coordinates to \\((u_2, v_2)\\)-coordinates.</p>

<h3>The Differential of a Smooth Map</h3>

<div class="env-block definition">
    <div class="env-title">Definition 3.6 (Differential)</div>
    <div class="env-body">
        <p>Let \\(F: S_1 \\to S_2\\) be smooth and \\(p \\in S_1\\). The <strong>differential</strong> of \\(F\\) at \\(p\\) is the linear map</p>
        \\[
        dF_p: T_pS_1 \\to T_{F(p)}S_2
        \\]
        <p>defined as follows: for \\(w \\in T_pS_1\\), choose a curve \\(\\alpha: (-\\varepsilon, \\varepsilon) \\to S_1\\) with \\(\\alpha(0) = p\\) and \\(\\alpha'(0) = w\\). Then</p>
        \\[
        dF_p(w) = (F \\circ \\alpha)'(0).
        \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Proposition 3.2 (Differential in Coordinates)</div>
    <div class="env-body">
        <p>Let \\(\\bar{F} = \\mathbf{x}_2^{-1} \\circ F \\circ \\mathbf{x}_1\\) be the coordinate expression. If we write \\(w = a\\,(\\mathbf{x}_1)_u + b\\,(\\mathbf{x}_1)_v\\), then</p>
        \\[
        dF_p(w) = \\left(\\frac{\\partial \\bar{F}_1}{\\partial u}a + \\frac{\\partial \\bar{F}_1}{\\partial v}b\\right)(\\mathbf{x}_2)_{u_2} + \\left(\\frac{\\partial \\bar{F}_2}{\\partial u}a + \\frac{\\partial \\bar{F}_2}{\\partial v}b\\right)(\\mathbf{x}_2)_{v_2}.
        \\]
        <p>In matrix form, the differential \\(dF_p\\) is represented (in the bases \\(\\{(\\mathbf{x}_1)_u, (\\mathbf{x}_1)_v\\}\\) and \\(\\{(\\mathbf{x}_2)_{u_2}, (\\mathbf{x}_2)_{v_2}\\}\\)) by the Jacobian matrix of \\(\\bar{F}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Gauss Map as a Smooth Map</div>
    <div class="env-body">
        <p>The <strong>Gauss map</strong> \\(N: S \\to S^2\\) sends each point \\(p \\in S\\) to its unit normal \\(N(p) \\in S^2\\). If \\(S\\) is an orientable regular surface, the Gauss map is a smooth map from \\(S\\) to the unit sphere. Its differential \\(dN_p: T_pS \\to T_{N(p)}S^2\\) will be central to the study of curvature in later chapters.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 3.7 (Diffeomorphism)</div>
    <div class="env-body">
        <p>A smooth map \\(F: S_1 \\to S_2\\) is a <strong>diffeomorphism</strong> if it is bijective and its inverse \\(F^{-1}: S_2 \\to S_1\\) is also smooth. If a diffeomorphism exists between \\(S_1\\) and \\(S_2\\), the two surfaces are <strong>diffeomorphic</strong>.</p>
        <p>Diffeomorphic surfaces are "the same" from the standpoint of differential geometry: any property expressible in terms of smooth functions is shared by diffeomorphic surfaces.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(F: \\mathbb{R}^2 \\to S^2\\) be defined by \\(F(u,v) = (\\cos u \\sin v, \\sin u \\sin v, \\cos v)\\). Show that \\(F\\) is smooth but not a diffeomorphism. Where does it fail to be injective?',
                    hint: 'Check what happens when \\(u\\) changes by \\(2\\pi\\), or when \\(v = 0\\) or \\(v = \\pi\\).',
                    solution: '\\(F\\) is smooth as a composition of smooth functions. It fails to be injective in two ways: (1) \\(F(u, v) = F(u + 2\\pi, v)\\) for all \\(v\\), so the map is periodic in \\(u\\); (2) at \\(v = 0\\), \\(F(u, 0) = (0, 0, 1)\\) for all \\(u\\) (the north pole), and similarly \\(F(u, \\pi) = (0, 0, -1)\\) for all \\(u\\) (the south pole). These are the poles, where all meridians converge.'
                },
                {
                    question: 'Prove that the composition of two smooth maps between surfaces is smooth.',
                    hint: 'Express everything in local coordinates and use the fact that the composition of smooth maps between open sets of \\(\\mathbb{R}^2\\) is smooth.',
                    solution: 'Let \\(F: S_1 \\to S_2\\) and \\(G: S_2 \\to S_3\\) be smooth. For \\(p \\in S_1\\), choose charts \\(\\mathbf{x}_1, \\mathbf{x}_2, \\mathbf{x}_3\\) around \\(p\\), \\(F(p)\\), and \\(G(F(p))\\). Then \\(\\mathbf{x}_3^{-1} \\circ (G \\circ F) \\circ \\mathbf{x}_1 = (\\mathbf{x}_3^{-1} \\circ G \\circ \\mathbf{x}_2) \\circ (\\mathbf{x}_2^{-1} \\circ F \\circ \\mathbf{x}_1)\\). Each factor is smooth by hypothesis, and the composition of smooth maps between open sets of \\(\\mathbb{R}^2\\) is smooth. Hence \\(G \\circ F\\) is smooth.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Orientability
        // ================================================================
        {
            id: 'sec-orientability',
            title: 'Orientability',
            content: `
<h2>Orientability</h2>

<div class="env-block intuition">
    <div class="env-title">The Two-Sidedness Question</div>
    <div class="env-body">
        <p>Hold a piece of paper: it has two distinct sides. Paint one side red and the other blue; the two colors never meet. This is an <strong>orientable</strong> surface. Now take a Mobius strip: an ant walking along it returns to its starting point on "the other side." The Mobius strip has only one side; it is <strong>non-orientable</strong>.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 3.8 (Orientable Surface)</div>
    <div class="env-body">
        <p>A regular surface \\(S\\) is <strong>orientable</strong> if there exists a smooth unit normal field \\(N: S \\to S^2\\), i.e., a smooth choice of unit normal vector \\(N(p)\\) at every point \\(p \\in S\\).</p>
        <p>Equivalently, \\(S\\) is orientable if it can be covered by coordinate charts \\(\\{(U_\\alpha, \\mathbf{x}_\\alpha)\\}\\) such that on every overlap \\(\\mathbf{x}_\\alpha(U_\\alpha) \\cap \\mathbf{x}_\\beta(U_\\beta)\\), the transition map \\(\\mathbf{x}_\\beta^{-1} \\circ \\mathbf{x}_\\alpha\\) has positive Jacobian determinant.</p>
    </div>
</div>

<p>An <strong>orientation</strong> on \\(S\\) is a choice of such a normal field \\(N\\). A surface that admits an orientation has exactly two: \\(N\\) and \\(-N\\).</p>

<h3>Examples of Orientable Surfaces</h3>

<div class="env-block example">
    <div class="env-title">Orientable Surfaces</div>
    <div class="env-body">
        <ul>
            <li><strong>The sphere \\(S^2\\):</strong> The outward-pointing unit normal \\(N(p) = p\\) is a smooth normal field.</li>
            <li><strong>Any graph \\(z = f(x,y)\\):</strong> The upward normal \\(N = \\frac{(-f_x, -f_y, 1)}{\\sqrt{f_x^2 + f_y^2 + 1}}\\) is globally defined.</li>
            <li><strong>The torus:</strong> Being a surface of revolution, it has a consistent outward normal.</li>
        </ul>
    </div>
</div>

<h3>Non-Orientable Surfaces</h3>

<div class="env-block example">
    <div class="env-title">The Mobius Strip Is Non-Orientable</div>
    <div class="env-body">
        <p>Consider the Mobius strip \\(M\\). If a normal field \\(N\\) existed, we could transport \\(N\\) continuously around the central circle. But after one full traversal, the normal returns to the starting point <em>reversed</em>: \\(N\\) becomes \\(-N\\). This contradicts continuity, so no consistent normal field exists.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.1 (Orientability and Normal Fields)</div>
    <div class="env-body">
        <p>A connected regular surface \\(S \\subset \\mathbb{R}^3\\) is orientable if and only if there exists a smooth unit normal field \\(N: S \\to S^2\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Remark</div>
    <div class="env-body">
        <p>Every compact surface without boundary embedded in \\(\\mathbb{R}^3\\) is orientable. Non-orientability can occur for surfaces with boundary (Mobius strip) or for surfaces that self-intersect (Klein bottle immersion). The Klein bottle, as a topological space, is non-orientable and cannot be embedded (without self-intersection) in \\(\\mathbb{R}^3\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-mobius-strip"></div>

<div class="viz-placeholder" data-viz="viz-orientability-demo"></div>
`,
            visualizations: [
                {
                    id: 'viz-mobius-strip',
                    title: 'The Mobius Strip: Non-Orientability',
                    description: 'Watch the construction of a Mobius strip from a rectangular strip. The animation shows how a half-twist before gluing creates a surface with only one side. A normal vector transported around the strip comes back reversed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 60
                        });

                        var angleX = 0.2, angleY = 0.0;
                        var dragging = false, lastMX = 0, lastMY = 0;
                        var animPhase = 0;
                        var showNormal = true;
                        var normalPos = 0;

                        VizEngine.createSlider(controls, 'Normal position', 0, 1, normalPos, 0.01, function(v) {
                            normalPos = v; draw();
                        });
                        VizEngine.createButton(controls, 'Toggle Normal', function() { showNormal = !showNormal; draw(); });

                        viz.canvas.addEventListener('mousedown', function(e) { dragging=true; lastMX=e.clientX; lastMY=e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleY += (e.clientX-lastMX)*0.008; angleX += (e.clientY-lastMY)*0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX=e.clientX; lastMY=e.clientY; draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging=false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging=false; });
                        viz.canvas.addEventListener('touchstart', function(e) { dragging=true; lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
                        viz.canvas.addEventListener('touchmove', function(e) {
                            if (!dragging) return;
                            angleY += (e.touches[0].clientX-lastMX)*0.008; angleX += (e.touches[0].clientY-lastMY)*0.008;
                            angleX = Math.max(-Math.PI/2, Math.min(Math.PI/2, angleX));
                            lastMX=e.touches[0].clientX; lastMY=e.touches[0].clientY; draw(); e.preventDefault();
                        }, {passive:false});
                        viz.canvas.addEventListener('touchend', function() { dragging=false; });

                        function mobiusPoint(u, v) {
                            // u in [0, 2pi], v in [-0.4, 0.4]
                            var x = (1 + v*Math.cos(u/2))*Math.cos(u);
                            var y = (1 + v*Math.cos(u/2))*Math.sin(u);
                            var z = v*Math.sin(u/2);
                            return [x, y, z];
                        }

                        function mobiusNormal(u) {
                            // Normal perpendicular to the strip at the central curve (v=0)
                            // For the Mobius strip, the "normal" rotates by pi over one full loop
                            var nx = Math.cos(u/2)*Math.cos(u);
                            var ny = Math.cos(u/2)*Math.sin(u);
                            var nz = Math.sin(u/2);
                            var l = Math.sqrt(nx*nx+ny*ny+nz*nz);
                            return [nx/l, ny/l, nz/l];
                        }

                        function project(x, y, z) {
                            var cy=Math.cos(angleY), sy=Math.sin(angleY), cx=Math.cos(angleX), sx=Math.sin(angleX);
                            var x1=cy*x+sy*z, z1=-sy*x+cy*z, y1=cx*y-sx*z1, z2=sx*y+cx*z1;
                            return [280+x1*80, 200-y1*80, z2];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw Mobius strip as mesh
                            var su = 60, sv = 10;
                            var pts = [];
                            for (var i = 0; i <= su; i++) {
                                pts[i] = [];
                                for (var j = 0; j <= sv; j++) {
                                    var u = 2*Math.PI*i/su;
                                    var v = -0.4 + 0.8*j/sv;
                                    var p = mobiusPoint(u, v);
                                    pts[i][j] = project(p[0], p[1], p[2]);
                                }
                            }

                            // Sort and draw quads
                            var quads = [];
                            for (var i = 0; i < su; i++) {
                                for (var j = 0; j < sv; j++) {
                                    var p0=pts[i][j], p1=pts[i+1][j], p2=pts[i+1][j+1], p3=pts[i][j+1];
                                    var avgZ = (p0[2]+p1[2]+p2[2]+p3[2])/4;
                                    quads.push({p0:p0, p1:p1, p2:p2, p3:p3, z:avgZ, i:i, j:j});
                                }
                            }
                            quads.sort(function(a,b) { return a.z - b.z; });

                            for (var q = 0; q < quads.length; q++) {
                                var quad = quads[q];
                                var ax = quad.p1[0]-quad.p0[0], ay = quad.p1[1]-quad.p0[1];
                                var bx = quad.p3[0]-quad.p0[0], by = quad.p3[1]-quad.p0[1];
                                var nz = ax*by - ay*bx;
                                var shade = Math.abs(nz) / (Math.sqrt(ax*ax+ay*ay)*Math.sqrt(bx*bx+by*by)+0.001);
                                shade = 0.3 + 0.7*shade;

                                // Color by position along the strip
                                var t = quad.i / su;
                                var r = Math.round((100 + 155*t)*shade);
                                var g = Math.round((140 + 60*Math.sin(t*Math.PI))*shade);
                                var b = Math.round((220 - 100*t)*shade);

                                ctx.fillStyle = 'rgb('+r+','+g+','+b+')';
                                ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(quad.p0[0], quad.p0[1]);
                                ctx.lineTo(quad.p1[0], quad.p1[1]);
                                ctx.lineTo(quad.p2[0], quad.p2[1]);
                                ctx.lineTo(quad.p3[0], quad.p3[1]);
                                ctx.closePath();
                                ctx.fill(); ctx.stroke();
                            }

                            // Draw transported normal vector
                            if (showNormal) {
                                var u0 = normalPos * 2 * Math.PI;
                                var centerPt = mobiusPoint(u0, 0);
                                var n = mobiusNormal(u0);
                                var nLen = 0.5;
                                var sp0 = project(centerPt[0], centerPt[1], centerPt[2]);
                                var sp1 = project(centerPt[0]+n[0]*nLen, centerPt[1]+n[1]*nLen, centerPt[2]+n[2]*nLen);

                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(sp0[0], sp0[1]); ctx.lineTo(sp1[0], sp1[1]); ctx.stroke();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(sp1[0], sp1[1], 4, 0, Math.PI*2); ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(sp0[0], sp0[1], 4, 0, Math.PI*2); ctx.fill();

                                // Show that at position 0 and 1, normal is reversed
                                if (normalPos > 0.95) {
                                    viz.screenText('N has flipped!', sp1[0]+15, sp1[1], viz.colors.red, 12);
                                }
                            }

                            viz.screenText('Mobius Strip', viz.width/2, 18, viz.colors.white, 15);
                            viz.screenText('Slide "Normal position" from 0 to 1 to see N reverse', viz.width/2, viz.height-16, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-orientability-demo',
                    title: 'Orientable vs Non-Orientable',
                    description: 'Compare: on the sphere (orientable), a normal vector transported around any closed loop returns to itself. On the Mobius strip (non-orientable), it returns reversed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 60
                        });

                        var tParam = 0;
                        var animating = false;
                        var animId = null;

                        VizEngine.createSlider(controls, 'Position around loop', 0, 1, tParam, 0.01, function(v) {
                            tParam = v; draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) { animating = false; cancelAnimationFrame(animId); return; }
                            animating = true;
                            tParam = 0;
                            function step() {
                                tParam += 0.004;
                                if (tParam > 1) { tParam = 1; animating = false; draw(); return; }
                                draw();
                                animId = requestAnimationFrame(step);
                            }
                            step();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Left: Sphere (orientable)
                            var cx1 = W*0.25, cy1 = H*0.48;
                            var R = 70;

                            // Draw sphere (simple circle representation)
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.arc(cx1, cy1, R, 0, Math.PI*2); ctx.stroke();

                            // Equator
                            ctx.strokeStyle = viz.colors.blue + '66';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.ellipse(cx1, cy1, R, R*0.3, 0, 0, Math.PI*2);
                            ctx.stroke();

                            // Moving point on equator
                            var angle1 = tParam * 2 * Math.PI;
                            var px1 = cx1 + R*Math.cos(angle1);
                            var py1 = cy1 + R*0.3*Math.sin(angle1);

                            // Normal (always outward, same direction = consistent)
                            var nx1 = Math.cos(angle1), ny1 = 0.3*Math.sin(angle1);
                            var nl1 = Math.sqrt(nx1*nx1+ny1*ny1);
                            nx1/=nl1; ny1/=nl1;
                            var nLen = 30;

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px1+nx1*nLen, py1+ny1*nLen); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(px1+nx1*nLen, py1+ny1*nLen, 3, 0, Math.PI*2); ctx.fill();

                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(px1, py1, 4, 0, Math.PI*2); ctx.fill();

                            viz.screenText('Sphere (Orientable)', cx1, 30, viz.colors.blue, 13);
                            viz.screenText('N stays consistent', cx1, H-30, viz.colors.green, 11);

                            // Divider
                            ctx.strokeStyle = viz.colors.text + '33';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4,4]);
                            ctx.beginPath(); ctx.moveTo(W/2, 50); ctx.lineTo(W/2, H-20); ctx.stroke();
                            ctx.setLineDash([]);

                            // Right: Mobius strip (non-orientable)
                            var cx2 = W*0.75, cy2 = H*0.48;

                            // Draw a simple Mobius-like figure-8 loop
                            ctx.strokeStyle = viz.colors.purple + '66';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var t = i/100 * 2*Math.PI;
                                var mx = cx2 + 70*Math.cos(t);
                                var my = cy2 + 35*Math.sin(t) + 10*Math.sin(2*t);
                                i === 0 ? ctx.moveTo(mx, my) : ctx.lineTo(mx, my);
                            }
                            ctx.stroke();

                            // Moving point on the loop
                            var angle2 = tParam * 2*Math.PI;
                            var px2 = cx2 + 70*Math.cos(angle2);
                            var py2 = cy2 + 35*Math.sin(angle2) + 10*Math.sin(2*angle2);

                            // Normal that flips: cos(angle/2) gives a half-rotation
                            var normalSign = Math.cos(angle2/2);
                            // Tangent direction for perpendicular
                            var tx2 = -70*Math.sin(angle2);
                            var ty2 = 35*Math.cos(angle2) + 20*Math.cos(2*angle2);
                            var tl2 = Math.sqrt(tx2*tx2+ty2*ty2);
                            // Normal perpendicular to tangent
                            var nnx2 = -ty2/tl2 * normalSign;
                            var nny2 = tx2/tl2 * normalSign;

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(px2, py2); ctx.lineTo(px2+nnx2*nLen, py2+nny2*nLen); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(px2+nnx2*nLen, py2+nny2*nLen, 3, 0, Math.PI*2); ctx.fill();

                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(px2, py2, 4, 0, Math.PI*2); ctx.fill();

                            viz.screenText('Mobius Strip (Non-Orientable)', cx2, 30, viz.colors.purple, 13);
                            if (tParam > 0.95) {
                                viz.screenText('N is reversed!', cx2, H-30, viz.colors.red, 11);
                            } else {
                                viz.screenText('N flips after full loop', cx2, H-30, viz.colors.text, 11);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that any surface given as a graph \\(z = f(x,y)\\) is orientable.',
                    hint: 'Construct an explicit smooth unit normal field using the gradient of the function \\(F(x,y,z) = z - f(x,y)\\).',
                    solution: 'For the graph \\(z = f(x,y)\\), define \\(F(x,y,z) = z - f(x,y)\\). Then \\(\\nabla F = (-f_x, -f_y, 1)\\), which is never zero. The unit normal \\(N = \\frac{(-f_x, -f_y, 1)}{\\sqrt{f_x^2 + f_y^2 + 1}}\\) is a smooth, globally defined normal field on the entire graph. Hence the graph is orientable.'
                },
                {
                    question: 'Is the cylinder \\(x^2 + y^2 = 1\\) orientable? Justify your answer.',
                    hint: 'Construct an outward-pointing normal field.',
                    solution: 'Yes. At a point \\((\\cos\\theta, \\sin\\theta, z)\\) on the cylinder, the outward unit normal is \\(N = (\\cos\\theta, \\sin\\theta, 0)\\). This is smooth and globally defined on the entire cylinder. Alternatively, the cylinder is a level set of \\(G(x,y,z) = x^2+y^2\\) with \\(\\nabla G = (2x, 2y, 0) \\neq 0\\) on the cylinder.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Next Chapter
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: Measuring on Surfaces</h2>

<p>We have defined regular surfaces, established the tangent plane and unit normal at each point, introduced smooth maps between surfaces, and distinguished orientable from non-orientable surfaces.</p>

<p>But so far we have no way to measure anything <em>on</em> the surface. How long is a curve drawn on \\(S\\)? What is the area of a region? What is the angle between two curves at their intersection point?</p>

<p>All of these measurements come from the <strong>first fundamental form</strong>, which is the restriction of the inner product in \\(\\mathbb{R}^3\\) to each tangent plane \\(T_pS\\). If \\(w_1, w_2 \\in T_pS\\), the first fundamental form is simply</p>
\\[
I_p(w_1, w_2) = \\langle w_1, w_2 \\rangle,
\\]
<p>the dot product inherited from the ambient space. Expressing this in coordinates \\((u,v)\\) yields the classical coefficients \\(E, F, G\\) that encode all metric information about the surface.</p>

<div class="env-block remark">
    <div class="env-title">What's Next</div>
    <div class="env-body">
        <p>In Chapter 4, we will:</p>
        <ul>
            <li>Define the first fundamental form \\(I = E\\,du^2 + 2F\\,du\\,dv + G\\,dv^2\\).</li>
            <li>Use it to compute arc lengths, angles, and areas on surfaces.</li>
            <li>See how conformal and area-preserving maps arise naturally from the first fundamental form.</li>
        </ul>
        <p>The first fundamental form is the "metric" on the surface, and it is the starting point for all of intrinsic geometry.</p>
    </div>
</div>

<h3>Chapter Summary</h3>

<div class="env-block theorem">
    <div class="env-title">Key Concepts of Chapter 3</div>
    <div class="env-body">
        <ol>
            <li><strong>Regular surface:</strong> A subset \\(S \\subset \\mathbb{R}^3\\) covered by smooth, homeomorphic, regular coordinate charts.</li>
            <li><strong>Regularity condition:</strong> \\(\\mathbf{x}_u \\times \\mathbf{x}_v \\neq 0\\), ensuring a well-defined tangent plane.</li>
            <li><strong>Tangent plane:</strong> \\(T_pS = \\text{span}\\{\\mathbf{x}_u, \\mathbf{x}_v\\}\\), the best linear approximation to \\(S\\) at \\(p\\).</li>
            <li><strong>Unit normal:</strong> \\(N = \\frac{\\mathbf{x}_u \\times \\mathbf{x}_v}{|\\mathbf{x}_u \\times \\mathbf{x}_v|}\\), perpendicular to \\(T_pS\\).</li>
            <li><strong>Smooth maps:</strong> Defined via smoothness of coordinate representations; the differential \\(dF_p\\) is a linear map between tangent planes.</li>
            <li><strong>Orientability:</strong> Existence of a consistent global unit normal field; the Mobius strip fails this.</li>
        </ol>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        }
    ]
});
