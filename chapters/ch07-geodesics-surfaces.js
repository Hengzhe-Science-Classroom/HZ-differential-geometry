window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Geodesics on Surfaces',
    subtitle: 'Shortest paths on curved surfaces',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Geodesics?</h2>

<div class="env-block intuition">
    <div class="env-title">The Shortest-Path Problem</div>
    <div class="env-body">
        <p>In flat space, the shortest path between two points is a straight line. On a curved surface, there are no straight lines, so what replaces them? A pilot flying from Tokyo to New York does not follow a path that looks straight on a Mercator map; instead, the plane follows a <strong>great circle</strong> arc, which is the shortest route on the sphere. These "straightest possible" curves on a surface are called <strong>geodesics</strong>.</p>
    </div>
</div>

<p>Geodesics are the central objects of intrinsic geometry. They generalize straight lines to curved spaces in two equivalent ways:</p>

<ol>
    <li><strong>Variational definition:</strong> a geodesic locally minimizes arc length between nearby points.</li>
    <li><strong>Differential equation definition:</strong> a geodesic has zero covariant acceleration, meaning the acceleration vector is always normal to the surface (no tangential component).</li>
</ol>

<p>Both characterizations lead to the same curves. The variational approach (calculus of variations) gives geometric insight; the ODE approach (geodesic equations) gives computational power. We develop both in this chapter.</p>

<h3>Geodesics Are Everywhere</h3>

<p>Geodesics appear across mathematics and physics:</p>
<ul>
    <li><strong>Navigation:</strong> great-circle routes on the Earth.</li>
    <li><strong>General relativity:</strong> freely falling particles follow geodesics in spacetime.</li>
    <li><strong>Computer graphics:</strong> mesh processing, texture mapping, and shortest-path queries on 3D models.</li>
    <li><strong>Differential geometry:</strong> the exponential map, Jacobi fields, curvature comparison theorems, all rely on geodesics.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The study of geodesics began with Johann Bernoulli's brachistochrone problem (1696) and Euler's work on shortest paths on surfaces (1728). The geodesic equations in their modern form appear in Gauss's <em>Disquisitiones generales circa superficies curvas</em> (1827), where he showed that geodesics depend only on the first fundamental form, making them intrinsic objects.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Geodesics (Definition)
        // ================================================================
        {
            id: 'sec-definition',
            title: 'Geodesics',
            content: `
<h2>Geodesics: Definition</h2>

<div class="env-block intuition">
    <div class="env-title">The "Straightest Possible" Curve</div>
    <div class="env-body">
        <p>Walk along a surface and try to go "straight ahead" without turning left or right. Your path is a geodesic. Mathematically, this means your acceleration has no component tangent to the surface; all the acceleration is used to keep you on the surface (the normal component), not to steer you within it.</p>
    </div>
</div>

<p>Let \\(S\\) be a regular surface with parametrization \\(\\mathbf{x}(u^1, u^2)\\), and let \\(\\gamma(t) = \\mathbf{x}(u^1(t), u^2(t))\\) be a curve on \\(S\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition (Covariant Derivative)</div>
    <div class="env-body">
        <p>The <strong>covariant derivative</strong> of a tangent vector field \\(\\mathbf{w}(t)\\) along \\(\\gamma\\) is the tangential component of \\(d\\mathbf{w}/dt\\):</p>
        \\[\\frac{D\\mathbf{w}}{dt} = \\left(\\frac{d\\mathbf{w}}{dt}\\right)^{\\top} = \\frac{d\\mathbf{w}}{dt} - \\left\\langle \\frac{d\\mathbf{w}}{dt}, \\mathbf{N}\\right\\rangle \\mathbf{N}\\]
        <p>where \\(\\mathbf{N}\\) is the unit normal to the surface along \\(\\gamma\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Geodesic)</div>
    <div class="env-body">
        <p>A curve \\(\\gamma(t)\\) on a surface \\(S\\) is a <strong>geodesic</strong> if the covariant derivative of its velocity vanishes identically:</p>
        \\[\\frac{D\\gamma'}{dt} = 0.\\]
        <p>Equivalently, \\(\\gamma''(t)\\) is everywhere normal to the surface, i.e., \\(\\gamma''(t) = \\lambda(t) \\mathbf{N}(\\gamma(t))\\) for some scalar function \\(\\lambda(t)\\).</p>
    </div>
</div>

<p>A geodesic is parametrized proportionally to arc length: since \\(D\\gamma'/dt = 0\\), we have</p>
\\[\\frac{d}{dt}\\|\\gamma'\\|^2 = 2\\left\\langle \\frac{D\\gamma'}{dt}, \\gamma'\\right\\rangle = 0,\\]
<p>so \\(\\|\\gamma'(t)\\|\\) is constant. In particular, if we start with a unit-speed parametrization, it stays unit-speed.</p>

<div class="env-block example">
    <div class="env-title">Example: Geodesics on the Plane</div>
    <div class="env-body">
        <p>On \\(\\mathbb{R}^2\\), the normal to the surface is constant, so \\(D\\gamma'/dt = \\gamma''\\). The equation \\(\\gamma'' = 0\\) gives straight lines \\(\\gamma(t) = \\mathbf{a} + t\\mathbf{b}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Great Circles on the Sphere</div>
    <div class="env-body">
        <p>On the unit sphere \\(S^2\\), a great circle \\(\\gamma(t) = \\cos(t)\\,\\mathbf{p} + \\sin(t)\\,\\mathbf{v}\\) (where \\(\\mathbf{p} \\perp \\mathbf{v}\\), both unit) satisfies \\(\\gamma''(t) = -\\gamma(t)\\). Since \\(\\gamma(t)\\) is the outward normal at the point \\(\\gamma(t)\\), we have \\(\\gamma'' = -\\mathbf{N}\\), which is purely normal. So great circles are geodesics.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-geodesic-sphere"></div>
`,
            visualizations: [
                {
                    id: 'viz-geodesic-sphere',
                    title: 'Great Circles on the Sphere',
                    description: 'Drag the start point (latitude/longitude) and direction angle to draw great circles on a sphere. Great circles are the geodesics of the sphere: they are the intersections of the sphere with planes through the center.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 120
                        });

                        var lat = 0.3;
                        var lon = 0.0;
                        var dirAngle = 0.4;

                        VizEngine.createSlider(controls, 'Latitude', -1.4, 1.4, lat, 0.05, function(v) {
                            lat = v; draw();
                        });
                        VizEngine.createSlider(controls, 'Longitude', -3.14, 3.14, lon, 0.05, function(v) {
                            lon = v; draw();
                        });
                        VizEngine.createSlider(controls, 'Direction', -3.14, 3.14, dirAngle, 0.05, function(v) {
                            dirAngle = v; draw();
                        });

                        // Simple 3D projection (oblique)
                        var camAz = 0.4, camEl = 0.3;
                        function proj3d(x, y, z) {
                            var ca = Math.cos(camAz), sa = Math.sin(camAz);
                            var ce = Math.cos(camEl), se = Math.sin(camEl);
                            var x1 = x * ca + z * sa;
                            var z1 = -x * sa + z * ca;
                            var y1 = y * ce + z1 * se;
                            var z2 = -y * se + z1 * ce;
                            return [x1, y1, z2];
                        }

                        function toScreen(x3, y3, z3) {
                            var p = proj3d(x3, y3, z3);
                            return [viz.originX + p[0] * viz.scale, viz.originY - p[1] * viz.scale, p[2]];
                        }

                        function drawWireframeSphere(ctx) {
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            // Latitude lines
                            for (var phi = -1.2; phi <= 1.2; phi += 0.4) {
                                ctx.beginPath();
                                var started = false;
                                for (var th = 0; th <= 2 * Math.PI + 0.05; th += 0.05) {
                                    var x = Math.cos(phi) * Math.cos(th);
                                    var y = Math.sin(phi);
                                    var z = Math.cos(phi) * Math.sin(th);
                                    var s = toScreen(x, y, z);
                                    if (s[2] < -0.01) { started = false; continue; }
                                    if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                            }
                            // Longitude lines
                            for (var th = 0; th < Math.PI; th += Math.PI / 6) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var phi2 = -Math.PI / 2; phi2 <= Math.PI / 2 + 0.05; phi2 += 0.05) {
                                    var x2 = Math.cos(phi2) * Math.cos(th);
                                    var y2 = Math.sin(phi2);
                                    var z2 = Math.cos(phi2) * Math.sin(th);
                                    var s2 = toScreen(x2, y2, z2);
                                    if (s2[2] < -0.01) { started2 = false; continue; }
                                    if (!started2) { ctx.moveTo(s2[0], s2[1]); started2 = true; }
                                    else ctx.lineTo(s2[0], s2[1]);
                                }
                                ctx.stroke();
                            }
                            // Outline circle
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var a = 0; a <= 2 * Math.PI + 0.01; a += 0.03) {
                                // outline is where z2 = 0 in view coords
                                var cx = Math.cos(a), cy = Math.sin(a);
                                // We need point on unit sphere with proj z = 0
                                // For simplicity draw equator of view
                                var s3 = [viz.originX + cx * viz.scale, viz.originY - cy * viz.scale];
                                if (a === 0) ctx.moveTo(s3[0], s3[1]);
                                else ctx.lineTo(s3[0], s3[1]);
                            }
                            ctx.stroke();
                        }

                        function sphToCart(la, lo) {
                            return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            drawWireframeSphere(ctx);

                            // Start point on sphere
                            var p = sphToCart(lat, lon);
                            var sp = toScreen(p[0], p[1], p[2]);

                            // Tangent basis at p: e_theta (north), e_phi (east)
                            var eN = [-Math.sin(lat) * Math.cos(lon), Math.cos(lat), -Math.sin(lat) * Math.sin(lon)];
                            var eE = [-Math.sin(lon), 0, Math.cos(lon)];
                            // Direction in tangent plane
                            var cd = Math.cos(dirAngle), sd = Math.sin(dirAngle);
                            var dir = [cd * eN[0] + sd * eE[0], cd * eN[1] + sd * eE[1], cd * eN[2] + sd * eE[2]];

                            // Great circle: gamma(t) = cos(t)*p + sin(t)*dir
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            var prevZ = 0;
                            for (var t = 0; t <= 2 * Math.PI + 0.02; t += 0.02) {
                                var ct = Math.cos(t), st = Math.sin(t);
                                var gx = ct * p[0] + st * dir[0];
                                var gy = ct * p[1] + st * dir[1];
                                var gz = ct * p[2] + st * dir[2];
                                var s = toScreen(gx, gy, gz);
                                if (s[2] < -0.01) {
                                    if (started) ctx.stroke();
                                    started = false;
                                    ctx.beginPath();
                                    continue;
                                }
                                if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                else ctx.lineTo(s[0], s[1]);
                                prevZ = s[2];
                            }
                            ctx.stroke();

                            // Back side (dashed)
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            started = false;
                            for (var t2 = 0; t2 <= 2 * Math.PI + 0.02; t2 += 0.02) {
                                var ct2 = Math.cos(t2), st2 = Math.sin(t2);
                                var gx2 = ct2 * p[0] + st2 * dir[0];
                                var gy2 = ct2 * p[1] + st2 * dir[1];
                                var gz2 = ct2 * p[2] + st2 * dir[2];
                                var s2 = toScreen(gx2, gy2, gz2);
                                if (s2[2] >= -0.01) {
                                    if (started) ctx.stroke();
                                    started = false;
                                    ctx.beginPath();
                                    continue;
                                }
                                if (!started) { ctx.moveTo(s2[0], s2[1]); started = true; }
                                else ctx.lineTo(s2[0], s2[1]);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw start point
                            if (sp[2] > -0.01) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(sp[0], sp[1], 6, 0, Math.PI * 2);
                                ctx.fill();

                                // Direction arrow
                                var arrLen = 0.35;
                                var ae = toScreen(p[0] + arrLen * dir[0], p[1] + arrLen * dir[1], p[2] + arrLen * dir[2]);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(sp[0], sp[1]);
                                ctx.lineTo(ae[0], ae[1]);
                                ctx.stroke();
                                // Arrowhead
                                var dx = ae[0] - sp[0], dy = ae[1] - sp[1];
                                var ang = Math.atan2(dy, dx);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(ae[0], ae[1]);
                                ctx.lineTo(ae[0] - 10 * Math.cos(ang - 0.4), ae[1] - 10 * Math.sin(ang - 0.4));
                                ctx.lineTo(ae[0] - 10 * Math.cos(ang + 0.4), ae[1] - 10 * Math.sin(ang + 0.4));
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Labels
                            viz.screenText('Great Circle (Geodesic on S\u00B2)', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Start point', 30, viz.height - 20, viz.colors.orange, 11, 'left');
                            viz.screenText('Great circle', 180, viz.height - 20, viz.colors.blue, 11, 'left');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that a geodesic on a surface must have constant speed, i.e., \\(\\|\\gamma\'(t)\\|\\) is constant.',
                    hint: 'Differentiate \\(\\|\\gamma\'\\|^2 = \\langle \\gamma\', \\gamma\' \\rangle\\) using the product rule for the covariant derivative.',
                    solution: 'We compute \\(\\frac{d}{dt}\\langle \\gamma\', \\gamma\'\\rangle = 2\\langle \\frac{D\\gamma\'}{dt}, \\gamma\'\\rangle = 2\\langle 0, \\gamma\'\\rangle = 0\\). Hence \\(\\|\\gamma\'\\|^2\\) is constant, so \\(\\|\\gamma\'\\|\\) is constant.'
                },
                {
                    question: 'Verify that every great circle on the unit sphere \\(S^2\\) is a geodesic by showing that \\(\\gamma\'\'\\) is normal to the sphere.',
                    hint: 'A great circle can be written as \\(\\gamma(t) = \\cos(t)\\,\\mathbf{p} + \\sin(t)\\,\\mathbf{v}\\) where \\(\\mathbf{p}, \\mathbf{v}\\) are orthonormal. Compute \\(\\gamma\'\'\\) and note that the outward normal at \\(\\gamma(t)\\) on \\(S^2\\) is \\(\\gamma(t)\\) itself.',
                    solution: 'We have \\(\\gamma\'(t) = -\\sin(t)\\,\\mathbf{p} + \\cos(t)\\,\\mathbf{v}\\) and \\(\\gamma\'\'(t) = -\\cos(t)\\,\\mathbf{p} - \\sin(t)\\,\\mathbf{v} = -\\gamma(t)\\). The unit outward normal to \\(S^2\\) at \\(\\gamma(t)\\) is \\(\\mathbf{N} = \\gamma(t)\\), so \\(\\gamma\'\' = -\\mathbf{N}\\), which is purely normal. Therefore \\(D\\gamma\'/dt = 0\\) and \\(\\gamma\\) is a geodesic.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Geodesic Equations
        // ================================================================
        {
            id: 'sec-equations',
            title: 'Geodesic Equations',
            content: `
<h2>The Geodesic Equations</h2>

<p>To compute geodesics on a surface with parametrization \\(\\mathbf{x}(u^1, u^2)\\) and first fundamental form \\(g_{ij}\\), we need the <strong>geodesic equations</strong>: a system of second-order ODEs for the coordinate functions \\(u^i(t)\\).</p>

<h3>Christoffel Symbols</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Christoffel Symbols of the Second Kind)</div>
    <div class="env-body">
        <p>The <strong>Christoffel symbols</strong> \\(\\Gamma^k_{ij}\\) are defined by</p>
        \\[\\Gamma^k_{ij} = \\frac{1}{2} \\sum_l g^{kl} \\left( \\frac{\\partial g_{il}}{\\partial u^j} + \\frac{\\partial g_{jl}}{\\partial u^i} - \\frac{\\partial g_{ij}}{\\partial u^l} \\right)\\]
        <p>where \\((g^{kl})\\) is the inverse of the metric matrix \\((g_{ij})\\). For a surface (2D), the indices run over \\(\\{1, 2\\}\\).</p>
    </div>
</div>

<p>The Christoffel symbols encode how the coordinate basis vectors \\(\\mathbf{x}_i = \\partial \\mathbf{x}/\\partial u^i\\) change along the surface:</p>
\\[\\frac{D \\mathbf{x}_i}{\\partial u^j} = \\Gamma^1_{ij}\\,\\mathbf{x}_1 + \\Gamma^2_{ij}\\,\\mathbf{x}_2.\\]

<h3>The Geodesic ODE System</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.1 (Geodesic Equations)</div>
    <div class="env-body">
        <p>A curve \\(\\gamma(t) = \\mathbf{x}(u^1(t), u^2(t))\\) on \\(S\\) is a geodesic if and only if, for each \\(k = 1, 2\\):</p>
        \\[\\ddot{u}^k + \\sum_{i,j} \\Gamma^k_{ij}\\, \\dot{u}^i\\, \\dot{u}^j = 0.\\]
        <p>This is a system of two coupled second-order ODEs.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>The velocity of \\(\\gamma\\) is \\(\\gamma' = \\dot{u}^1 \\mathbf{x}_1 + \\dot{u}^2 \\mathbf{x}_2\\). Differentiating:</p>
        \\[\\gamma'' = \\ddot{u}^k \\mathbf{x}_k + \\dot{u}^i \\dot{u}^j \\frac{\\partial \\mathbf{x}_i}{\\partial u^j}.\\]
        <p>Taking the tangential component and using \\(\\frac{\\partial \\mathbf{x}_i}{\\partial u^j} = \\Gamma^k_{ij} \\mathbf{x}_k + (\\text{normal part})\\), the condition \\(D\\gamma'/dt = 0\\) becomes</p>
        \\[\\left(\\ddot{u}^k + \\Gamma^k_{ij}\\, \\dot{u}^i\\, \\dot{u}^j\\right) \\mathbf{x}_k = 0.\\]
        <p>Since \\(\\mathbf{x}_1, \\mathbf{x}_2\\) are linearly independent, each coefficient must vanish.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Geodesics on a Surface of Revolution</div>
    <div class="env-body">
        <p>Parametrize a surface of revolution as \\(\\mathbf{x}(u, v) = (f(u)\\cos v,\\, f(u)\\sin v,\\, g(u))\\) where \\(f(u) > 0\\). The metric is:</p>
        \\[g_{11} = (f')^2 + (g')^2, \\quad g_{12} = 0, \\quad g_{22} = f^2.\\]
        <p>The geodesic equations become (writing \\(G = g_{11}\\)):</p>
        \\[\\ddot{u} + \\frac{G'}{2G}\\dot{u}^2 - \\frac{ff'}{G}\\dot{v}^2 = 0, \\qquad \\ddot{v} + \\frac{2f'}{f}\\dot{u}\\dot{v} = 0.\\]
        <p>The second equation can be rewritten as \\(\\frac{d}{dt}(f^2 \\dot{v}) = 0\\), giving <strong>Clairaut's relation</strong>: \\(f(u)\\cos\\theta = \\text{const}\\), where \\(\\theta\\) is the angle between the geodesic and the meridian.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-geodesic-equations"></div>
`,
            visualizations: [
                {
                    id: 'viz-geodesic-equations',
                    title: 'Solving the Geodesic Equations',
                    description: 'Watch a geodesic being traced out by numerically solving the geodesic ODE on a surface of revolution. The initial direction determines the shape of the path. Adjust the initial angle to see meridians, parallels, and spiral geodesics.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 50
                        });

                        var initAngle = 0.8;
                        var tMax = 20;
                        var animT = 0;
                        var animating = false;

                        VizEngine.createSlider(controls, 'Initial angle', 0, 3.14, initAngle, 0.05, function(v) {
                            initAngle = v; animT = 0; draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true;
                            animT = 0;
                            function step() {
                                animT += 0.15;
                                if (animT > tMax) { animating = false; return; }
                                draw();
                                requestAnimationFrame(step);
                            }
                            step();
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            animating = false;
                            animT = 0;
                            draw();
                        });

                        // Surface of revolution: sphere r=2
                        var R = 2;
                        function f(u) { return R * Math.cos(u); }
                        function fp(u) { return -R * Math.sin(u); }
                        function g(u) { return R * Math.sin(u); }
                        function gp(u) { return R * Math.cos(u); }

                        // Metric: G = f'^2 + g'^2 = R^2
                        // Geodesic eqns for sphere:
                        // u'' - (f*f'/G) v'^2 = 0
                        // v'' + (2f'/f) u'v' = 0

                        function solveGeodesic(angle, maxT) {
                            var dt = 0.005;
                            var u = 0, v = 0; // start at equator, lon=0
                            var du = Math.cos(angle) / R;
                            var dv = Math.sin(angle) / (f(0));
                            var pts = [];

                            for (var t = 0; t < maxT; t += dt) {
                                var fu = f(u), fpu = fp(u);
                                var G = fpu * fpu + gp(u) * gp(u);
                                if (G < 1e-10) break;
                                var ddu = -(fpu * gp(u) * gp(u) / (G * G) - fpu / G) * du * du + fu * fpu / G * dv * dv;
                                // Simplified for sphere: u'' = sin(u)cos(u) * v'^2
                                ddu = Math.sin(u) * Math.cos(u) * dv * dv;
                                var ddv = -2 * fpu / fu * du * dv;
                                if (Math.abs(fu) < 0.01) break; // near pole
                                du += ddu * dt;
                                dv += ddv * dt;
                                u += du * dt;
                                v += dv * dt;
                                var x3 = f(u) * Math.cos(v);
                                var z3 = f(u) * Math.sin(v);
                                var y3 = g(u);
                                pts.push([x3, y3, z3, t]);
                            }
                            return pts;
                        }

                        var camAz = 0.5, camEl = 0.35;
                        function proj3d(x, y, z) {
                            var ca = Math.cos(camAz), sa = Math.sin(camAz);
                            var ce = Math.cos(camEl), se = Math.sin(camEl);
                            var x1 = x * ca + z * sa;
                            var z1 = -x * sa + z * ca;
                            var y1 = y * ce + z1 * se;
                            return [x1, y1];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw wireframe sphere
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var phi = -1.4; phi <= 1.4; phi += 0.35) {
                                ctx.beginPath();
                                var started = false;
                                for (var th = 0; th <= 2 * Math.PI + 0.05; th += 0.05) {
                                    var x = R * Math.cos(phi) * Math.cos(th);
                                    var y = R * Math.sin(phi);
                                    var z = R * Math.cos(phi) * Math.sin(th);
                                    var p = proj3d(x, y, z);
                                    var sx = viz.originX + p[0] * viz.scale;
                                    var sy = viz.originY - p[1] * viz.scale;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            for (var th2 = 0; th2 < Math.PI; th2 += Math.PI / 8) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var phi2 = -Math.PI / 2; phi2 <= Math.PI / 2 + 0.05; phi2 += 0.05) {
                                    var x2 = R * Math.cos(phi2) * Math.cos(th2);
                                    var y2 = R * Math.sin(phi2);
                                    var z2 = R * Math.cos(phi2) * Math.sin(th2);
                                    var p2 = proj3d(x2, y2, z2);
                                    var sx2 = viz.originX + p2[0] * viz.scale;
                                    var sy2 = viz.originY - p2[1] * viz.scale;
                                    if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; }
                                    else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Solve and draw geodesic
                            var maxDraw = animating ? animT : tMax;
                            var pts = solveGeodesic(initAngle, maxDraw);

                            if (pts.length > 1) {
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var p0 = proj3d(pts[0][0], pts[0][1], pts[0][2]);
                                ctx.moveTo(viz.originX + p0[0] * viz.scale, viz.originY - p0[1] * viz.scale);
                                for (var i = 1; i < pts.length; i++) {
                                    var pi = proj3d(pts[i][0], pts[i][1], pts[i][2]);
                                    ctx.lineTo(viz.originX + pi[0] * viz.scale, viz.originY - pi[1] * viz.scale);
                                }
                                ctx.stroke();

                                // Current point
                                var last = pts[pts.length - 1];
                                var pl = proj3d(last[0], last[1], last[2]);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(viz.originX + pl[0] * viz.scale, viz.originY - pl[1] * viz.scale, 5, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Start point
                            var sp = proj3d(R, 0, 0);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.arc(viz.originX + sp[0] * viz.scale, viz.originY - sp[1] * viz.scale, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Labels
                            var angleLabel = (initAngle * 180 / Math.PI).toFixed(0);
                            viz.screenText('Geodesic on Sphere (initial angle = ' + angleLabel + '\u00B0)', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('\u03B8 = 0\u00B0: meridian   \u03B8 = 90\u00B0: equator', viz.width / 2, viz.height - 15, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Christoffel symbols for the sphere of radius \\(R\\) in spherical coordinates \\((\\theta, \\varphi)\\) where \\(\\mathbf{x}(\\theta, \\varphi) = (R\\sin\\theta\\cos\\varphi, R\\sin\\theta\\sin\\varphi, R\\cos\\theta)\\).',
                    hint: 'The metric is \\(g_{11} = R^2\\), \\(g_{12} = 0\\), \\(g_{22} = R^2\\sin^2\\theta\\). Use the Christoffel symbol formula; only the derivatives involving \\(g_{22}\\) are nonzero.',
                    solution: 'With \\(g_{11} = R^2\\), \\(g_{22} = R^2\\sin^2\\theta\\), \\(g_{12} = 0\\), the nonzero Christoffel symbols are: \\(\\Gamma^1_{22} = -\\sin\\theta\\cos\\theta\\) and \\(\\Gamma^2_{12} = \\Gamma^2_{21} = \\cot\\theta\\). All others vanish.'
                },
                {
                    question: 'Write down the geodesic equations on the sphere explicitly and verify that the equator \\(\\theta(t) = \\pi/2\\), \\(\\varphi(t) = t/R\\) is a solution.',
                    hint: 'Substitute the Christoffel symbols into \\(\\ddot{u}^k + \\Gamma^k_{ij}\\dot{u}^i\\dot{u}^j = 0\\) and check both equations.',
                    solution: 'The geodesic equations are \\(\\ddot{\\theta} - \\sin\\theta\\cos\\theta\\,\\dot{\\varphi}^2 = 0\\) and \\(\\ddot{\\varphi} + 2\\cot\\theta\\,\\dot{\\theta}\\dot{\\varphi} = 0\\). For the equator: \\(\\dot{\\theta} = 0\\), \\(\\ddot{\\theta} = 0\\), \\(\\theta = \\pi/2\\) so \\(\\sin\\theta\\cos\\theta = 0\\). First equation: \\(0 = 0\\). Second equation: \\(\\ddot{\\varphi} = 0\\) and \\(\\dot{\\theta} = 0\\), so \\(0 = 0\\). Both satisfied.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Geodesics on Specific Surfaces
        // ================================================================
        {
            id: 'sec-examples',
            title: 'Geodesics on Specific Surfaces',
            content: `
<h2>Geodesics on Specific Surfaces</h2>

<p>Let us catalog the geodesics on several important surfaces. In each case, the key technique is either solving the geodesic equations directly or using a symmetry argument.</p>

<h3>1. The Sphere \\(S^2\\)</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.2 (Geodesics of the Sphere)</div>
    <div class="env-body">
        <p>The geodesics of the sphere \\(S^2(R)\\) of radius \\(R\\) are precisely the <strong>great circles</strong>: the intersections of \\(S^2\\) with planes through the center.</p>
    </div>
</div>

<p>Great circles have curvature \\(\\kappa = 1/R\\) in \\(\\mathbb{R}^3\\), and this curvature is entirely in the normal direction. Any circle on the sphere that is not a great circle has a nonzero tangential curvature component, so it is not a geodesic.</p>

<h3>2. The Cylinder</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.3 (Geodesics of the Cylinder)</div>
    <div class="env-body">
        <p>The geodesics of the right circular cylinder \\(x^2 + y^2 = R^2\\) are: straight lines (rulings), circles (cross-sections), and <strong>helices</strong>.</p>
    </div>
</div>

<p>The cylinder is <strong>isometric to the plane</strong>: unrolling the cylinder maps it to a flat strip \\([0, 2\\pi R) \\times \\mathbb{R}\\), and geodesics on the plane are straight lines. When we "roll back" a straight line onto the cylinder, the result is a helix (including the degenerate cases of a ruling or a circle).</p>

<div class="viz-placeholder" data-viz="viz-geodesic-cylinder"></div>

<h3>3. The Cone</h3>

<p>A right circular cone with half-angle \\(\\alpha\\) can be "unrolled" (it is locally isometric to a sector of the plane). The geodesics are images of straight lines under the rolling map. On the cone, geodesics can exhibit interesting behavior: they can spiral toward the apex, wind around the cone, or go "over the top."</p>

<h3>4. The Torus</h3>

<p>The torus \\(\\mathbf{x}(u, v) = ((a + b\\cos u)\\cos v,\\, (a + b\\cos u)\\sin v,\\, b\\sin u)\\) has Gaussian curvature that changes sign: positive on the outer equator, negative on the inner equator. This makes the geodesic behavior rich:</p>
<ul>
    <li>The outer and inner equators (\\(u = 0\\) and \\(u = \\pi\\)) are geodesics.</li>
    <li>Every meridian (\\(v = \\text{const}\\)) is a geodesic.</li>
    <li>Generic geodesics on the torus are not closed; they wind around ergodically.</li>
    <li>By Clairaut's relation, a geodesic that starts with angle \\(\\theta\\) to the meridian satisfies \\((a + b\\cos u)\\sin\\theta = \\text{const}\\). Geodesics that start nearly along a parallel on the inner part of the torus cannot cross to the outer part.</li>
</ul>

<div class="viz-placeholder" data-viz="viz-geodesic-torus"></div>
`,
            visualizations: [
                {
                    id: 'viz-geodesic-cylinder',
                    title: 'Unwrapping the Cylinder',
                    description: 'A geodesic on a cylinder is a straight line when unwrapped. Drag the angle slider to see how the helix pitch changes. The left panel shows the unwrapped (flat) cylinder with a straight line; the right panel shows the corresponding helix on the cylinder.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var helixAngle = 0.6;
                        VizEngine.createSlider(controls, 'Helix angle', 0.05, 1.5, helixAngle, 0.05, function(v) {
                            helixAngle = v; draw();
                        });

                        var R = 1, camAz = 0.5, camEl = 0.3;
                        function proj3d(x, y, z) {
                            var ca = Math.cos(camAz), sa = Math.sin(camAz);
                            var ce = Math.cos(camEl), se = Math.sin(camEl);
                            var x1 = x * ca + z * sa;
                            var z1 = -x * sa + z * ca;
                            var y1 = y * ce + z1 * se;
                            return [x1, y1];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var midX = viz.width / 2;

                            // LEFT: unwrapped cylinder
                            var flatW = 200, flatH = 280;
                            var flatX = 30, flatY = 60;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(flatX, flatY, flatW, flatH);

                            // Grid lines on flat
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gy = 0; gy < 8; gy++) {
                                var yy = flatY + flatH * gy / 7;
                                ctx.beginPath(); ctx.moveTo(flatX, yy); ctx.lineTo(flatX + flatW, yy); ctx.stroke();
                            }
                            for (var gx = 0; gx < 5; gx++) {
                                var xx = flatX + flatW * gx / 4;
                                ctx.beginPath(); ctx.moveTo(xx, flatY); ctx.lineTo(xx, flatY + flatH); ctx.stroke();
                            }

                            // Straight line on flat (geodesic when unwrapped)
                            var dx = flatW;
                            var dy = dx * Math.tan(helixAngle);
                            var startY = flatY + flatH / 2 + dy / 2;
                            var endY = startY - dy;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(flatX, Math.max(flatY, Math.min(flatY + flatH, startY)));
                            ctx.lineTo(flatX + flatW, Math.max(flatY, Math.min(flatY + flatH, endY)));
                            ctx.stroke();

                            viz.screenText('Unwrapped', flatX + flatW / 2, flatY - 15, viz.colors.white, 12);
                            viz.screenText('(Flat strip)', flatX + flatW / 2, flatY - 2, viz.colors.text, 10);

                            // RIGHT: 3D cylinder with helix
                            var cylCx = midX + 120, cylCy = viz.height / 2;
                            var cylScale = 55;

                            // Draw cylinder wireframe
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            // Horizontal circles
                            for (var h = -2; h <= 2; h += 0.5) {
                                ctx.beginPath();
                                var started = false;
                                for (var a = 0; a <= 2 * Math.PI + 0.05; a += 0.05) {
                                    var p = proj3d(R * Math.cos(a), h, R * Math.sin(a));
                                    var sx = cylCx + p[0] * cylScale;
                                    var sy = cylCy - p[1] * cylScale;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            // Vertical lines
                            for (var a2 = 0; a2 < 2 * Math.PI; a2 += Math.PI / 4) {
                                ctx.beginPath();
                                var p1 = proj3d(R * Math.cos(a2), -2, R * Math.sin(a2));
                                var p2 = proj3d(R * Math.cos(a2), 2, R * Math.sin(a2));
                                ctx.moveTo(cylCx + p1[0] * cylScale, cylCy - p1[1] * cylScale);
                                ctx.lineTo(cylCx + p2[0] * cylScale, cylCy - p2[1] * cylScale);
                                ctx.stroke();
                            }

                            // Draw helix
                            var pitch = Math.tan(helixAngle) * R;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started3 = false;
                            for (var t = -4; t <= 4; t += 0.02) {
                                var hx = R * Math.cos(t);
                                var hz = R * Math.sin(t);
                                var hy = pitch * t;
                                if (hy < -2 || hy > 2) continue;
                                var ph = proj3d(hx, hy, hz);
                                var shx = cylCx + ph[0] * cylScale;
                                var shy = cylCy - ph[1] * cylScale;
                                if (!started3) { ctx.moveTo(shx, shy); started3 = true; }
                                else ctx.lineTo(shx, shy);
                            }
                            ctx.stroke();

                            viz.screenText('Cylinder', cylCx, flatY - 15, viz.colors.white, 12);
                            viz.screenText('(Helix geodesic)', cylCx, flatY - 2, viz.colors.text, 10);

                            // Arrow between panels
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            var arrowY = viz.height / 2;
                            ctx.beginPath();
                            ctx.moveTo(flatX + flatW + 15, arrowY);
                            ctx.lineTo(cylCx - cylScale - 15, arrowY);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            var ax = cylCx - cylScale - 15;
                            ctx.moveTo(ax, arrowY);
                            ctx.lineTo(ax - 8, arrowY - 5);
                            ctx.lineTo(ax - 8, arrowY + 5);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('roll up', (flatX + flatW + cylCx - cylScale) / 2, arrowY - 12, viz.colors.orange, 10);

                            var angLabel = (helixAngle * 180 / Math.PI).toFixed(0);
                            viz.screenText('Helix angle: ' + angLabel + '\u00B0', viz.width / 2, viz.height - 15, viz.colors.teal, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-geodesic-torus',
                    title: 'Geodesics on the Torus',
                    description: 'Geodesics on the torus exhibit diverse behavior depending on their initial direction. Some close up after winding around a few times; others never close and fill a band densely. Adjust the initial angle to explore.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 40
                        });

                        var initAngle = 0.5;
                        var a = 3, b = 1.2; // torus radii

                        VizEngine.createSlider(controls, 'Initial angle', 0, 1.55, initAngle, 0.05, function(v) {
                            initAngle = v; draw();
                        });

                        var camAz = 0.4, camEl = 0.45;
                        function proj3d(x, y, z) {
                            var ca = Math.cos(camAz), sa = Math.sin(camAz);
                            var ce = Math.cos(camEl), se = Math.sin(camEl);
                            var x1 = x * ca + z * sa;
                            var z1 = -x * sa + z * ca;
                            var y1 = y * ce + z1 * se;
                            return [x1, y1];
                        }

                        function torusPos(u, v) {
                            var r = a + b * Math.cos(u);
                            return [r * Math.cos(v), b * Math.sin(u), r * Math.sin(v)];
                        }

                        function solveTorusGeodesic(angle, maxT) {
                            // Metric: g11 = b^2, g22 = (a+b*cos(u))^2, g12=0
                            // Geodesic eqns:
                            // u'' + (a+b*cos(u))*sin(u)/b * v'^2 = 0
                            // v'' - 2*b*sin(u)/(a+b*cos(u)) * u'*v' = 0
                            var dt = 0.005;
                            var u = 0, v = 0;
                            var du = Math.cos(angle) / b;
                            var r0 = a + b;
                            var dv = Math.sin(angle) / r0;
                            var pts = [];
                            pts.push(torusPos(u, v));

                            for (var t = 0; t < maxT; t += dt) {
                                var r = a + b * Math.cos(u);
                                if (r < 0.1) break;
                                var ddu = (r * Math.sin(u) / b) * dv * dv;
                                var ddv = -2 * b * Math.sin(u) / r * du * dv;
                                du += ddu * dt;
                                dv += ddv * dt;
                                u += du * dt;
                                v += dv * dt;
                                if (t % 0.02 < dt) {
                                    pts.push(torusPos(u, v));
                                }
                            }
                            return pts;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw torus wireframe
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.4;
                            // u-circles (meridians)
                            for (var vv = 0; vv < 2 * Math.PI; vv += Math.PI / 8) {
                                ctx.beginPath();
                                var started = false;
                                for (var uu = 0; uu <= 2 * Math.PI + 0.05; uu += 0.05) {
                                    var pos = torusPos(uu, vv);
                                    var p = proj3d(pos[0], pos[1], pos[2]);
                                    var sx = viz.originX + p[0] * viz.scale;
                                    var sy = viz.originY - p[1] * viz.scale;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            // v-circles (parallels)
                            for (var uu2 = 0; uu2 < 2 * Math.PI; uu2 += Math.PI / 6) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var vv2 = 0; vv2 <= 2 * Math.PI + 0.05; vv2 += 0.05) {
                                    var pos2 = torusPos(uu2, vv2);
                                    var p2 = proj3d(pos2[0], pos2[1], pos2[2]);
                                    var sx2 = viz.originX + p2[0] * viz.scale;
                                    var sy2 = viz.originY - p2[1] * viz.scale;
                                    if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; }
                                    else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Solve geodesic
                            var pts = solveTorusGeodesic(initAngle, 30);
                            if (pts.length > 1) {
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var pp0 = proj3d(pts[0][0], pts[0][1], pts[0][2]);
                                ctx.moveTo(viz.originX + pp0[0] * viz.scale, viz.originY - pp0[1] * viz.scale);
                                for (var i = 1; i < pts.length; i++) {
                                    var ppi = proj3d(pts[i][0], pts[i][1], pts[i][2]);
                                    ctx.lineTo(viz.originX + ppi[0] * viz.scale, viz.originY - ppi[1] * viz.scale);
                                }
                                ctx.stroke();
                            }

                            // Start point
                            var sp = proj3d(a + b, 0, 0);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(viz.originX + sp[0] * viz.scale, viz.originY - sp[1] * viz.scale, 5, 0, Math.PI * 2);
                            ctx.fill();

                            var angLabel = (initAngle * 180 / Math.PI).toFixed(0);
                            viz.screenText('Geodesic on Torus (angle = ' + angLabel + '\u00B0)', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('0\u00B0 = meridian, 90\u00B0 = parallel', viz.width / 2, viz.height - 15, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the meridians of a surface of revolution are always geodesics.',
                    hint: 'A meridian has \\(v = \\text{const}\\), so \\(\\dot{v} = 0\\). Substitute into the geodesic equations.',
                    solution: 'A meridian has \\(v = c\\), so \\(\\dot{v} = 0\\) and \\(\\ddot{v} = 0\\). The first geodesic equation becomes \\(\\ddot{u} + \\frac{G\'}{2G}\\dot{u}^2 = 0\\), which is the geodesic equation for the generating curve. The second equation \\(\\ddot{v} + \\frac{2f\'}{f}\\dot{u}\\dot{v} = 0\\) is trivially satisfied since \\(\\dot{v} = 0\\). A meridian parametrized by arc length satisfies both equations.'
                },
                {
                    question: 'Which parallels (\\(u = \\text{const}\\)) of a surface of revolution are geodesics?',
                    hint: 'Set \\(\\dot{u} = 0\\) in the geodesic equations. The second equation is automatically satisfied. What condition does the first equation impose?',
                    solution: 'Setting \\(\\dot{u} = 0\\) and \\(\\ddot{u} = 0\\), the first geodesic equation gives \\(-\\frac{ff\'}{G}\\dot{v}^2 = 0\\). Since \\(\\dot{v} \\neq 0\\) (the parallel is not a point), we need \\(f\'(u_0) = 0\\). This means only parallels at critical points of \\(f\\) (where the radius is locally extremal) are geodesics. On a sphere, this gives the equator. On a torus, this gives the outer and inner equators.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Properties of Geodesics
        // ================================================================
        {
            id: 'sec-properties',
            title: 'Properties',
            content: `
<h2>Properties of Geodesics</h2>

<h3>Existence and Uniqueness</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.4 (Existence and Uniqueness)</div>
    <div class="env-body">
        <p>Given a point \\(p \\in S\\) and a tangent vector \\(\\mathbf{v} \\in T_pS\\), there exists a unique geodesic \\(\\gamma\\) with \\(\\gamma(0) = p\\) and \\(\\gamma'(0) = \\mathbf{v}\\), defined on some interval \\((-\\varepsilon, \\varepsilon)\\).</p>
    </div>
</div>

<p>This follows from the Picard-Lindelof theorem applied to the geodesic equations. The geodesic system \\(\\ddot{u}^k + \\Gamma^k_{ij}\\dot{u}^i\\dot{u}^j = 0\\) is a smooth second-order ODE, so given initial conditions \\((u^1(0), u^2(0), \\dot{u}^1(0), \\dot{u}^2(0))\\), there is a unique local solution.</p>

<h3>Geodesics as Locally Length-Minimizing</h3>

<div class="env-block theorem">
    <div name="env-title">Theorem 7.5</div>
    <div class="env-body">
        <p>A geodesic is <strong>locally length-minimizing</strong>: for any point \\(p\\) on a geodesic, there exists a neighborhood \\(U\\) of \\(p\\) such that for any two points \\(q_1, q_2 \\in U\\), the geodesic segment from \\(q_1\\) to \\(q_2\\) is the shortest curve in \\(U\\) connecting them.</p>
    </div>
</div>

<p>However, geodesics are not always globally minimizing. On the sphere, the shorter great-circle arc between two non-antipodal points is the unique shortest path, but the longer arc is also a geodesic that is not length-minimizing.</p>

<div class="viz-placeholder" data-viz="viz-shortest-path"></div>

<h3>The Exponential Map (Preview)</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Exponential Map)</div>
    <div class="env-body">
        <p>The <strong>exponential map</strong> at \\(p \\in S\\) is defined by</p>
        \\[\\exp_p(\\mathbf{v}) = \\gamma_\\mathbf{v}(1)\\]
        <p>where \\(\\gamma_\\mathbf{v}\\) is the geodesic with \\(\\gamma_\\mathbf{v}(0) = p\\) and \\(\\gamma'_\\mathbf{v}(0) = \\mathbf{v}\\). It maps tangent vectors to points on the surface by "shooting" a geodesic from \\(p\\) in direction \\(\\mathbf{v}\\) for unit parameter time.</p>
    </div>
</div>

<p>The exponential map is a diffeomorphism from a neighborhood of \\(0 \\in T_pS\\) to a neighborhood of \\(p \\in S\\). The image of a circle of radius \\(r\\) in \\(T_pS\\) is a <strong>geodesic circle</strong> on \\(S\\), and the image of a radial line is a geodesic ray from \\(p\\). We will study the exponential map in depth in Chapter 16.</p>

<div class="env-block remark">
    <div class="env-title">Remark: Geodesic Normal Coordinates</div>
    <div class="env-body">
        <p>By choosing an orthonormal basis for \\(T_pS\\), the exponential map gives <strong>geodesic normal coordinates</strong> (also called Riemann normal coordinates) around \\(p\\). In these coordinates, geodesics through \\(p\\) are straight lines, and the metric at \\(p\\) is the identity: \\(g_{ij}(p) = \\delta_{ij}\\), \\(\\Gamma^k_{ij}(p) = 0\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-shortest-path',
                    title: 'Geodesic vs Other Paths',
                    description: 'Compare the geodesic (great circle arc) between two points on a sphere to a non-geodesic path. The geodesic is shorter. Drag the second point to see how the length comparison changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 120
                        });

                        var lat2 = 0.8, lon2 = 1.2;
                        VizEngine.createSlider(controls, 'Point latitude', -1.3, 1.3, lat2, 0.05, function(v) {
                            lat2 = v; draw();
                        });
                        VizEngine.createSlider(controls, 'Point longitude', 0.2, 2.8, lon2, 0.05, function(v) {
                            lon2 = v; draw();
                        });

                        var camAz = 0.3, camEl = 0.25;
                        function proj3d(x, y, z) {
                            var ca = Math.cos(camAz), sa = Math.sin(camAz);
                            var ce = Math.cos(camEl), se = Math.sin(camEl);
                            var x1 = x * ca + z * sa;
                            var z1 = -x * sa + z * ca;
                            var y1 = y * ce + z1 * se;
                            return [x1, y1];
                        }

                        function sphToCart(la, lo) {
                            return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
                        }

                        // Spherical linear interpolation (slerp)
                        function slerp(p, q, t) {
                            var dot = p[0]*q[0] + p[1]*q[1] + p[2]*q[2];
                            dot = Math.max(-1, Math.min(1, dot));
                            var omega = Math.acos(dot);
                            if (omega < 1e-8) return [p[0], p[1], p[2]];
                            var so = Math.sin(omega);
                            var a = Math.sin((1-t)*omega)/so;
                            var b = Math.sin(t*omega)/so;
                            return [a*p[0]+b*q[0], a*p[1]+b*q[1], a*p[2]+b*q[2]];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Wireframe sphere
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var phi = -1.2; phi <= 1.2; phi += 0.4) {
                                ctx.beginPath();
                                var started = false;
                                for (var th = 0; th <= 2 * Math.PI + 0.05; th += 0.05) {
                                    var p = proj3d(Math.cos(phi)*Math.cos(th), Math.sin(phi), Math.cos(phi)*Math.sin(th));
                                    var sx = viz.originX + p[0] * viz.scale, sy = viz.originY - p[1] * viz.scale;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Two points
                            var p1 = sphToCart(0, 0);
                            var p2 = sphToCart(lat2, lon2);

                            // Great circle distance
                            var dot12 = p1[0]*p2[0] + p1[1]*p2[1] + p1[2]*p2[2];
                            var gcDist = Math.acos(Math.max(-1, Math.min(1, dot12)));

                            // Draw geodesic (great circle arc)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var started2 = false;
                            for (var t = 0; t <= 1.001; t += 0.01) {
                                var q = slerp(p1, p2, t);
                                var pj = proj3d(q[0], q[1], q[2]);
                                var sx2 = viz.originX + pj[0] * viz.scale;
                                var sy2 = viz.originY - pj[1] * viz.scale;
                                if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; }
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Non-geodesic path: go via latitude first, then longitude
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            var started3 = false;
                            var altLen = 0;
                            var prevPt = null;
                            // Phase 1: travel along equator from lon=0 to lon=lon2
                            for (var t2 = 0; t2 <= 1.001; t2 += 0.02) {
                                var lonI = lon2 * t2;
                                var pt = sphToCart(0, lonI);
                                var pj2 = proj3d(pt[0], pt[1], pt[2]);
                                var sx3 = viz.originX + pj2[0] * viz.scale;
                                var sy3 = viz.originY - pj2[1] * viz.scale;
                                if (!started3) { ctx.moveTo(sx3, sy3); started3 = true; }
                                else ctx.lineTo(sx3, sy3);
                                if (prevPt) {
                                    var dd = Math.sqrt((pt[0]-prevPt[0])**2 + (pt[1]-prevPt[1])**2 + (pt[2]-prevPt[2])**2);
                                    altLen += 2 * Math.asin(dd / 2);
                                }
                                prevPt = pt;
                            }
                            // Phase 2: travel along meridian from lat=0 to lat=lat2
                            for (var t3 = 0; t3 <= 1.001; t3 += 0.02) {
                                var latI = lat2 * t3;
                                var pt2 = sphToCart(latI, lon2);
                                var pj3 = proj3d(pt2[0], pt2[1], pt2[2]);
                                var sx4 = viz.originX + pj3[0] * viz.scale;
                                var sy4 = viz.originY - pj3[1] * viz.scale;
                                ctx.lineTo(sx4, sy4);
                                if (prevPt) {
                                    var dd2 = Math.sqrt((pt2[0]-prevPt[0])**2 + (pt2[1]-prevPt[1])**2 + (pt2[2]-prevPt[2])**2);
                                    altLen += 2 * Math.asin(dd2 / 2);
                                }
                                prevPt = pt2;
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Points
                            var pp1 = proj3d(p1[0], p1[1], p1[2]);
                            var pp2 = proj3d(p2[0], p2[1], p2[2]);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(viz.originX + pp1[0]*viz.scale, viz.originY - pp1[1]*viz.scale, 6, 0, Math.PI*2); ctx.fill();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(viz.originX + pp2[0]*viz.scale, viz.originY - pp2[1]*viz.scale, 6, 0, Math.PI*2); ctx.fill();

                            // Length comparison
                            viz.screenText('Geodesic vs Non-Geodesic Path', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Geodesic (great circle): L = ' + gcDist.toFixed(3), 15, viz.height - 45, viz.colors.blue, 12, 'left');
                            viz.screenText('Equator + meridian path: L = ' + altLen.toFixed(3), 15, viz.height - 25, viz.colors.red, 12, 'left');
                            var savings = ((1 - gcDist / altLen) * 100);
                            if (altLen > 0.01) {
                                viz.screenText('Geodesic is ' + Math.max(0, savings).toFixed(1) + '% shorter', 15, viz.height - 5, viz.colors.teal, 12, 'left');
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Give an example showing that a geodesic can be locally but not globally length-minimizing.',
                    hint: 'Consider two non-antipodal points on a sphere. There are two great-circle arcs connecting them.',
                    solution: 'On \\(S^2\\), take two non-antipodal points \\(p, q\\). The great circle through \\(p\\) and \\(q\\) has two arcs: a short one and a long one. Both are geodesics. The long arc is locally length-minimizing (any nearby curve is longer), but it is not globally minimizing because the short arc is shorter.'
                },
                {
                    question: 'Show that the exponential map \\(\\exp_p : T_pS \\to S\\) preserves radial distances: if \\(\\mathbf{v} \\in T_pS\\) with \\(\\|\\mathbf{v}\\| = r\\), then the geodesic distance from \\(p\\) to \\(\\exp_p(\\mathbf{v})\\) is \\(r\\) (for small enough \\(r\\)).',
                    hint: 'The geodesic \\(\\gamma(t) = \\exp_p(t\\mathbf{v})\\) has speed \\(\\|\\gamma\'(0)\\| = \\|\\mathbf{v}\\| = r\\), and geodesics have constant speed.',
                    solution: 'The geodesic \\(\\gamma(t) = \\exp_p(t\\mathbf{v}/r)\\) has \\(\\gamma\'(0) = \\mathbf{v}/r\\) with \\(\\|\\gamma\'\\| = 1\\) (unit speed). So the arc length from \\(\\gamma(0) = p\\) to \\(\\gamma(r) = \\exp_p(\\mathbf{v})\\) is \\(\\int_0^r 1\\,dt = r\\). Alternatively, \\(\\gamma(t) = \\exp_p(t\\mathbf{v})\\) has speed \\(\\|\\mathbf{v}\\| = r\\), so arc length from \\(t=0\\) to \\(t=1\\) is \\(r \\cdot 1 = r\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Geodesic Curvature
        // ================================================================
        {
            id: 'sec-geodesic-curvature',
            title: 'Geodesic Curvature',
            content: `
<h2>Geodesic Curvature</h2>

<p>Every curve on a surface has curvature, but part of that curvature comes from the surface bending in space (the normal curvature) and part from the curve turning within the surface. The latter component is the <strong>geodesic curvature</strong>.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Geodesic Curvature)</div>
    <div class="env-body">
        <p>Let \\(\\gamma(s)\\) be a unit-speed curve on an oriented surface \\(S\\) with unit normal \\(\\mathbf{N}\\). The <strong>geodesic curvature</strong> is</p>
        \\[\\kappa_g = \\left\\langle \\gamma''(s),\\, \\mathbf{N} \\times \\gamma'(s) \\right\\rangle = \\left\\langle \\frac{D\\gamma'}{ds},\\, \\mathbf{N} \\times \\gamma'(s) \\right\\rangle.\\]
        <p>Here \\(\\mathbf{N} \\times \\gamma'\\) is the unit tangent vector obtained by rotating \\(\\gamma'\\) by \\(90^\\circ\\) within the tangent plane. The geodesic curvature measures how fast \\(\\gamma\\) is turning <em>within</em> the surface.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.6</div>
    <div class="env-body">
        <p>A curve \\(\\gamma\\) on \\(S\\) is a geodesic if and only if its geodesic curvature vanishes: \\(\\kappa_g = 0\\).</p>
    </div>
</div>

<p>This is immediate: \\(\\kappa_g = 0\\) means \\(D\\gamma'/ds\\) has no component along \\(\\mathbf{N} \\times \\gamma'\\), and since it also has no component along \\(\\gamma'\\) (unit-speed curves have \\(\\langle D\\gamma'/ds, \\gamma'\\rangle = 0\\)), we get \\(D\\gamma'/ds = 0\\).</p>

<h3>Decomposition of Curvature</h3>

<p>The full curvature vector \\(\\gamma''\\) of a unit-speed curve on a surface decomposes as:</p>
\\[\\gamma'' = \\kappa_g (\\mathbf{N} \\times \\gamma') + \\kappa_n \\mathbf{N}\\]
<p>where \\(\\kappa_n = \\langle \\gamma'', \\mathbf{N}\\rangle\\) is the <strong>normal curvature</strong>. Thus \\(\\kappa^2 = \\kappa_g^2 + \\kappa_n^2\\), and a geodesic is a curve whose entire curvature is normal to the surface.</p>

<div class="env-block example">
    <div class="env-title">Example: Circles of Latitude on a Sphere</div>
    <div class="env-body">
        <p>On the unit sphere, the parallel at colatitude \\(\\theta_0\\) is a circle of radius \\(\\sin\\theta_0\\) with curvature \\(\\kappa = 1/\\sin\\theta_0\\) in \\(\\mathbb{R}^3\\). Its geodesic curvature is</p>
        \\[\\kappa_g = \\cot\\theta_0.\\]
        <p>This vanishes only when \\(\\theta_0 = \\pi/2\\) (the equator), confirming that only the equator is a geodesic among the circles of latitude.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-geodesic-curvature"></div>
`,
            visualizations: [
                {
                    id: 'viz-geodesic-curvature',
                    title: 'Geodesic Curvature of Curves on a Sphere',
                    description: 'A circle of latitude on the sphere has geodesic curvature \\(\\kappa_g = \\cot\\theta\\). At the equator (\\(\\theta = 90^\\circ\\)), \\(\\kappa_g = 0\\), so the equator is a geodesic. Move the latitude slider to see how \\(\\kappa_g\\) changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 200, originY: 210, scale: 110
                        });

                        var theta0 = 1.0; // colatitude (pi/2 = equator)
                        VizEngine.createSlider(controls, 'Colatitude \u03B8', 0.2, 2.9, theta0, 0.05, function(v) {
                            theta0 = v; draw();
                        });

                        var camAz = 0.4, camEl = 0.35;
                        function proj3d(x, y, z) {
                            var ca = Math.cos(camAz), sa = Math.sin(camAz);
                            var ce = Math.cos(camEl), se = Math.sin(camEl);
                            var x1 = x * ca + z * sa;
                            var z1 = -x * sa + z * ca;
                            var y1 = y * ce + z1 * se;
                            return [x1, y1];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Wireframe sphere
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.4;
                            for (var phi = 0.3; phi < Math.PI; phi += 0.3) {
                                ctx.beginPath();
                                var started = false;
                                for (var th = 0; th <= 2 * Math.PI + 0.05; th += 0.05) {
                                    var p = proj3d(Math.sin(phi)*Math.cos(th), Math.cos(phi), Math.sin(phi)*Math.sin(th));
                                    var sx = viz.originX + p[0] * viz.scale, sy = viz.originY - p[1] * viz.scale;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            for (var th2 = 0; th2 < Math.PI; th2 += Math.PI / 6) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var phi2 = 0; phi2 <= Math.PI + 0.05; phi2 += 0.05) {
                                    var p2 = proj3d(Math.sin(phi2)*Math.cos(th2), Math.cos(phi2), Math.sin(phi2)*Math.sin(th2));
                                    var sx2 = viz.originX + p2[0] * viz.scale, sy2 = viz.originY - p2[1] * viz.scale;
                                    if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; } else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Draw the circle of latitude
                            var r = Math.sin(theta0);
                            var h = Math.cos(theta0);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var started3 = false;
                            for (var a = 0; a <= 2 * Math.PI + 0.05; a += 0.03) {
                                var p3 = proj3d(r * Math.cos(a), h, r * Math.sin(a));
                                var sx3 = viz.originX + p3[0] * viz.scale;
                                var sy3 = viz.originY - p3[1] * viz.scale;
                                if (!started3) { ctx.moveTo(sx3, sy3); started3 = true; }
                                else ctx.lineTo(sx3, sy3);
                            }
                            ctx.stroke();

                            // Equator for reference
                            ctx.strokeStyle = viz.colors.teal + '66';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            started3 = false;
                            for (var a2 = 0; a2 <= 2 * Math.PI + 0.05; a2 += 0.03) {
                                var p4 = proj3d(Math.cos(a2), 0, Math.sin(a2));
                                var sx4 = viz.originX + p4[0] * viz.scale;
                                var sy4 = viz.originY - p4[1] * viz.scale;
                                if (!started3) { ctx.moveTo(sx4, sy4); started3 = true; }
                                else ctx.lineTo(sx4, sy4);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Right panel: kappa_g plot
                            var plotX = 370, plotY = 60, plotW = 170, plotH = 280;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            // axes
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY);
                            ctx.lineTo(plotX, plotY + plotH);
                            ctx.lineTo(plotX + plotW, plotY + plotH);
                            ctx.stroke();

                            // Plot kappa_g = cot(theta)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var startedP = false;
                            for (var tt = 0.2; tt <= 2.9; tt += 0.01) {
                                var kg = Math.cos(tt) / Math.sin(tt);
                                if (Math.abs(kg) > 5) { startedP = false; continue; }
                                var px = plotX + (tt - 0.2) / 2.7 * plotW;
                                var py = plotY + plotH / 2 - kg / 5 * (plotH / 2);
                                if (!startedP) { ctx.moveTo(px, py); startedP = true; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Zero line
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(plotX, plotY + plotH / 2);
                            ctx.lineTo(plotX + plotW, plotY + plotH / 2);
                            ctx.stroke();

                            // Current value marker
                            var kg0 = Math.cos(theta0) / Math.sin(theta0);
                            var mkx = plotX + (theta0 - 0.2) / 2.7 * plotW;
                            var mky = plotY + plotH / 2 - Math.max(-5, Math.min(5, kg0)) / 5 * (plotH / 2);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(mkx, mky, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Labels
                            viz.screenText('\u03BA_g', plotX - 15, plotY + 10, viz.colors.orange, 12);
                            viz.screenText('\u03B8', plotX + plotW + 10, plotY + plotH, viz.colors.text, 11);
                            viz.screenText('0', plotX - 10, plotY + plotH / 2, viz.colors.text, 10);
                            viz.screenText('\u03C0/2', plotX + plotW / 2 - 5, plotY + plotH + 15, viz.colors.text, 9);

                            var thetaDeg = (theta0 * 180 / Math.PI).toFixed(0);
                            viz.screenText('\u03B8 = ' + thetaDeg + '\u00B0, \u03BA_g = ' + kg0.toFixed(3), viz.width / 2, 18, viz.colors.white, 13);
                            if (Math.abs(theta0 - Math.PI / 2) < 0.08) {
                                viz.screenText('Equator: \u03BA_g = 0 (geodesic!)', viz.width / 2, 38, viz.colors.teal, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that a curve \\(\\gamma\\) on a surface \\(S\\) is a geodesic if and only if \\(\\kappa_g = 0\\) everywhere.',
                    hint: 'Decompose \\(D\\gamma\'/ds\\) into components along \\(\\gamma\'\\) and \\(\\mathbf{N} \\times \\gamma\'\\).',
                    solution: 'For a unit-speed curve, \\(\\langle D\\gamma\'/ds, \\gamma\'\\rangle = 0\\) (differentiate \\(\\langle \\gamma\', \\gamma\'\\rangle = 1\\)). The tangent plane at each point is spanned by \\(\\gamma\'\\) and \\(\\mathbf{N} \\times \\gamma\'\\). So \\(D\\gamma\'/ds = \\kappa_g(\\mathbf{N} \\times \\gamma\')\\). Hence \\(D\\gamma\'/ds = 0\\) iff \\(\\kappa_g = 0\\).'
                },
                {
                    question: 'Compute the geodesic curvature of a circle of latitude at colatitude \\(\\theta_0\\) on the unit sphere.',
                    hint: 'The circle has radius \\(\\sin\\theta_0\\) in \\(\\mathbb{R}^3\\), so its total curvature is \\(1/\\sin\\theta_0\\). Use \\(\\kappa^2 = \\kappa_g^2 + \\kappa_n^2\\) and find \\(\\kappa_n\\) from the second fundamental form.',
                    solution: 'The circle has \\(\\kappa = 1/\\sin\\theta_0\\). The normal curvature \\(\\kappa_n\\) of any curve on the unit sphere is \\(\\kappa_n = 1\\) (the sphere has all normal curvatures equal to \\(1/R = 1\\)). Wait, more carefully: \\(\\kappa_n = \\cos\\theta_0 / \\sin\\theta_0 \\cdot 0 + 1 = 1\\). Actually, for the parallel at \\(\\theta_0\\), the tangent direction is along the parallel, and \\(\\kappa_n = 1\\) for any direction on the unit sphere (all principal curvatures are 1). So \\(\\kappa_g^2 = \\kappa^2 - \\kappa_n^2 = 1/\\sin^2\\theta_0 - 1 = \\cos^2\\theta_0/\\sin^2\\theta_0\\), giving \\(\\kappa_g = \\cot\\theta_0\\).'
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
<h2>Looking Ahead</h2>

<p>In this chapter, we defined geodesics as curves with zero covariant acceleration, derived the geodesic equations in local coordinates, and examined geodesics on several concrete surfaces. We saw that geodesics locally minimize length and introduced the geodesic curvature \\(\\kappa_g\\) as the measure of how much a curve deviates from being a geodesic.</p>

<h3>Key Takeaways</h3>

<ol>
    <li><strong>Geodesics are intrinsic:</strong> they depend only on the first fundamental form \\(g_{ij}\\), not on how the surface sits in \\(\\mathbb{R}^3\\). Two isometric surfaces have the same geodesics.</li>
    <li><strong>The geodesic equations</strong> \\(\\ddot{u}^k + \\Gamma^k_{ij}\\dot{u}^i\\dot{u}^j = 0\\) are a second-order ODE system, solvable (locally) given initial position and velocity.</li>
    <li><strong>Clairaut's relation</strong> gives a conservation law for geodesics on surfaces of revolution.</li>
    <li><strong>Geodesic curvature</strong> \\(\\kappa_g\\) measures turning within the surface; it vanishes for geodesics.</li>
</ol>

<h3>What Comes Next</h3>

<p>The geodesic curvature will play a starring role in Chapter 9, where the <strong>Gauss-Bonnet theorem</strong> relates the integral of Gaussian curvature over a region to the geodesic curvature of its boundary and its Euler characteristic. But first, in Chapter 8, we prove <strong>Gauss's Theorema Egregium</strong>: the Gaussian curvature is an intrinsic invariant, depending only on the metric. This is the deepest theorem in the classical theory of surfaces, and geodesics (through the Christoffel symbols) are at its heart.</p>

<div class="env-block remark">
    <div class="env-title">Parallel Transport Preview</div>
    <div class="env-body">
        <p>There is a natural notion of "carrying a tangent vector along a curve without turning": <strong>parallel transport</strong>. A vector field \\(\\mathbf{V}(t)\\) along \\(\\gamma\\) is parallel if \\(D\\mathbf{V}/dt = 0\\). Along a geodesic, the velocity itself is parallel (that is the definition of a geodesic). Parallel transport around a closed loop on a curved surface produces a rotation, and the angle of rotation is intimately connected to the enclosed Gaussian curvature. We explore this in Chapters 8 and 15.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-parallel-transport-preview"></div>
`,
            visualizations: [
                {
                    id: 'viz-parallel-transport-preview',
                    title: 'Parallel Transport Along a Geodesic',
                    description: 'A tangent vector is transported along a geodesic (great circle) on the sphere. Along a geodesic, the transported vector maintains a constant angle with the velocity, since both satisfy \\(D/dt = 0\\). Watch how the vector stays "parallel" from the surface\'s intrinsic perspective.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 130
                        });

                        var tParam = 0;
                        var animating = false;

                        VizEngine.createSlider(controls, 'Position t', 0, 6.28, tParam, 0.05, function(v) {
                            tParam = v; draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true;
                            tParam = 0;
                            function step() {
                                tParam += 0.03;
                                if (tParam > 2 * Math.PI) { animating = false; tParam = 0; draw(); return; }
                                draw();
                                requestAnimationFrame(step);
                            }
                            step();
                        });

                        var camAz = 0.35, camEl = 0.35;
                        function proj3d(x, y, z) {
                            var ca = Math.cos(camAz), sa = Math.sin(camAz);
                            var ce = Math.cos(camEl), se = Math.sin(camEl);
                            var x1 = x * ca + z * sa;
                            var z1 = -x * sa + z * ca;
                            var y1 = y * ce + z1 * se;
                            var z2 = -y * se + z1 * ce;
                            return [x1, y1, z2];
                        }

                        // Great circle in xz-plane tilted
                        var tilt = 0.5;
                        function gcPoint(t) {
                            var x = Math.cos(t);
                            var z = Math.sin(t);
                            // Rotate around x-axis by tilt
                            var y = z * Math.sin(tilt);
                            var z2 = z * Math.cos(tilt);
                            return [x, y, z2];
                        }
                        function gcVelocity(t) {
                            var x = -Math.sin(t);
                            var z = Math.cos(t);
                            var y = z * Math.sin(tilt);
                            var z2 = z * Math.cos(tilt);
                            return [x, y, z2];
                        }

                        // Parallel transport of a vector perpendicular to velocity along a great circle
                        // On a sphere, parallel transport along a great circle keeps the angle with velocity constant
                        function transportedVec(t) {
                            // Normal to sphere at gamma(t) is gamma(t)
                            var p = gcPoint(t);
                            var vel = gcVelocity(t);
                            // The "sideways" direction: N x vel (where N = p)
                            var side = [
                                p[1]*vel[2] - p[2]*vel[1],
                                p[2]*vel[0] - p[0]*vel[2],
                                p[0]*vel[1] - p[1]*vel[0]
                            ];
                            // Initial vector: perpendicular to velocity in tangent plane = side at t=0
                            // Parallel transport along geodesic preserves the vector (since it's a great circle)
                            return side;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Wireframe sphere
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.4;
                            for (var phi = -1.2; phi <= 1.2; phi += 0.4) {
                                ctx.beginPath();
                                var started = false;
                                for (var th = 0; th <= 2 * Math.PI + 0.05; th += 0.05) {
                                    var pp = proj3d(Math.cos(phi)*Math.cos(th), Math.sin(phi), Math.cos(phi)*Math.sin(th));
                                    if (pp[2] < -0.01) { started = false; continue; }
                                    var sx = viz.originX + pp[0] * viz.scale, sy = viz.originY - pp[1] * viz.scale;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Great circle
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started2 = false;
                            for (var t = 0; t <= 2 * Math.PI + 0.02; t += 0.02) {
                                var gp = gcPoint(t);
                                var pp2 = proj3d(gp[0], gp[1], gp[2]);
                                if (pp2[2] < -0.05) {
                                    if (started2) ctx.stroke();
                                    started2 = false;
                                    ctx.beginPath();
                                    continue;
                                }
                                var sx2 = viz.originX + pp2[0] * viz.scale, sy2 = viz.originY - pp2[1] * viz.scale;
                                if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; }
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Dashed back
                            ctx.strokeStyle = viz.colors.blue + '33';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3,3]);
                            ctx.beginPath();
                            started2 = false;
                            for (var t3 = 0; t3 <= 2 * Math.PI + 0.02; t3 += 0.02) {
                                var gp3 = gcPoint(t3);
                                var pp3 = proj3d(gp3[0], gp3[1], gp3[2]);
                                if (pp3[2] >= -0.05) { started2 = false; ctx.beginPath(); continue; }
                                var sx3 = viz.originX + pp3[0] * viz.scale, sy3 = viz.originY - pp3[1] * viz.scale;
                                if (!started2) { ctx.moveTo(sx3, sy3); started2 = true; }
                                else ctx.lineTo(sx3, sy3);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Current point
                            var pos = gcPoint(tParam);
                            var ppos = proj3d(pos[0], pos[1], pos[2]);
                            if (ppos[2] > -0.1) {
                                var spx = viz.originX + ppos[0] * viz.scale;
                                var spy = viz.originY - ppos[1] * viz.scale;

                                // Velocity arrow
                                var vel = gcVelocity(tParam);
                                var vLen = 0.3;
                                var velEnd = proj3d(pos[0]+vLen*vel[0], pos[1]+vLen*vel[1], pos[2]+vLen*vel[2]);
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(spx, spy);
                                ctx.lineTo(viz.originX + velEnd[0]*viz.scale, viz.originY - velEnd[1]*viz.scale);
                                ctx.stroke();
                                // Arrowhead
                                var adx = viz.originX + velEnd[0]*viz.scale - spx;
                                var ady = viz.originY - velEnd[1]*viz.scale - spy;
                                var aang = Math.atan2(ady, adx);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.moveTo(viz.originX + velEnd[0]*viz.scale, viz.originY - velEnd[1]*viz.scale);
                                ctx.lineTo(viz.originX + velEnd[0]*viz.scale - 8*Math.cos(aang-0.4), viz.originY - velEnd[1]*viz.scale - 8*Math.sin(aang-0.4));
                                ctx.lineTo(viz.originX + velEnd[0]*viz.scale - 8*Math.cos(aang+0.4), viz.originY - velEnd[1]*viz.scale - 8*Math.sin(aang+0.4));
                                ctx.closePath();
                                ctx.fill();

                                // Transported vector
                                var tv = transportedVec(tParam);
                                var tvEnd = proj3d(pos[0]+vLen*tv[0], pos[1]+vLen*tv[1], pos[2]+vLen*tv[2]);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(spx, spy);
                                ctx.lineTo(viz.originX + tvEnd[0]*viz.scale, viz.originY - tvEnd[1]*viz.scale);
                                ctx.stroke();
                                var adx2 = viz.originX + tvEnd[0]*viz.scale - spx;
                                var ady2 = viz.originY - tvEnd[1]*viz.scale - spy;
                                var aang2 = Math.atan2(ady2, adx2);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(viz.originX + tvEnd[0]*viz.scale, viz.originY - tvEnd[1]*viz.scale);
                                ctx.lineTo(viz.originX + tvEnd[0]*viz.scale - 8*Math.cos(aang2-0.4), viz.originY - tvEnd[1]*viz.scale - 8*Math.sin(aang2-0.4));
                                ctx.lineTo(viz.originX + tvEnd[0]*viz.scale - 8*Math.cos(aang2+0.4), viz.originY - tvEnd[1]*viz.scale - 8*Math.sin(aang2+0.4));
                                ctx.closePath();
                                ctx.fill();

                                // Point
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.arc(spx, spy, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Legend
                            viz.screenText('Parallel Transport Along a Geodesic', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Velocity \u03B3\'', 40, viz.height - 40, viz.colors.teal, 11, 'left');
                            viz.screenText('Parallel-transported vector', 40, viz.height - 22, viz.colors.orange, 11, 'left');
                            viz.screenText('Constant angle between vectors (both have D/dt = 0)', 40, viz.height - 4, viz.colors.text, 10, 'left');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that parallel transport along a geodesic preserves the angle between the transported vector and the velocity.',
                    hint: 'If \\(D\\mathbf{V}/dt = 0\\) and \\(D\\gamma\'/dt = 0\\), compute \\(\\frac{d}{dt}\\langle \\mathbf{V}, \\gamma\'\\rangle\\).',
                    solution: '\\(\\frac{d}{dt}\\langle \\mathbf{V}, \\gamma\'\\rangle = \\langle \\frac{D\\mathbf{V}}{dt}, \\gamma\'\\rangle + \\langle \\mathbf{V}, \\frac{D\\gamma\'}{dt}\\rangle = 0 + 0 = 0\\). So \\(\\langle \\mathbf{V}, \\gamma\'\\rangle\\) is constant. Since \\(\\|\\mathbf{V}\\|\\) and \\(\\|\\gamma\'\\|\\) are also constant (by the same argument), \\(\\cos\\theta = \\langle \\mathbf{V}, \\gamma\'\\rangle / (\\|\\mathbf{V}\\|\\|\\gamma\'\\|)\\) is constant.'
                },
                {
                    question: 'Prove Clairaut\'s relation for geodesics on a surface of revolution: if \\(\\gamma\\) is a geodesic making angle \\(\\theta\\) with the meridians, then \\(r \\sin\\theta = \\text{const}\\), where \\(r\\) is the distance from the axis.',
                    hint: 'The surface of revolution has metric \\(ds^2 = G\\,du^2 + f(u)^2\\,dv^2\\). The geodesic equation for \\(v\\) gives \\(\\frac{d}{dt}(f^2 \\dot{v}) = 0\\). Express \\(f^2 \\dot{v}\\) in terms of \\(r\\) and \\(\\theta\\).',
                    solution: 'The second geodesic equation gives \\(f^2 \\dot{v} = c\\) (constant). For unit-speed geodesic: \\(1 = G\\dot{u}^2 + f^2\\dot{v}^2\\), and \\(\\sin\\theta = f\\dot{v}/1 = f\\dot{v}\\). So \\(f^2\\dot{v} = f \\cdot f\\dot{v} = f\\sin\\theta = r\\sin\\theta\\). Since \\(f^2\\dot{v} = c\\), we get \\(r\\sin\\theta = c\\).'
                },
                {
                    question: 'Use Clairaut\'s relation to show that a geodesic on a sphere starting at colatitude \\(\\theta_0\\) with angle \\(\\alpha\\) to the meridian reaches a minimum colatitude \\(\\theta_{\\min}\\) satisfying \\(\\sin\\theta_{\\min} = \\sin\\theta_0 \\sin\\alpha\\).',
                    hint: 'At the turning point, the geodesic is tangent to the parallel, so \\(\\theta = \\pi/2\\).',
                    solution: 'By Clairaut: \\(\\sin\\theta_0 \\sin\\alpha = \\sin\\theta \\sin\\theta_t\\), where \\(\\theta_t\\) is the angle with the meridian. At the turning point, the geodesic runs along the parallel so \\(\\theta_t = \\pi/2\\) and \\(\\sin\\theta_t = 1\\). Thus \\(\\sin\\theta_{\\min} = \\sin\\theta_0 \\sin\\alpha\\).'
                }
            ]
        }
    ]
});
