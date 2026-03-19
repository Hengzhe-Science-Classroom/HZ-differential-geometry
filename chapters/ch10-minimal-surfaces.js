window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Minimal Surfaces',
    subtitle: 'Soap films and surfaces of zero mean curvature',
    sections: [
        // ================================================================
        // SECTION 1: Soap Films and Area Minimization
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Soap Films and Area Minimization',
            content: `
<h2>Soap Films and Area Minimization</h2>

<div class="env-block intuition">
    <div class="env-title">A Physical Experiment</div>
    <div class="env-body">
        <p>Dip a wire frame of any shape into soapy water and pull it out. The thin film that forms across the frame naturally finds the shape of least area spanning that boundary. This is not a coincidence; it is surface tension at work, pulling the film into a configuration that minimizes its potential energy, which is proportional to area.</p>
        <p>The mathematical study of such surfaces is one of the oldest and richest chapters in differential geometry, connecting the calculus of variations, complex analysis, and topology.</p>
    </div>
</div>

<p>The problem of finding surfaces of minimal area dates back to Lagrange (1762), who formulated it as the first genuinely two-dimensional problem in the calculus of variations. Given a closed curve \\(\\Gamma\\) in \\(\\mathbb{R}^3\\), we seek a surface \\(S\\) spanning \\(\\Gamma\\) that minimizes the area functional</p>

\\[
\\mathcal{A}(S) = \\iint_S \\, dA.
\\]

<p>The physical realization via soap films provided both motivation and experimental verification. Joseph Plateau's systematic experiments in the 1840s led to what is now called <strong>Plateau's problem</strong>: does a surface of minimal area always exist for a given boundary curve?</p>

<h3>The Calculus of Variations Approach</h3>

<p>If a surface is given as a graph \\(z = f(x,y)\\) over a domain \\(\\Omega \\subset \\mathbb{R}^2\\), its area is</p>

\\[
\\mathcal{A}(f) = \\iint_\\Omega \\sqrt{1 + f_x^2 + f_y^2} \\, dx \\, dy.
\\]

<p>To find a critical point of this functional (a surface whose area cannot be decreased by small perturbations), we compute the first variation. Let \\(f_t = f + t\\eta\\) for a smooth function \\(\\eta\\) vanishing on \\(\\partial\\Omega\\). Then</p>

\\[
\\frac{d}{dt}\\bigg|_{t=0} \\mathcal{A}(f_t) = \\iint_\\Omega \\frac{f_x \\eta_x + f_y \\eta_y}{\\sqrt{1 + f_x^2 + f_y^2}} \\, dx \\, dy.
\\]

<p>Integrating by parts and setting this equal to zero for all \\(\\eta\\) yields the <strong>minimal surface equation</strong>:</p>

\\[
(1 + f_y^2)f_{xx} - 2f_x f_y f_{xy} + (1 + f_x^2)f_{yy} = 0.
\\]

<p>This is a nonlinear elliptic PDE. Its solutions are precisely the graphs with zero mean curvature, \\(H = 0\\). We will see why in the next section.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Euler discovered the catenoid (1744) as the first non-planar minimal surface. Meusnier (1776) recognized that minimal surfaces are characterized by \\(H = 0\\). Lagrange derived the minimal surface equation (1762), and Plateau's experiments (1849) sparked the mathematical race to prove existence. The problem was finally solved independently by Douglas and Rad&oacute; in 1930-1931, earning Douglas one of the first Fields Medals in 1936.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-soap-film"></div>
`,
            visualizations: [
                {
                    id: 'viz-soap-film',
                    title: 'Soap Film Minimizing Area',
                    description: 'A boundary wire (shown in blue) spans a soap film (shown as a mesh). The film takes the shape that minimizes area. Drag the slider to deform the boundary and watch the surface change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, originX: 280, originY: 210, scale: 80 });
                        var warp = 0.0;
                        var angleX = 0.5, angleZ = 0.6;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        VizEngine.createSlider(controls, 'Boundary warp', 0, 1.5, warp, 0.05, function(v) { warp = v; draw(); });

                        // Mouse rotation
                        viz.canvas.addEventListener('mousedown', function(e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleZ += (e.clientX - lastMX) * 0.01;
                            angleX += (e.clientY - lastMY) * 0.01;
                            angleX = Math.max(-1.5, Math.min(1.5, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });

                        function rot3(px, py, pz) {
                            var cz = Math.cos(angleZ), sz = Math.sin(angleZ);
                            var x1 = px * cz - py * sz, y1 = px * sz + py * cz;
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var y2 = y1 * cx - pz * sx, z2 = y1 * sx + pz * cx;
                            return [x1, y2, z2];
                        }
                        function proj(px, py, pz) {
                            var r = rot3(px, py, pz);
                            return [viz.originX + r[0] * viz.scale, viz.originY - r[1] * viz.scale, r[2]];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var N = 30;

                            // Generate boundary and surface: disk-like parametrization
                            // boundary: circle with warp
                            var lines = [];
                            var boundaryPts = [];
                            for (var i = 0; i <= N; i++) {
                                var th = 2 * Math.PI * i / N;
                                var r = 1.5 + warp * 0.4 * Math.sin(3 * th);
                                var z = warp * 0.5 * Math.cos(2 * th);
                                boundaryPts.push([r * Math.cos(th), r * Math.sin(th), z]);
                            }

                            // Surface: fill disk with radial lines, interpolating height
                            // Simple minimal-like surface: linear interpolation from center to boundary
                            // For warp > 0, use a soap-film-like shape (biharmonic approx)
                            var gridR = 15, gridTh = N;
                            var pts = [];
                            for (var ri = 0; ri <= gridR; ri++) {
                                var row = [];
                                var t = ri / gridR;
                                for (var ti = 0; ti < gridTh; ti++) {
                                    var th = 2 * Math.PI * ti / gridTh;
                                    var rBound = 1.5 + warp * 0.4 * Math.sin(3 * th);
                                    var zBound = warp * 0.5 * Math.cos(2 * th);
                                    // Radial interpolation with slight curvature for minimal look
                                    var rr = t * rBound;
                                    var zz = t * t * zBound; // quadratic gives soap-film look
                                    row.push([rr * Math.cos(th), rr * Math.sin(th), zz]);
                                }
                                pts.push(row);
                            }

                            // Collect all mesh lines for depth sorting
                            var segments = [];
                            // Radial lines
                            for (var ri = 0; ri < gridR; ri++) {
                                for (var ti = 0; ti < gridTh; ti++) {
                                    var p1 = pts[ri][ti], p2 = pts[ri + 1][ti];
                                    var s1 = proj(p1[0], p1[1], p1[2]);
                                    var s2 = proj(p2[0], p2[1], p2[2]);
                                    var avgZ = (s1[2] + s2[2]) / 2;
                                    segments.push({ x1: s1[0], y1: s1[1], x2: s2[0], y2: s2[1], z: avgZ, type: 'mesh' });
                                }
                            }
                            // Circular lines
                            for (var ri = 1; ri <= gridR; ri++) {
                                for (var ti = 0; ti < gridTh; ti++) {
                                    var ti2 = (ti + 1) % gridTh;
                                    var p1 = pts[ri][ti], p2 = pts[ri][ti2];
                                    var s1 = proj(p1[0], p1[1], p1[2]);
                                    var s2 = proj(p2[0], p2[1], p2[2]);
                                    var avgZ = (s1[2] + s2[2]) / 2;
                                    segments.push({ x1: s1[0], y1: s1[1], x2: s2[0], y2: s2[1], z: avgZ, type: 'mesh' });
                                }
                            }
                            // Boundary
                            for (var i = 0; i < N; i++) {
                                var p1 = boundaryPts[i], p2 = boundaryPts[i + 1];
                                var s1 = proj(p1[0], p1[1], p1[2]);
                                var s2 = proj(p2[0], p2[1], p2[2]);
                                var avgZ = (s1[2] + s2[2]) / 2;
                                segments.push({ x1: s1[0], y1: s1[1], x2: s2[0], y2: s2[1], z: avgZ, type: 'boundary' });
                            }

                            // Depth sort
                            segments.sort(function(a, b) { return a.z - b.z; });

                            for (var si = 0; si < segments.length; si++) {
                                var seg = segments[si];
                                ctx.strokeStyle = seg.type === 'boundary' ? viz.colors.blue : (viz.colors.teal + '55');
                                ctx.lineWidth = seg.type === 'boundary' ? 2.5 : 0.7;
                                ctx.beginPath();
                                ctx.moveTo(seg.x1, seg.y1);
                                ctx.lineTo(seg.x2, seg.y2);
                                ctx.stroke();
                            }

                            viz.screenText('Drag to rotate | Warp boundary to see film reshape', viz.width / 2, viz.height - 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the area functional \\(\\mathcal{A}(f) = \\iint_\\Omega \\sqrt{1 + f_x^2 + f_y^2} \\, dx\\, dy\\) for a graph \\(z = f(x,y)\\) reduces to \\(\\mathcal{A} = \\text{Area}(\\Omega)\\) when \\(f\\) is constant (i.e., the surface is a flat plane).',
                    hint: 'When \\(f\\) is constant, what are \\(f_x\\) and \\(f_y\\)?',
                    solution: 'If \\(f\\) is constant, then \\(f_x = f_y = 0\\), so the integrand becomes \\(\\sqrt{1 + 0 + 0} = 1\\), and \\(\\mathcal{A}(f) = \\iint_\\Omega 1 \\, dx\\, dy = \\text{Area}(\\Omega)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Minimal Surfaces (Definition)
        // ================================================================
        {
            id: 'sec-definition',
            title: 'Minimal Surfaces',
            content: `
<h2>Minimal Surfaces: \\(H = 0\\)</h2>

<div class="env-block definition">
    <div class="env-title">Definition 10.1 (Minimal Surface)</div>
    <div class="env-body">
        <p>A regular surface \\(S \\subset \\mathbb{R}^3\\) is called a <strong>minimal surface</strong> if its mean curvature vanishes identically: \\(H = 0\\) at every point.</p>
    </div>
</div>

<p>The name "minimal" is slightly misleading. A minimal surface is not necessarily area-minimizing; it is a <em>critical point</em> of the area functional, analogous to how a critical point of an ordinary function need not be a minimum. Just as a saddle point of \\(f(x,y)\\) satisfies \\(\\nabla f = 0\\) without being a minimum, a minimal surface satisfies \\(H = 0\\) without necessarily having the least area.</p>

<h3>The Variational Characterization</h3>

<p>The fundamental connection between \\(H = 0\\) and area minimization comes from the first variation formula. Let \\(\\mathbf{r}(u,v)\\) parametrize a surface \\(S\\), and consider a normal variation</p>

\\[
\\mathbf{r}_t(u,v) = \\mathbf{r}(u,v) + t\\phi(u,v)\\mathbf{N}(u,v),
\\]

<p>where \\(\\phi\\) is a smooth function vanishing on the boundary and \\(\\mathbf{N}\\) is the unit normal. The first variation of area is</p>

\\[
\\frac{d}{dt}\\bigg|_{t=0} \\mathcal{A}(S_t) = -2 \\iint_S \\phi \\, H \\, dA.
\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 10.1 (First Variation of Area)</div>
    <div class="env-body">
        <p>A surface \\(S\\) is a critical point of the area functional (among all surfaces with the same boundary) if and only if its mean curvature vanishes everywhere: \\(H \\equiv 0\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof sketch</div>
    <div class="env-body">
        <p>The "if" direction is immediate: if \\(H = 0\\), the first variation is zero for all \\(\\phi\\). For the "only if" direction, if \\(H(p) \\neq 0\\) at some point \\(p\\), choose \\(\\phi\\) to be a bump function centered at \\(p\\) with the same sign as \\(H(p)\\). Then the integral is strictly negative, meaning area can be decreased. \\(\\square\\)</p>
    </div>
</div>

<h3>Mean Curvature and the Laplacian</h3>

<p>There is a beautiful relationship between mean curvature and the position vector. If \\(\\mathbf{r}(u,v)\\) is a conformal (isothermal) parametrization, meaning the first fundamental form satisfies \\(E = G = \\lambda^2\\) and \\(F = 0\\), then</p>

\\[
\\Delta \\mathbf{r} = 2\\lambda^2 H \\mathbf{N},
\\]

<p>where \\(\\Delta = \\frac{\\partial^2}{\\partial u^2} + \\frac{\\partial^2}{\\partial v^2}\\) is the ordinary Laplacian. So \\(H = 0\\) if and only if each coordinate function \\(x(u,v), y(u,v), z(u,v)\\) is <strong>harmonic</strong>. This fact is the gateway to the powerful complex-analytic methods (Weierstrass representation) we develop in Section 4.</p>

<div class="env-block remark">
    <div class="env-title">Remark: Principal Curvatures</div>
    <div class="env-body">
        <p>Since \\(H = \\frac{\\kappa_1 + \\kappa_2}{2} = 0\\), on a minimal surface we have \\(\\kappa_1 = -\\kappa_2\\) everywhere. This means the surface curves equally in opposite directions at every point (except at flat points where both vanish). The Gaussian curvature \\(K = \\kappa_1 \\kappa_2 = -\\kappa_1^2 \\le 0\\), so minimal surfaces have non-positive Gaussian curvature everywhere.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-mean-curvature-zero"></div>
<div class="viz-placeholder" data-viz="viz-normal-variation"></div>
`,
            visualizations: [
                {
                    id: 'viz-mean-curvature-zero',
                    title: 'H = 0: Minimal vs. Non-Minimal Surface',
                    description: 'Compare a catenoid (\\(H = 0\\), minimal) with a sphere (\\(H \\neq 0\\), not minimal). The color encodes mean curvature: blue = 0, red = positive.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, originX: 280, originY: 200, scale: 60 });
                        var showMinimal = true;
                        var angleX = 0.4, angleZ = 0.3;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        var btnMin = VizEngine.createButton(controls, 'Catenoid (H=0)', function() { showMinimal = true; draw(); });
                        var btnSph = VizEngine.createButton(controls, 'Sphere (H>0)', function() { showMinimal = false; draw(); });

                        viz.canvas.addEventListener('mousedown', function(e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleZ += (e.clientX - lastMX) * 0.01;
                            angleX += (e.clientY - lastMY) * 0.01;
                            angleX = Math.max(-1.5, Math.min(1.5, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });

                        function rot3(px, py, pz) {
                            var cz = Math.cos(angleZ), sz = Math.sin(angleZ);
                            var x1 = px * cz - py * sz, y1 = px * sz + py * cz;
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var y2 = y1 * cx - pz * sx, z2 = y1 * sx + pz * cx;
                            return [x1, y2, z2];
                        }
                        function proj(px, py, pz) {
                            var r = rot3(px, py, pz);
                            return [viz.originX + r[0] * viz.scale, viz.originY - r[1] * viz.scale, r[2]];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var Nu = 30, Nv = 40;
                            var segments = [];

                            if (showMinimal) {
                                // Catenoid: r(u,v) = (cosh(u)cos(v), cosh(u)sin(v), u)
                                for (var i = 0; i <= Nu; i++) {
                                    var u = -1.8 + 3.6 * i / Nu;
                                    for (var j = 0; j < Nv; j++) {
                                        var v1 = 2 * Math.PI * j / Nv;
                                        var v2 = 2 * Math.PI * ((j + 1) % Nv) / Nv;
                                        var ch = Math.cosh(u);
                                        var p1 = proj(ch * Math.cos(v1), ch * Math.sin(v1), u);
                                        var p2 = proj(ch * Math.cos(v2), ch * Math.sin(v2), u);
                                        segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: viz.colors.blue + '77' });
                                    }
                                }
                                for (var j = 0; j < Nv; j += 2) {
                                    var v = 2 * Math.PI * j / Nv;
                                    for (var i = 0; i < Nu; i++) {
                                        var u1 = -1.8 + 3.6 * i / Nu;
                                        var u2 = -1.8 + 3.6 * (i + 1) / Nu;
                                        var p1 = proj(Math.cosh(u1) * Math.cos(v), Math.cosh(u1) * Math.sin(v), u1);
                                        var p2 = proj(Math.cosh(u2) * Math.cos(v), Math.cosh(u2) * Math.sin(v), u2);
                                        segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: viz.colors.blue + '77' });
                                    }
                                }
                                viz.screenText('Catenoid: H = 0 everywhere', viz.width / 2, 24, viz.colors.blue, 14);
                            } else {
                                // Sphere
                                var R = 1.8;
                                for (var i = 0; i <= Nu; i++) {
                                    var phi = Math.PI * i / Nu;
                                    for (var j = 0; j < Nv; j++) {
                                        var th1 = 2 * Math.PI * j / Nv;
                                        var th2 = 2 * Math.PI * ((j + 1) % Nv) / Nv;
                                        var p1 = proj(R * Math.sin(phi) * Math.cos(th1), R * Math.sin(phi) * Math.sin(th1), R * Math.cos(phi));
                                        var p2 = proj(R * Math.sin(phi) * Math.cos(th2), R * Math.sin(phi) * Math.sin(th2), R * Math.cos(phi));
                                        segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: viz.colors.red + '77' });
                                    }
                                }
                                for (var j = 0; j < Nv; j += 2) {
                                    var th = 2 * Math.PI * j / Nv;
                                    for (var i = 0; i < Nu; i++) {
                                        var phi1 = Math.PI * i / Nu;
                                        var phi2 = Math.PI * (i + 1) / Nu;
                                        var p1 = proj(R * Math.sin(phi1) * Math.cos(th), R * Math.sin(phi1) * Math.sin(th), R * Math.cos(phi1));
                                        var p2 = proj(R * Math.sin(phi2) * Math.cos(th), R * Math.sin(phi2) * Math.sin(th), R * Math.cos(phi2));
                                        segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: viz.colors.red + '77' });
                                    }
                                }
                                viz.screenText('Sphere: H = 1/R > 0 everywhere', viz.width / 2, 24, viz.colors.red, 14);
                            }

                            segments.sort(function(a, b) { return a.z - b.z; });
                            for (var si = 0; si < segments.length; si++) {
                                var seg = segments[si];
                                ctx.strokeStyle = seg.color;
                                ctx.lineWidth = 0.8;
                                ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke();
                            }
                            viz.screenText('Drag to rotate', viz.width / 2, viz.height - 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-normal-variation',
                    title: 'Normal Variation and First Variation of Area',
                    description: 'Perturb a flat surface along its normal. When the surface is minimal (\\(H=0\\)), area is stationary. When \\(H \\neq 0\\), the perturbation can decrease area. The slider controls the perturbation amplitude.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, originX: 280, originY: 180, scale: 50 });
                        var amp = 0;
                        var surface = 'minimal'; // 'minimal' or 'sphere'
                        var angleX = 0.5, angleZ = 0.5;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        VizEngine.createSlider(controls, 'Perturbation t', -1, 1, 0, 0.05, function(v) { amp = v; draw(); });
                        VizEngine.createButton(controls, 'Catenoid (H=0)', function() { surface = 'minimal'; draw(); });
                        VizEngine.createButton(controls, 'Sphere (H>0)', function() { surface = 'sphere'; draw(); });

                        viz.canvas.addEventListener('mousedown', function(e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleZ += (e.clientX - lastMX) * 0.01;
                            angleX += (e.clientY - lastMY) * 0.01;
                            angleX = Math.max(-1.5, Math.min(1.5, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });

                        function rot3(px, py, pz) {
                            var cz = Math.cos(angleZ), sz = Math.sin(angleZ);
                            var x1 = px * cz - py * sz, y1 = px * sz + py * cz;
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var y2 = y1 * cx - pz * sx, z2 = y1 * sx + pz * cx;
                            return [x1, y2, z2];
                        }
                        function proj(px, py, pz) {
                            var r = rot3(px, py, pz);
                            return [viz.originX + r[0] * viz.scale, viz.originY - r[1] * viz.scale, r[2]];
                        }

                        function computeArea(surfType, t) {
                            // Numerical area estimate
                            var N = 20;
                            var area = 0;
                            for (var i = 0; i < N; i++) {
                                for (var j = 0; j < N; j++) {
                                    var u1, u2, v1, v2;
                                    if (surfType === 'minimal') {
                                        u1 = -1.2 + 2.4 * i / N; u2 = -1.2 + 2.4 * (i + 1) / N;
                                        v1 = 2 * Math.PI * j / N; v2 = 2 * Math.PI * (j + 1) / N;
                                    } else {
                                        u1 = Math.PI * 0.2 + Math.PI * 0.6 * i / N;
                                        u2 = Math.PI * 0.2 + Math.PI * 0.6 * (i + 1) / N;
                                        v1 = 2 * Math.PI * j / N; v2 = 2 * Math.PI * (j + 1) / N;
                                    }
                                    var um = (u1 + u2) / 2, vm = (v1 + v2) / 2;
                                    var du = u2 - u1, dv = v2 - v1;
                                    if (surfType === 'minimal') {
                                        var ch = Math.cosh(um);
                                        // bump function: Gaussian centered at u=0
                                        var bump = Math.exp(-um * um * 2);
                                        var rEff = ch + t * 0.3 * bump;
                                        // Approximate area element
                                        area += Math.abs(rEff) * Math.abs(du * dv);
                                    } else {
                                        var R = 1.5 + t * 0.3 * Math.exp(-((um - Math.PI / 2) * (um - Math.PI / 2)) * 2);
                                        area += R * R * Math.sin(um) * du * dv;
                                    }
                                }
                            }
                            return area;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var N = 24;
                            var segments = [];

                            if (surface === 'minimal') {
                                for (var i = 0; i <= N; i++) {
                                    var u = -1.5 + 3.0 * i / N;
                                    for (var j = 0; j < N; j++) {
                                        var v1 = 2 * Math.PI * j / N;
                                        var v2 = 2 * Math.PI * ((j + 1) % N) / N;
                                        var ch = Math.cosh(u);
                                        var bump = Math.exp(-u * u * 2);
                                        var rr = ch + amp * 0.4 * bump;
                                        var p1 = proj(rr * Math.cos(v1), rr * Math.sin(v1), u);
                                        var p2 = proj(rr * Math.cos(v2), rr * Math.sin(v2), u);
                                        var bright = Math.round(40 + 30 * Math.abs(amp * bump));
                                        segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: 'rgba(88,166,255,' + (bright / 100) + ')' });
                                    }
                                }
                            } else {
                                var R0 = 1.5;
                                for (var i = 0; i <= N; i++) {
                                    var phi = Math.PI * i / N;
                                    for (var j = 0; j < N; j++) {
                                        var th1 = 2 * Math.PI * j / N;
                                        var th2 = 2 * Math.PI * ((j + 1) % N) / N;
                                        var bump = Math.exp(-((phi - Math.PI / 2) * (phi - Math.PI / 2)) * 2);
                                        var R = R0 + amp * 0.4 * bump;
                                        var p1 = proj(R * Math.sin(phi) * Math.cos(th1), R * Math.sin(phi) * Math.sin(th1), R * Math.cos(phi));
                                        var p2 = proj(R * Math.sin(phi) * Math.cos(th2), R * Math.sin(phi) * Math.sin(th2), R * Math.cos(phi));
                                        var bright = Math.round(40 + 30 * Math.abs(amp * bump));
                                        segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: 'rgba(248,81,73,' + (bright / 100) + ')' });
                                    }
                                }
                            }

                            segments.sort(function(a, b) { return a.z - b.z; });
                            for (var si = 0; si < segments.length; si++) {
                                var seg = segments[si];
                                ctx.strokeStyle = seg.color;
                                ctx.lineWidth = 0.8;
                                ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke();
                            }

                            // Area comparison bar
                            var a0 = computeArea(surface, 0);
                            var at = computeArea(surface, amp);
                            var ratio = at / a0;
                            var barY = viz.height - 50;
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(130, barY, 300, 16);
                            var barColor = ratio > 1.001 ? viz.colors.red : (ratio < 0.999 ? viz.colors.green : viz.colors.blue);
                            ctx.fillStyle = barColor;
                            var barW = Math.min(300, Math.max(2, (ratio - 0.8) / 0.4 * 300));
                            ctx.fillRect(130, barY, barW, 16);
                            viz.screenText('Area ratio: ' + ratio.toFixed(4), viz.width / 2, barY - 8, viz.colors.white, 12);

                            var label = surface === 'minimal' ? 'Catenoid (H=0): area is stationary' : 'Sphere (H>0): area can decrease';
                            viz.screenText(label, viz.width / 2, 20, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'On a minimal surface, show that the Gaussian curvature \\(K \\le 0\\) everywhere. When is \\(K = 0\\)?',
                    hint: 'Use the relation \\(\\kappa_1 = -\\kappa_2\\) (from \\(H = 0\\)) and \\(K = \\kappa_1 \\kappa_2\\).',
                    solution: 'Since \\(H = \\frac{\\kappa_1 + \\kappa_2}{2} = 0\\), we have \\(\\kappa_2 = -\\kappa_1\\). Then \\(K = \\kappa_1 \\kappa_2 = -\\kappa_1^2 \\le 0\\). Equality holds when \\(\\kappa_1 = \\kappa_2 = 0\\), i.e., at <em>flat points</em> (also called planar points or umbilics) where both principal curvatures vanish.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Classic Examples
        // ================================================================
        {
            id: 'sec-examples',
            title: 'Classic Examples',
            content: `
<h2>Classic Examples of Minimal Surfaces</h2>

<p>The gallery of known minimal surfaces has grown enormously since Euler's discovery of the catenoid in 1744. Here we present the five most fundamental examples, each illustrating different aspects of the theory.</p>

<h3>The Catenoid</h3>

<p>The <strong>catenoid</strong> is the surface of revolution obtained by rotating a catenary \\(y = \\cosh(x)\\) about the \\(x\\)-axis. Its parametrization is</p>

\\[
\\mathbf{r}(u,v) = (\\cosh u \\cos v, \\, \\cosh u \\sin v, \\, u), \\quad u \\in \\mathbb{R}, \\; v \\in [0, 2\\pi).
\\]

<p>Euler showed that the catenoid is the unique minimal surface of revolution (other than the plane). Its Gaussian curvature is \\(K = -\\text{sech}^4 u\\), which is most negative at the waist (\\(u = 0\\)) and decays toward zero as \\(|u| \\to \\infty\\).</p>

<h3>The Helicoid</h3>

<p>The <strong>helicoid</strong> is the surface traced by a line rotating at constant speed while translating along the rotation axis:</p>

\\[
\\mathbf{r}(u,v) = (u\\cos v, \\, u\\sin v, \\, v), \\quad u \\in \\mathbb{R}, \\; v \\in \\mathbb{R}.
\\]

<p>It is the only ruled minimal surface (other than the plane), a result due to Catalan (1842). A ruled surface is one that can be swept out by a family of straight lines.</p>

<h3>Enneper's Surface</h3>

<p><strong>Enneper's surface</strong> (1864) is a minimal surface with self-intersections, given by</p>

\\[
\\mathbf{r}(u,v) = \\left(u - \\frac{u^3}{3} + uv^2, \\; v - \\frac{v^3}{3} + u^2 v, \\; u^2 - v^2 \\right).
\\]

<p>Despite its self-intersections, Enneper's surface is important because it is the simplest non-trivial example arising from the Weierstrass representation with \\(f(z) = 1\\) and \\(g(z) = z\\).</p>

<h3>Scherk's Surface</h3>

<p><strong>Scherk's first surface</strong> (1835) is the graph</p>

\\[
z = \\ln\\frac{\\cos y}{\\cos x},
\\]

<p>defined where \\(\\cos x\\) and \\(\\cos y\\) have the same sign. It is doubly periodic, consisting of an infinite checkerboard of saddle-shaped patches. Scherk's surface was the first new minimal surface discovered after the catenoid and helicoid.</p>

<h3>Costa's Surface</h3>

<p>The <strong>Costa surface</strong> (1984) was a landmark: it was the first complete, embedded minimal surface of finite total curvature discovered since the classical era. Costa's surface has genus one (a torus with three punctures) and resembles a plane with a handle. Its discovery, aided by computer graphics, opened a floodgate of new examples.</p>

<div class="viz-placeholder" data-viz="viz-minimal-gallery"></div>
`,
            visualizations: [
                {
                    id: 'viz-minimal-gallery',
                    title: 'Gallery of Classic Minimal Surfaces',
                    description: 'Rotatable 3D wireframes of the five classic minimal surfaces, colored by Gaussian curvature (darker = more negative K). Select a surface and drag to rotate.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, originX: 280, originY: 220, scale: 55 });
                        var current = 'catenoid';
                        var angleX = 0.4, angleZ = 0.5;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        var surfaces = ['catenoid', 'helicoid', 'enneper', 'scherk', 'costa'];
                        for (var si = 0; si < surfaces.length; si++) {
                            (function(name) {
                                VizEngine.createButton(controls, name.charAt(0).toUpperCase() + name.slice(1), function() {
                                    current = name;
                                    draw();
                                });
                            })(surfaces[si]);
                        }

                        viz.canvas.addEventListener('mousedown', function(e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleZ += (e.clientX - lastMX) * 0.01;
                            angleX += (e.clientY - lastMY) * 0.01;
                            angleX = Math.max(-1.5, Math.min(1.5, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });

                        function rot3(px, py, pz) {
                            var cz = Math.cos(angleZ), sz = Math.sin(angleZ);
                            var x1 = px * cz - py * sz, y1 = px * sz + py * cz;
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var y2 = y1 * cx - pz * sx, z2 = y1 * sx + pz * cx;
                            return [x1, y2, z2];
                        }
                        function proj(px, py, pz) {
                            var r = rot3(px, py, pz);
                            return [viz.originX + r[0] * viz.scale, viz.originY - r[1] * viz.scale, r[2]];
                        }

                        function getKColor(K) {
                            // K <= 0 for minimal surfaces. Map |K| to color intensity
                            var absK = Math.min(Math.abs(K), 2);
                            var t = absK / 2;
                            var r = Math.round(20 + 40 * (1 - t));
                            var g = Math.round(80 + 150 * (1 - t));
                            var b = Math.round(200 + 55 * (1 - t));
                            return 'rgb(' + r + ',' + g + ',' + b + ')';
                        }

                        function generateSurface(name) {
                            var pts = [];
                            var N = 32;
                            if (name === 'catenoid') {
                                for (var i = 0; i <= N; i++) {
                                    var row = [];
                                    var u = -2 + 4 * i / N;
                                    for (var j = 0; j <= N; j++) {
                                        var v = 2 * Math.PI * j / N;
                                        var ch = Math.cosh(u);
                                        var K = -1 / (ch * ch * ch * ch);
                                        row.push({ p: [ch * Math.cos(v), ch * Math.sin(v), u], K: K });
                                    }
                                    pts.push(row);
                                }
                            } else if (name === 'helicoid') {
                                for (var i = 0; i <= N; i++) {
                                    var row = [];
                                    var u = -2 + 4 * i / N;
                                    for (var j = 0; j <= N; j++) {
                                        var v = -Math.PI + 2 * Math.PI * j / N;
                                        var K = -1 / Math.pow(u * u + 1, 2);
                                        row.push({ p: [u * Math.cos(v), u * Math.sin(v), v], K: K });
                                    }
                                    pts.push(row);
                                }
                            } else if (name === 'enneper') {
                                for (var i = 0; i <= N; i++) {
                                    var row = [];
                                    var u = -1.5 + 3 * i / N;
                                    for (var j = 0; j <= N; j++) {
                                        var v = -1.5 + 3 * j / N;
                                        var r2 = u * u + v * v;
                                        var K = -16 / Math.pow(1 + r2, 4);
                                        row.push({
                                            p: [u - u * u * u / 3 + u * v * v, v - v * v * v / 3 + u * u * v, u * u - v * v],
                                            K: K
                                        });
                                    }
                                    pts.push(row);
                                }
                            } else if (name === 'scherk') {
                                for (var i = 0; i <= N; i++) {
                                    var row = [];
                                    var x = -1.4 + 2.8 * i / N;
                                    for (var j = 0; j <= N; j++) {
                                        var y = -1.4 + 2.8 * j / N;
                                        var cx = Math.cos(x), cy = Math.cos(y);
                                        if (Math.abs(cx) < 0.05 || Math.abs(cy) < 0.05 || cx * cy <= 0) {
                                            row.push(null);
                                        } else {
                                            var z = Math.log(cy / cx);
                                            // Gaussian curvature of Scherk
                                            var denom = Math.pow(Math.cosh(z), 2);
                                            var K = -1 / (denom * denom);
                                            row.push({ p: [x * 1.2, y * 1.2, z * 0.6], K: K });
                                        }
                                    }
                                    pts.push(row);
                                }
                            } else if (name === 'costa') {
                                // Approximate Costa-like surface: three-ended genus-1
                                // Use a simplified parametric approximation
                                for (var i = 0; i <= N; i++) {
                                    var row = [];
                                    var u = -2 + 4 * i / N;
                                    for (var j = 0; j <= N; j++) {
                                        var v = 2 * Math.PI * j / N;
                                        // Costa-like: plane with a handle-like deformation
                                        var r = Math.sqrt(u * u + 0.01);
                                        var x = u * Math.cos(v);
                                        var y = u * Math.sin(v);
                                        var z = 0.6 * Math.log(r) * Math.cos(v) + 0.3 * u;
                                        var K = -0.5 / (1 + u * u);
                                        row.push({ p: [x, y, z], K: K });
                                    }
                                    pts.push(row);
                                }
                            }
                            return pts;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var pts = generateSurface(current);
                            var segments = [];

                            for (var i = 0; i < pts.length; i++) {
                                for (var j = 0; j < pts[i].length - 1; j++) {
                                    if (!pts[i][j] || !pts[i][j + 1]) continue;
                                    var p1 = proj(pts[i][j].p[0], pts[i][j].p[1], pts[i][j].p[2]);
                                    var p2 = proj(pts[i][j + 1].p[0], pts[i][j + 1].p[1], pts[i][j + 1].p[2]);
                                    var avgK = (pts[i][j].K + pts[i][j + 1].K) / 2;
                                    segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: getKColor(avgK) });
                                }
                            }
                            for (var i = 0; i < pts.length - 1; i++) {
                                for (var j = 0; j < pts[i].length; j++) {
                                    if (!pts[i][j] || !pts[i + 1][j]) continue;
                                    var p1 = proj(pts[i][j].p[0], pts[i][j].p[1], pts[i][j].p[2]);
                                    var p2 = proj(pts[i + 1][j].p[0], pts[i + 1][j].p[1], pts[i + 1][j].p[2]);
                                    var avgK = (pts[i][j].K + pts[i + 1][j].K) / 2;
                                    segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: getKColor(avgK) });
                                }
                            }

                            segments.sort(function(a, b) { return a.z - b.z; });
                            for (var si = 0; si < segments.length; si++) {
                                var seg = segments[si];
                                ctx.strokeStyle = seg.color;
                                ctx.lineWidth = 0.7;
                                ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke();
                            }

                            var titles = {
                                catenoid: 'Catenoid (Euler, 1744)',
                                helicoid: 'Helicoid (Meusnier, 1776)',
                                enneper: 'Enneper Surface (1864)',
                                scherk: 'Scherk Surface (1835)',
                                costa: 'Costa Surface (1984, approx.)'
                            };
                            viz.screenText(titles[current], viz.width / 2, 22, viz.colors.white, 15);
                            viz.screenText('Color: brighter = |K| closer to 0, darker blue = more negative K', viz.width / 2, viz.height - 28, viz.colors.text, 10);
                            viz.screenText('Drag to rotate', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the catenoid parametrization \\(\\mathbf{r}(u,v) = (\\cosh u \\cos v, \\cosh u \\sin v, u)\\) has \\(H = 0\\) by computing the first and second fundamental forms.',
                    hint: 'Compute \\(E, F, G\\) and \\(e, f, g\\) (the coefficients of the first and second fundamental forms). Then use \\(H = \\frac{eG - 2fF + gE}{2(EG - F^2)}\\).',
                    solution: 'We have \\(\\mathbf{r}_u = (\\sinh u \\cos v, \\sinh u \\sin v, 1)\\) and \\(\\mathbf{r}_v = (-\\cosh u \\sin v, \\cosh u \\cos v, 0)\\). Then \\(E = \\sinh^2 u + 1 = \\cosh^2 u\\), \\(F = 0\\), \\(G = \\cosh^2 u\\). The unit normal is \\(\\mathbf{N} = (-\\cos v, -\\sin v, \\sinh u)/\\cosh u\\). The second derivatives give \\(e = \\mathbf{r}_{uu} \\cdot \\mathbf{N} = -1\\), \\(f = 0\\), \\(g = \\mathbf{r}_{vv} \\cdot \\mathbf{N} = 1\\). So \\(H = \\frac{(-1)\\cosh^2 u + (1)\\cosh^2 u}{2\\cosh^4 u} = 0\\).'
                },
                {
                    question: 'Show that the helicoid \\(\\mathbf{r}(u,v) = (u\\cos v, u\\sin v, v)\\) is a ruled surface and verify \\(H = 0\\).',
                    hint: 'A ruled surface contains a straight line through each point. For fixed \\(v\\), what curve do you get as \\(u\\) varies?',
                    solution: 'For fixed \\(v_0\\), the map \\(u \\mapsto (u\\cos v_0, u\\sin v_0, v_0)\\) is a straight line through the origin (in the plane \\(z = v_0\\)) in the direction \\((\\cos v_0, \\sin v_0, 0)\\). So the helicoid is ruled. For \\(H = 0\\): \\(\\mathbf{r}_u = (\\cos v, \\sin v, 0)\\), \\(\\mathbf{r}_v = (-u\\sin v, u\\cos v, 1)\\), giving \\(E = 1\\), \\(F = 0\\), \\(G = u^2 + 1\\). The normal is \\((\\sin v, -\\cos v, u)/\\sqrt{u^2+1}\\). Then \\(e = 0\\), \\(f = -1/\\sqrt{u^2+1}\\), \\(g = 0\\), so \\(H = \\frac{0 - 0}{2(u^2+1)} = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: The Weierstrass Representation
        // ================================================================
        {
            id: 'sec-weierstrass',
            title: 'Weierstrass Representation',
            content: `
<h2>The Weierstrass Representation</h2>

<p>The fact that minimal surfaces in conformal parametrization have harmonic coordinate functions opens the door to one of the most powerful tools in the theory: the <strong>Weierstrass representation</strong>. Since every harmonic function on a simply connected domain is the real part of a holomorphic function, we can construct minimal surfaces from holomorphic data.</p>

<h3>The Weierstrass-Enneper Representation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.2 (Weierstrass-Enneper Representation)</div>
    <div class="env-body">
        <p>Let \\(f(z)\\) be a holomorphic function and \\(g(z)\\) a meromorphic function on a domain \\(D \\subseteq \\mathbb{C}\\), such that \\(f g^2\\) is holomorphic on \\(D\\). Then</p>
        \\[
        \\mathbf{r}(z) = \\operatorname{Re} \\int_{z_0}^{z} \\left( f(1 - g^2), \\; if(1 + g^2), \\; 2fg \\right) d\\zeta
        \\]
        <p>defines a conformal minimal immersion \\(D \\to \\mathbb{R}^3\\).</p>
        <p>Conversely, every simply connected minimal surface has such a representation.</p>
    </div>
</div>

<p>The pair \\((f, g)\\) is called the <strong>Weierstrass data</strong>. The function \\(g\\) is the stereographic projection of the Gauss map (unit normal), and \\(f\\) controls the conformal factor (metric).</p>

<h3>Recovering Classic Examples</h3>

<div class="env-block example">
    <div class="env-title">Example: Enneper's Surface</div>
    <div class="env-body">
        <p>Take \\(f(z) = 1\\) and \\(g(z) = z\\), with \\(z = u + iv\\). Then the integrand is \\((1 - z^2, i(1+z^2), 2z)\\), and integrating from \\(0\\) gives</p>
        \\[
        \\mathbf{r}(u,v) = \\left(u - \\frac{u^3}{3} + uv^2, \\; v - \\frac{v^3}{3} + u^2 v, \\; u^2 - v^2\\right),
        \\]
        <p>which is exactly Enneper's surface.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Catenoid and Helicoid</div>
    <div class="env-body">
        <p>Take \\(f(z) = e^{-z}\\) and \\(g(z) = e^z\\). Then \\(fg^2 = e^z\\) is holomorphic. With \\(z = u + iv\\), integration yields the <strong>catenoid</strong>. If we instead use \\(f(z) = -ie^{-z}\\) (multiplying by \\(-i\\)), we get the <strong>helicoid</strong>.</p>
        <p>More generally, \\(f(z) = e^{i\\theta} e^{-z}\\) with \\(g(z) = e^z\\) gives the <strong>associate family</strong>, a one-parameter deformation connecting catenoid (\\(\\theta = 0\\)) to helicoid (\\(\\theta = \\pi/2\\)).</p>
    </div>
</div>

<h3>The Associate Family</h3>

<p>Given Weierstrass data \\((f, g)\\), replacing \\(f\\) by \\(e^{i\\theta} f\\) produces a family of isometric minimal surfaces (the metric is unchanged). This is the <strong>associate family</strong> or <strong>Bonnet transformation</strong>. The surface at angle \\(\\theta = \\pi/2\\) is called the <strong>conjugate surface</strong>.</p>

<p>The most famous instance: the catenoid and helicoid are conjugate surfaces. The animated deformation in the visualization below shows this remarkable fact: two surfaces that look completely different are, in a precise sense, the same surface rotated in a higher-dimensional space.</p>

<h3>Gaussian Curvature from Weierstrass Data</h3>

<p>The Gaussian curvature in terms of the Weierstrass data is</p>

\\[
K = -\\left(\\frac{4|g'|}{|f|(1 + |g|^2)^2}\\right)^2.
\\]

<p>This formula makes it manifest that \\(K \\le 0\\), and \\(K = 0\\) only where \\(g' = 0\\) (branch points of the Gauss map).</p>

<div class="viz-placeholder" data-viz="viz-catenoid-helicoid"></div>
<div class="viz-placeholder" data-viz="viz-weierstrass-data"></div>
`,
            visualizations: [
                {
                    id: 'viz-catenoid-helicoid',
                    title: 'Catenoid-Helicoid Deformation (Associate Family)',
                    description: 'The one-parameter associate family continuously deforms the catenoid (\\(\\theta = 0\\)) into the helicoid (\\(\\theta = \\pi/2\\)). All surfaces in this family are isometric minimal surfaces.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, originX: 280, originY: 210, scale: 55 });
                        var theta = 0;
                        var angleX = 0.4, angleZ = 0.6;
                        var dragging = false, lastMX = 0, lastMY = 0;
                        var animating = false;

                        var thetaSlider = VizEngine.createSlider(controls, '\u03b8', 0, Math.PI / 2, 0, 0.02, function(v) {
                            theta = v; draw();
                        });

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) { viz.stopAnimation(); animating = false; animBtn.textContent = 'Animate'; return; }
                            animating = true; animBtn.textContent = 'Stop';
                            viz.animate(function(t) {
                                theta = (Math.PI / 2) * (0.5 + 0.5 * Math.sin(t * 0.001));
                                thetaSlider.value = theta;
                                thetaSlider.nextElementSibling.textContent = theta.toFixed(2);
                                draw();
                            });
                        });

                        viz.canvas.addEventListener('mousedown', function(e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleZ += (e.clientX - lastMX) * 0.01;
                            angleX += (e.clientY - lastMY) * 0.01;
                            angleX = Math.max(-1.5, Math.min(1.5, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            if (!animating) draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });

                        function rot3(px, py, pz) {
                            var cz = Math.cos(angleZ), sz = Math.sin(angleZ);
                            var x1 = px * cz - py * sz, y1 = px * sz + py * cz;
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var y2 = y1 * cx - pz * sx, z2 = y1 * sx + pz * cx;
                            return [x1, y2, z2];
                        }
                        function proj(px, py, pz) {
                            var r = rot3(px, py, pz);
                            return [viz.originX + r[0] * viz.scale, viz.originY - r[1] * viz.scale, r[2]];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var N = 30;
                            var segments = [];

                            // Associate family: parametrize by (u, v)
                            // x = cos(theta)*cosh(u)*cos(v) + sin(theta)*sinh(u)*sin(v)  ... etc.
                            // Using the standard formula:
                            // Catenoid: (cosh u cos v, cosh u sin v, u)
                            // Helicoid: (sinh u sin v, -sinh u cos v, v)
                            // Associate: cos(theta)*Catenoid + sin(theta)*Helicoid
                            for (var i = 0; i <= N; i++) {
                                var u = -1.8 + 3.6 * i / N;
                                for (var j = 0; j < N; j++) {
                                    var v1 = 2 * Math.PI * j / N;
                                    var v2 = 2 * Math.PI * ((j + 1) % N) / N;
                                    var ct = Math.cos(theta), st = Math.sin(theta);
                                    var chu = Math.cosh(u), shu = Math.sinh(u);

                                    var x1 = ct * chu * Math.cos(v1) + st * shu * Math.sin(v1);
                                    var y1 = ct * chu * Math.sin(v1) - st * shu * Math.cos(v1);
                                    var z1 = ct * u + st * v1;
                                    var x2 = ct * chu * Math.cos(v2) + st * shu * Math.sin(v2);
                                    var y2 = ct * chu * Math.sin(v2) - st * shu * Math.cos(v2);
                                    var z2 = ct * u + st * v2;

                                    // Wrap z for helicoid part
                                    if (Math.abs(z2 - z1) > Math.PI) continue;

                                    var p1 = proj(x1, y1, z1 * 0.5);
                                    var p2 = proj(x2, y2, z2 * 0.5);
                                    // Color by theta
                                    var r = Math.round(88 + 160 * st);
                                    var g = Math.round(166 - 80 * st);
                                    var b = Math.round(255 - 100 * st);
                                    segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: 'rgba(' + r + ',' + g + ',' + b + ',0.5)' });
                                }
                            }
                            // Longitudinal lines
                            for (var j = 0; j < N; j += 3) {
                                var v = 2 * Math.PI * j / N;
                                for (var i = 0; i < N; i++) {
                                    var u1 = -1.8 + 3.6 * i / N;
                                    var u2 = -1.8 + 3.6 * (i + 1) / N;
                                    var ct = Math.cos(theta), st = Math.sin(theta);

                                    var x1 = ct * Math.cosh(u1) * Math.cos(v) + st * Math.sinh(u1) * Math.sin(v);
                                    var y1 = ct * Math.cosh(u1) * Math.sin(v) - st * Math.sinh(u1) * Math.cos(v);
                                    var z1 = ct * u1 + st * v;
                                    var x2 = ct * Math.cosh(u2) * Math.cos(v) + st * Math.sinh(u2) * Math.sin(v);
                                    var y2 = ct * Math.cosh(u2) * Math.sin(v) - st * Math.sinh(u2) * Math.cos(v);
                                    var z2 = ct * u2 + st * v;

                                    var p1 = proj(x1, y1, z1 * 0.5);
                                    var p2 = proj(x2, y2, z2 * 0.5);
                                    var r = Math.round(88 + 160 * st);
                                    var g = Math.round(166 - 80 * st);
                                    var b = Math.round(255 - 100 * st);
                                    segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: 'rgba(' + r + ',' + g + ',' + b + ',0.4)' });
                                }
                            }

                            segments.sort(function(a, b) { return a.z - b.z; });
                            for (var si = 0; si < segments.length; si++) {
                                var seg = segments[si];
                                ctx.strokeStyle = seg.color;
                                ctx.lineWidth = 0.8;
                                ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke();
                            }

                            var label = theta < 0.1 ? 'Catenoid' : (theta > 1.47 ? 'Helicoid' : 'Associate family');
                            viz.screenText(label + '  (\u03b8 = ' + theta.toFixed(2) + ')', viz.width / 2, 22, viz.colors.white, 14);
                            viz.screenText('Drag to rotate | All surfaces are isometric', viz.width / 2, viz.height - 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-weierstrass-data',
                    title: 'Weierstrass Data Explorer',
                    description: 'Choose holomorphic Weierstrass data \\(f(z)\\) and \\(g(z)\\) and see the resulting minimal surface. Different choices produce different classical surfaces.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, originX: 280, originY: 210, scale: 45 });
                        var choice = 0; // 0: Enneper, 1: Catenoid, 2: Henneberg
                        var angleX = 0.5, angleZ = 0.4;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        var choices = [
                            { label: 'f=1, g=z (Enneper)', f: 'enneper' },
                            { label: 'f=e^{-z}, g=e^z (Catenoid)', f: 'catenoid' },
                            { label: 'f=2z, g=1/z (Henneberg-like)', f: 'henneberg' }
                        ];
                        for (var ci = 0; ci < choices.length; ci++) {
                            (function(idx) {
                                VizEngine.createButton(controls, choices[idx].label, function() { choice = idx; draw(); });
                            })(ci);
                        }

                        viz.canvas.addEventListener('mousedown', function(e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleZ += (e.clientX - lastMX) * 0.01;
                            angleX += (e.clientY - lastMY) * 0.01;
                            angleX = Math.max(-1.5, Math.min(1.5, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });

                        function rot3(px, py, pz) {
                            var cz = Math.cos(angleZ), sz = Math.sin(angleZ);
                            var x1 = px * cz - py * sz, y1 = px * sz + py * cz;
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var y2 = y1 * cx - pz * sx, z2 = y1 * sx + pz * cx;
                            return [x1, y2, z2];
                        }
                        function proj(px, py, pz) {
                            var r = rot3(px, py, pz);
                            return [viz.originX + r[0] * viz.scale, viz.originY - r[1] * viz.scale, r[2]];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var N = 30;
                            var segments = [];

                            var pts = [];
                            for (var i = 0; i <= N; i++) {
                                var row = [];
                                for (var j = 0; j <= N; j++) {
                                    var u, v, x, y, z;
                                    if (choice === 0) {
                                        // Enneper: f=1, g=z
                                        u = -1.5 + 3 * i / N;
                                        v = -1.5 + 3 * j / N;
                                        x = u - u * u * u / 3 + u * v * v;
                                        y = v - v * v * v / 3 + u * u * v;
                                        z = u * u - v * v;
                                        row.push([x * 0.4, y * 0.4, z * 0.4]);
                                    } else if (choice === 1) {
                                        // Catenoid: f=e^{-z}, g=e^z
                                        u = -2 + 4 * i / N;
                                        v = 2 * Math.PI * j / N;
                                        x = Math.cosh(u) * Math.cos(v);
                                        y = Math.cosh(u) * Math.sin(v);
                                        z = u;
                                        row.push([x, y, z]);
                                    } else {
                                        // Henneberg-like
                                        u = 0.3 + 2.0 * i / N;
                                        v = 2 * Math.PI * j / N;
                                        x = 2 * Math.sinh(u) * Math.cos(v) - (2.0 / 3) * Math.sinh(3 * u) * Math.cos(3 * v);
                                        y = 2 * Math.sinh(u) * Math.sin(v) + (2.0 / 3) * Math.sinh(3 * u) * Math.sin(3 * v);
                                        z = 2 * Math.cosh(2 * u) * Math.cos(2 * v);
                                        row.push([x * 0.15, y * 0.15, z * 0.15]);
                                    }
                                }
                                pts.push(row);
                            }

                            for (var i = 0; i < pts.length; i++) {
                                for (var j = 0; j < pts[i].length - 1; j++) {
                                    var p1 = proj(pts[i][j][0], pts[i][j][1], pts[i][j][2]);
                                    var p2 = proj(pts[i][j + 1][0], pts[i][j + 1][1], pts[i][j + 1][2]);
                                    segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: viz.colors.purple + '66' });
                                }
                            }
                            for (var i = 0; i < pts.length - 1; i++) {
                                for (var j = 0; j < pts[i].length; j++) {
                                    var p1 = proj(pts[i][j][0], pts[i][j][1], pts[i][j][2]);
                                    var p2 = proj(pts[i + 1][j][0], pts[i + 1][j][1], pts[i + 1][j][2]);
                                    segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: viz.colors.purple + '66' });
                                }
                            }

                            segments.sort(function(a, b) { return a.z - b.z; });
                            for (var si = 0; si < segments.length; si++) {
                                var seg = segments[si];
                                ctx.strokeStyle = seg.color;
                                ctx.lineWidth = 0.7;
                                ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke();
                            }

                            viz.screenText('Weierstrass data: ' + choices[choice].label, viz.width / 2, 22, viz.colors.purple, 14);
                            viz.screenText('Drag to rotate', viz.width / 2, viz.height - 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using the Weierstrass representation with \\(f(z) = 1\\) and \\(g(z) = z\\), verify that the resulting surface is Enneper\'s surface by carrying out the integration explicitly.',
                    hint: 'Write \\(z = u + iv\\) and compute \\(\\operatorname{Re} \\int_0^z (1 - \\zeta^2, \\, i(1 + \\zeta^2), \\, 2\\zeta) \\, d\\zeta\\).',
                    solution: 'The integrand is \\(\\phi(\\zeta) = (1 - \\zeta^2, i(1 + \\zeta^2), 2\\zeta)\\). Integrating component-wise: \\(\\int_0^z (1 - \\zeta^2)d\\zeta = z - z^3/3\\), \\(\\int_0^z i(1+\\zeta^2)d\\zeta = i(z + z^3/3)\\), \\(\\int_0^z 2\\zeta \\, d\\zeta = z^2\\). With \\(z = u + iv\\), the real parts give \\(x = u - u^3/3 + uv^2\\), \\(y = v - v^3/3 + u^2 v\\), \\(z = u^2 - v^2\\), which is Enneper\'s surface.'
                },
                {
                    question: 'Show that two surfaces in the same associate family (obtained by replacing \\(f\\) with \\(e^{i\\theta}f\\)) have the same first fundamental form, hence are isometric.',
                    hint: 'The first fundamental form depends on \\(|\\phi_1|^2 + |\\phi_2|^2 + |\\phi_3|^2\\). How does this quantity change when \\(f \\to e^{i\\theta}f\\)?',
                    solution: 'The Weierstrass 1-forms are \\(\\phi_k = \\eta_k \\, dz\\) where \\(\\eta = (f(1-g^2), if(1+g^2), 2fg)\\). Replacing \\(f\\) by \\(e^{i\\theta}f\\) multiplies each \\(\\eta_k\\) by \\(e^{i\\theta}\\). The first fundamental form involves \\(ds^2 = \\frac{1}{2}(|\\phi_1|^2 + |\\phi_2|^2 + |\\phi_3|^2)\\). Since \\(|e^{i\\theta}\\eta_k|^2 = |\\eta_k|^2\\), the metric is unchanged. Hence all surfaces in the associate family are isometric.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Plateau's Problem
        // ================================================================
        {
            id: 'sec-plateau',
            title: "Plateau's Problem",
            content: `
<h2>Plateau's Problem</h2>

<p>The central existence question in the theory of minimal surfaces bears the name of the Belgian physicist Joseph Plateau:</p>

<div class="env-block definition">
    <div class="env-title">Plateau's Problem</div>
    <div class="env-body">
        <p>Given a closed Jordan curve \\(\\Gamma\\) in \\(\\mathbb{R}^3\\), does there exist a surface of least area spanning \\(\\Gamma\\)?</p>
    </div>
</div>

<p>This deceptively simple question took nearly a century to resolve after its formulation. The difficulty lies in making precise what "surface spanning a curve" means and in handling potential singularities.</p>

<h3>The Solution of Douglas and Rad&oacute;</h3>

<p>In 1930-1931, Jesse Douglas and Tibor Rad&oacute; independently proved that Plateau's problem has a solution for any rectifiable Jordan curve in \\(\\mathbb{R}^3\\). Their approaches differed significantly:</p>

<ul>
    <li><strong>Rad&oacute;</strong> used a direct method based on harmonic mappings, minimizing the Dirichlet integral (which equals area for conformal maps) over maps from the disk to \\(\\mathbb{R}^3\\) that take the boundary circle to \\(\\Gamma\\).</li>
    <li><strong>Douglas</strong> used a more general approach, minimizing his "A-functional" (a version of the Dirichlet integral) and proving that the minimum is attained. His method works for more general boundary configurations.</li>
</ul>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.3 (Douglas-Rad&oacute;)</div>
    <div class="env-body">
        <p>Every rectifiable Jordan curve \\(\\Gamma \\subset \\mathbb{R}^3\\) bounds at least one disk-type surface of minimal area. This surface is a minimal surface (\\(H = 0\\)) in its interior.</p>
    </div>
</div>

<h3>The Dirichlet Integral Approach</h3>

<p>The key insight is that area minimization can be reformulated in terms of the <strong>Dirichlet energy</strong>. For a map \\(\\mathbf{r}: \\overline{\\mathbb{D}} \\to \\mathbb{R}^3\\) from the closed unit disk, define</p>

\\[
E(\\mathbf{r}) = \\frac{1}{2}\\iint_{\\mathbb{D}} \\left(|\\mathbf{r}_u|^2 + |\\mathbf{r}_v|^2\\right) du\\,dv.
\\]

<p>By the inequality \\(|\\mathbf{r}_u|^2 + |\\mathbf{r}_v|^2 \\ge 2|\\mathbf{r}_u \\times \\mathbf{r}_v|\\) (with equality iff the parametrization is conformal), we have \\(E(\\mathbf{r}) \\ge \\mathcal{A}(\\mathbf{r})\\), with equality precisely for conformal parametrizations. So minimizing Dirichlet energy among maps with boundary values on \\(\\Gamma\\) gives a conformal parametrization of a minimal surface.</p>

<h3>Non-Uniqueness and Regularity</h3>

<p>Plateau's problem does <em>not</em> always have a unique solution. A simple example: consider two parallel unit circles in \\(\\mathbb{R}^3\\). Depending on the distance between them:</p>

<ul>
    <li>When they are close together, both a catenoid and the pair of flat disks span the boundary.</li>
    <li>Beyond a critical distance, only the flat disks remain; the catenoid ceases to exist.</li>
    <li>At the critical distance, the catenoid is <em>unstable</em>: it is a saddle point of area, not a minimum.</li>
</ul>

<p>Regularity is also subtle. The Douglas-Rad&oacute; solution is smooth in the interior but may have branch points (where the parametrization fails to be an immersion). The question of whether branch points can be avoided was resolved affirmatively for disk-type surfaces by Osserman (1970) and Gulliver (1973).</p>

<div class="viz-placeholder" data-viz="viz-plateau-problem"></div>
`,
            visualizations: [
                {
                    id: 'viz-plateau-problem',
                    title: "Plateau's Problem: Boundary Curves and Their Minimal Surfaces",
                    description: 'Different boundary curves produce different minimal surfaces. Select a boundary shape to see the surface that spans it.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, originX: 280, originY: 210, scale: 60 });
                        var boundary = 'circle';
                        var angleX = 0.5, angleZ = 0.5;
                        var dragging = false, lastMX = 0, lastMY = 0;

                        var shapes = ['circle', 'trefoil', 'saddle', 'square'];
                        for (var si = 0; si < shapes.length; si++) {
                            (function(name) {
                                VizEngine.createButton(controls, name.charAt(0).toUpperCase() + name.slice(1), function() {
                                    boundary = name; draw();
                                });
                            })(shapes[si]);
                        }

                        viz.canvas.addEventListener('mousedown', function(e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            angleZ += (e.clientX - lastMX) * 0.01;
                            angleX += (e.clientY - lastMY) * 0.01;
                            angleX = Math.max(-1.5, Math.min(1.5, angleX));
                            lastMX = e.clientX; lastMY = e.clientY;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });

                        function rot3(px, py, pz) {
                            var cz = Math.cos(angleZ), sz = Math.sin(angleZ);
                            var x1 = px * cz - py * sz, y1 = px * sz + py * cz;
                            var cx = Math.cos(angleX), sx = Math.sin(angleX);
                            var y2 = y1 * cx - pz * sx, z2 = y1 * sx + pz * cx;
                            return [x1, y2, z2];
                        }
                        function proj(px, py, pz) {
                            var r = rot3(px, py, pz);
                            return [viz.originX + r[0] * viz.scale, viz.originY - r[1] * viz.scale, r[2]];
                        }

                        function getBoundary(shape, t) {
                            if (shape === 'circle') {
                                return [1.5 * Math.cos(t), 1.5 * Math.sin(t), 0];
                            } else if (shape === 'trefoil') {
                                var r = 1.2 + 0.4 * Math.cos(3 * t);
                                return [r * Math.cos(t), r * Math.sin(t), 0.5 * Math.sin(3 * t)];
                            } else if (shape === 'saddle') {
                                return [1.5 * Math.cos(t), 1.5 * Math.sin(t), 0.6 * Math.cos(2 * t)];
                            } else { // square-like
                                var s = t / (2 * Math.PI) * 4;
                                var side = Math.floor(s) % 4;
                                var frac = s - Math.floor(s);
                                var pts = [[-1.5, -1.5], [1.5, -1.5], [1.5, 1.5], [-1.5, 1.5]];
                                var p1 = pts[side], p2 = pts[(side + 1) % 4];
                                return [p1[0] + (p2[0] - p1[0]) * frac, p1[1] + (p2[1] - p1[1]) * frac, 0.3 * Math.sin(2 * t)];
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var Nb = 60, Nr = 15, Nth = Nb;
                            var segments = [];

                            // Generate boundary points
                            var bPts = [];
                            for (var i = 0; i <= Nb; i++) {
                                var t = 2 * Math.PI * i / Nb;
                                bPts.push(getBoundary(boundary, t));
                            }

                            // Draw boundary
                            for (var i = 0; i < Nb; i++) {
                                var p1 = proj(bPts[i][0], bPts[i][1], bPts[i][2]);
                                var p2 = proj(bPts[i + 1][0], bPts[i + 1][1], bPts[i + 1][2]);
                                segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: viz.colors.blue, lw: 2.5 });
                            }

                            // Fill surface: radial interpolation from center to boundary
                            // Center is average of boundary
                            var cx = 0, cy = 0, cz = 0;
                            for (var i = 0; i < Nb; i++) { cx += bPts[i][0]; cy += bPts[i][1]; cz += bPts[i][2]; }
                            cx /= Nb; cy /= Nb; cz /= Nb;

                            var surfPts = [];
                            for (var ri = 0; ri <= Nr; ri++) {
                                var row = [];
                                var s = ri / Nr;
                                for (var ti = 0; ti < Nth; ti++) {
                                    var t = 2 * Math.PI * ti / Nth;
                                    var b = getBoundary(boundary, t);
                                    // Quadratic interpolation for soap-film look
                                    var ss = s * s;
                                    row.push([cx + ss * (b[0] - cx), cy + ss * (b[1] - cy), cz + ss * (b[2] - cz)]);
                                }
                                surfPts.push(row);
                            }

                            // Mesh lines
                            for (var ri = 0; ri < Nr; ri++) {
                                for (var ti = 0; ti < Nth; ti++) {
                                    var ti2 = (ti + 1) % Nth;
                                    var p1 = proj(surfPts[ri][ti][0], surfPts[ri][ti][1], surfPts[ri][ti][2]);
                                    var p2 = proj(surfPts[ri + 1][ti][0], surfPts[ri + 1][ti][1], surfPts[ri + 1][ti][2]);
                                    segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: viz.colors.teal + '44', lw: 0.6 });

                                    p1 = proj(surfPts[ri][ti][0], surfPts[ri][ti][1], surfPts[ri][ti][2]);
                                    p2 = proj(surfPts[ri][ti2][0], surfPts[ri][ti2][1], surfPts[ri][ti2][2]);
                                    segments.push({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], z: (p1[2] + p2[2]) / 2, color: viz.colors.teal + '44', lw: 0.6 });
                                }
                            }

                            segments.sort(function(a, b) { return a.z - b.z; });
                            for (var si = 0; si < segments.length; si++) {
                                var seg = segments[si];
                                ctx.strokeStyle = seg.color;
                                ctx.lineWidth = seg.lw || 0.7;
                                ctx.beginPath(); ctx.moveTo(seg.x1, seg.y1); ctx.lineTo(seg.x2, seg.y2); ctx.stroke();
                            }

                            var titles = { circle: 'Flat disk (trivial)', trefoil: 'Trefoil boundary', saddle: 'Saddle boundary', square: 'Square-like boundary' };
                            viz.screenText("Plateau's Problem: " + titles[boundary], viz.width / 2, 22, viz.colors.white, 14);
                            viz.screenText('Blue = boundary wire | Green mesh = spanning surface', viz.width / 2, viz.height - 28, viz.colors.text, 10);
                            viz.screenText('Drag to rotate', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: "Explain why Plateau's problem can have multiple solutions. Give a concrete example involving two coaxial circles.",
                    hint: 'Consider two parallel circles of equal radius. What happens as you vary the distance between them?',
                    solution: "Two coaxial circles of radius 1 separated by distance \\(d\\) can be spanned by: (1) a catenoid (if \\(d < d_{\\text{crit}} \\approx 1.3255\\)), and (2) a pair of flat disks (which always exists as a disconnected solution). For \\(d < d_{\\text{crit}}\\) there are actually two catenoids; the wider one has smaller area, while the narrower one is unstable. At \\(d = d_{\\text{crit}}\\) they coalesce, and for \\(d > d_{\\text{crit}}\\) no catenoid exists, leaving only the two flat disks."
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to Part D
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: From Surfaces to Manifolds</h2>

<p>With this chapter, we conclude <strong>Part C: Intrinsic Geometry</strong>. Let us take stock of the journey so far and glimpse what lies ahead.</p>

<h3>What We Have Built</h3>

<p>Starting from curves in \\(\\mathbb{R}^n\\) (Chapters 0-2), we moved to surfaces in \\(\\mathbb{R}^3\\) (Chapters 3-7) and then to the intrinsic viewpoint (Chapters 8-10):</p>

<ul>
    <li><strong>Gauss's Theorema Egregium</strong> (Chapter 8) revealed that Gaussian curvature depends only on the first fundamental form, not on the ambient embedding. This is the birthplace of intrinsic geometry.</li>
    <li><strong>The Gauss-Bonnet theorem</strong> (Chapter 9) connected local curvature to global topology, proving that \\(\\int_S K \\, dA = 2\\pi\\chi(S)\\).</li>
    <li><strong>Minimal surfaces</strong> (this chapter) showed how the condition \\(H = 0\\) connects differential geometry to the calculus of variations, complex analysis, and PDE theory.</li>
</ul>

<h3>The Limitation of Surfaces in \\(\\mathbb{R}^3\\)</h3>

<p>Throughout Parts B and C, we have worked with surfaces sitting inside \\(\\mathbb{R}^3\\). But the Theorema Egregium teaches us that intrinsic geometry does not need the ambient space. This suggests a bold generalization: study geometric objects in their own right, without requiring them to live inside some larger Euclidean space.</p>

<p>This is exactly the idea of a <strong>smooth manifold</strong>. A manifold is a space that locally looks like \\(\\mathbb{R}^n\\) but may have a nontrivial global topology. The sphere \\(S^2\\), the torus \\(T^2\\), and the projective plane \\(\\mathbb{RP}^2\\) are all 2-manifolds; we can talk about their intrinsic geometry without embedding them in \\(\\mathbb{R}^3\\).</p>

<h3>What Comes Next</h3>

<p>In <strong>Part D: Smooth Manifolds</strong>, we develop the abstract framework:</p>

<ul>
    <li><strong>Chapter 11</strong> defines smooth manifolds and coordinate charts, generalizing the parametrizations of Chapter 3.</li>
    <li><strong>Chapter 12</strong> introduces tangent spaces and vector fields, the abstract versions of the tangent planes and normal vectors we have used throughout.</li>
    <li><strong>Chapter 13</strong> develops differential forms, which generalize the area element \\(dA\\), and Stokes' theorem, which generalizes Gauss-Bonnet.</li>
</ul>

<p>Then in <strong>Part E: Riemannian Geometry</strong>, we put a metric on manifolds (Chapter 14), define connections and parallel transport (Chapter 15), study geodesics in full generality (Chapter 16), and define curvature tensors (Chapter 17) that generalize our Gaussian curvature \\(K\\).</p>

<div class="env-block remark">
    <div class="env-title">The Payoff</div>
    <div class="env-body">
        <p>The abstract machinery may seem daunting, but it pays off spectacularly. Einstein's general relativity is Riemannian geometry on a 4-dimensional Lorentzian manifold. The Poincar&eacute; conjecture (proved by Perelman in 2003) is a statement about 3-manifolds. And minimal surfaces continue to play a central role: the Schoen-Yau positive mass theorem (1979) uses minimal surfaces to prove a fundamental result in general relativity.</p>
    </div>
</div>

<p>The transition from "surfaces embedded in \\(\\mathbb{R}^3\\)" to "abstract manifolds with metrics" is the single most important conceptual leap in differential geometry. Everything we have learned so far, the first fundamental form, geodesics, curvature, Gauss-Bonnet, will reappear in vastly more general form. The concrete examples of Parts A-C will serve as intuition for the abstract theory of Parts D-F.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Summarize the three key results of Part C (Chapters 8, 9, 10) and explain how each one points toward the abstract manifold viewpoint.',
                    hint: 'For each theorem, identify what aspect of the result is "intrinsic" (depends only on the first fundamental form / metric) versus "extrinsic" (depends on the embedding).',
                    solution: '(1) <strong>Theorema Egregium</strong>: Gaussian curvature \\(K\\) is intrinsic. This motivates studying geometry without an ambient space. (2) <strong>Gauss-Bonnet</strong>: \\(\\int K\\, dA = 2\\pi\\chi\\) relates intrinsic curvature to topology. On abstract manifolds, this generalizes to the Chern-Gauss-Bonnet theorem. (3) <strong>Minimal surfaces</strong>: \\(H = 0\\) is extrinsic (it depends on the embedding), but the Weierstrass representation connects it to complex analysis on the surface, an intrinsic viewpoint. The study of minimal surfaces in Riemannian manifolds (not just \\(\\mathbb{R}^3\\)) requires the full abstract framework.'
                },
                {
                    question: 'Why can we not define mean curvature \\(H\\) intrinsically (i.e., without reference to an ambient space), even though Gaussian curvature \\(K\\) is intrinsic?',
                    hint: 'Consider the definition \\(H = \\frac{\\kappa_1 + \\kappa_2}{2}\\). What information do the principal curvatures \\(\\kappa_1, \\kappa_2\\) require?',
                    solution: 'The principal curvatures \\(\\kappa_1, \\kappa_2\\) measure how the surface bends in the ambient \\(\\mathbb{R}^3\\); they are defined via the shape operator \\(dN\\), which requires the unit normal \\(N\\). An abstract surface has no unit normal (there is no ambient space to be normal to). While \\(K = \\kappa_1 \\kappa_2\\) miraculously depends only on the metric (Theorema Egregium), \\(H = \\frac{\\kappa_1 + \\kappa_2}{2}\\) does not. For example, a flat cylinder and a flat plane have the same intrinsic geometry (\\(K = 0\\)) but different mean curvatures (\\(H = 1/(2R)\\) vs. \\(H = 0\\)).'
                }
            ]
        }
    ]
});
