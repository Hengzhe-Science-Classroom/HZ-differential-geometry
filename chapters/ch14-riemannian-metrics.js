window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Riemannian Metrics',
    subtitle: 'Measuring distances on abstract manifolds',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Do We Need a Metric?</h2>

<div class="env-block intuition">
    <div class="env-title">From Extrinsic to Intrinsic</div>
    <div class="env-body">
        <p>In Parts B and C we measured lengths and angles on surfaces using the ambient space \\(\\mathbb{R}^3\\). The First Fundamental Form \\(I_p(v,w) = \\langle v, w \\rangle\\) inherited its inner product from the Euclidean dot product of \\(\\mathbb{R}^3\\). But now, on an abstract smooth manifold \\(M\\) that may not live inside any ambient Euclidean space, we have no such luxury. We need to <em>declare</em> an inner product on each tangent space, smoothly varying from point to point.</p>
    </div>
</div>

<p>Recall that a smooth manifold \\(M\\) comes equipped with a differentiable structure (charts, atlases, transition maps) but <strong>no notion of distance, angle, or length</strong>. The tangent space \\(T_pM\\) at each point \\(p\\) is a real vector space, but it has no preferred inner product. A Riemannian metric is exactly the extra structure we need.</p>

<h3>What a Metric Buys You</h3>

<p>Once a manifold carries a Riemannian metric, we can:</p>
<ul>
    <li><strong>Measure lengths</strong> of tangent vectors, and thus of curves.</li>
    <li><strong>Measure angles</strong> between tangent vectors at a point.</li>
    <li><strong>Define a distance function</strong> \\(d(p,q)\\) turning \\(M\\) into a metric space.</li>
    <li><strong>Define volume</strong> (the Riemannian volume form).</li>
    <li><strong>Define curvature</strong> intrinsically, leading to all of Riemannian geometry.</li>
</ul>

<p>The passage from "bare manifold" to "Riemannian manifold" is analogous to equipping a vector space with an inner product: the algebraic structure is already there, but the geometry requires an additional choice.</p>

<h3>The First Fundamental Form, Revisited</h3>

<p>For a surface \\(S \\subset \\mathbb{R}^3\\) parametrized by \\(\\mathbf{x}(u,v)\\), the First Fundamental Form is</p>
\\[
I_p = E\\,du^2 + 2F\\,du\\,dv + G\\,dv^2
\\]
<p>where \\(E = \\langle \\mathbf{x}_u, \\mathbf{x}_u \\rangle\\), \\(F = \\langle \\mathbf{x}_u, \\mathbf{x}_v \\rangle\\), \\(G = \\langle \\mathbf{x}_v, \\mathbf{x}_v \\rangle\\). This is already a Riemannian metric on \\(S\\), expressed in the coordinate chart \\((u,v)\\). The Riemannian metric generalizes this to arbitrary dimensions and to manifolds with no ambient space.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Riemann introduced the concept in his 1854 Habilitationsschrift "On the Hypotheses Which Lie at the Foundations of Geometry," one of the most influential lectures in the history of mathematics. He proposed that geometry should not be constrained to Euclid's axioms, but should be determined by a choice of "metric" on the underlying space. This idea eventually became the mathematical language of general relativity.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Definition of Riemannian Metrics
        // ================================================================
        {
            id: 'sec-definition',
            title: 'Riemannian Metrics',
            content: `
<h2>Riemannian Metrics</h2>

<div class="env-block definition">
    <div class="env-title">Definition 14.1 (Riemannian Metric)</div>
    <div class="env-body">
        <p>A <strong>Riemannian metric</strong> \\(g\\) on a smooth manifold \\(M\\) is a smooth assignment of an inner product \\(g_p : T_pM \\times T_pM \\to \\mathbb{R}\\) to each point \\(p \\in M\\). That is, for each \\(p\\), \\(g_p\\) is:</p>
        <ol>
            <li><strong>Bilinear:</strong> \\(g_p(aX + bY, Z) = a\\,g_p(X,Z) + b\\,g_p(Y,Z)\\)</li>
            <li><strong>Symmetric:</strong> \\(g_p(X, Y) = g_p(Y, X)\\)</li>
            <li><strong>Positive definite:</strong> \\(g_p(X, X) > 0\\) for all \\(X \\neq 0\\)</li>
        </ol>
        <p>and the assignment \\(p \\mapsto g_p\\) is smooth in the sense that for any smooth vector fields \\(X, Y\\), the function \\(p \\mapsto g_p(X_p, Y_p)\\) is smooth.</p>
    </div>
</div>

<p>A smooth manifold \\(M\\) together with a Riemannian metric \\(g\\) is called a <strong>Riemannian manifold</strong> and is denoted \\((M, g)\\).</p>

<h3>In Local Coordinates</h3>

<p>If \\((x^1, \\ldots, x^n)\\) are local coordinates on \\(M\\), we can express the metric as</p>
\\[
g = \\sum_{i,j=1}^{n} g_{ij}\\,dx^i \\otimes dx^j
\\]
<p>where the <strong>metric components</strong> are</p>
\\[
g_{ij}(p) = g_p\\!\\left(\\frac{\\partial}{\\partial x^i}\\bigg|_p,\\, \\frac{\\partial}{\\partial x^j}\\bigg|_p\\right).
\\]
<p>The matrix \\([g_{ij}]\\) is symmetric and positive definite at every point. The metric is often written compactly using the Einstein summation convention as \\(g = g_{ij}\\,dx^i\\,dx^j\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.2 (Existence of Riemannian Metrics)</div>
    <div class="env-body">
        <p>Every smooth manifold admits a Riemannian metric.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Using a partition of unity \\(\\{\\rho_\\alpha\\}\\) subordinate to a coordinate atlas \\(\\{(U_\\alpha, \\varphi_\\alpha)\\}\\), pull back the Euclidean metric on each chart and glue: \\(g = \\sum_\\alpha \\rho_\\alpha \\, \\varphi_\\alpha^* g_{\\text{Eucl}}\\). Convex combinations of positive-definite bilinear forms are positive definite, so this works.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 14.3 (Musical Isomorphisms)</div>
    <div class="env-body">
        <p>A Riemannian metric gives a natural isomorphism between \\(T_pM\\) and \\(T_p^*M\\):</p>
        <ul>
            <li><strong>Flat (\\(\\flat\\)):</strong> \\(X^\\flat(Y) = g(X, Y)\\), mapping vectors to covectors.</li>
            <li><strong>Sharp (\\(\\sharp\\)):</strong> the inverse, mapping covectors to vectors.</li>
        </ul>
        <p>In coordinates: \\((X^\\flat)_i = g_{ij}X^j\\) and \\((\\omega^\\sharp)^i = g^{ij}\\omega_j\\), where \\([g^{ij}]\\) is the inverse matrix of \\([g_{ij}]\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-metric-distortion"></div>
`,
            visualizations: [
                {
                    id: 'viz-metric-distortion',
                    title: 'Metric Distortion: How the Metric Changes Distances',
                    description: 'A flat plane with a non-Euclidean metric. The grid shows how distances are measured differently at different points. Drag the sliders to change the metric components and watch the grid distort.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 40
                        });

                        var gxx = 1.0, gyy = 1.0, gxy = 0.0;
                        VizEngine.createSlider(controls, 'g\u2081\u2081', 0.3, 3.0, gxx, 0.1, function(v) { gxx = v; });
                        VizEngine.createSlider(controls, 'g\u2082\u2082', 0.3, 3.0, gyy, 0.1, function(v) { gyy = v; });
                        VizEngine.createSlider(controls, 'g\u2081\u2082', -1.0, 1.0, gxy, 0.05, function(v) { gxy = v; });

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Title
                            viz.screenText('Metric Distortion on R\u00B2', viz.width / 2, 18, viz.colors.white, 15);

                            // Clamp gxy for positive definiteness
                            var maxGxy = Math.sqrt(gxx * gyy) - 0.01;
                            var gxyC = Math.max(-maxGxy, Math.min(maxGxy, gxy));

                            // Compute the "square root" of the metric tensor for distortion
                            // Use Cholesky: L = [[sqrt(gxx), 0], [gxy/sqrt(gxx), sqrt(gyy - gxy^2/gxx)]]
                            var l11 = Math.sqrt(gxx);
                            var l21 = gxyC / l11;
                            var l22inner = gyy - l21 * l21;
                            if (l22inner < 0.01) l22inner = 0.01;
                            var l22 = Math.sqrt(l22inner);

                            // Draw distorted grid
                            var range = 5;
                            ctx.globalAlpha = 0.4;
                            for (var i = -range; i <= range; i++) {
                                // Vertical-ish lines (constant u)
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var j = -range * 10; j <= range * 10; j++) {
                                    var u = i, v = j * 0.1;
                                    var tx = l11 * u + 0 * v;
                                    var ty = l21 * u + l22 * v;
                                    var sp = viz.toScreen(tx, ty);
                                    if (j === -range * 10) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();

                                // Horizontal-ish lines (constant v)
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.beginPath();
                                for (var k = -range * 10; k <= range * 10; k++) {
                                    var u2 = k * 0.1, v2 = i;
                                    var tx2 = l11 * u2 + 0 * v2;
                                    var ty2 = l21 * u2 + l22 * v2;
                                    var sp2 = viz.toScreen(tx2, ty2);
                                    if (k === -range * 10) ctx.moveTo(sp2[0], sp2[1]);
                                    else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.stroke();
                            }
                            ctx.globalAlpha = 1.0;

                            // Draw coordinate basis vectors at origin
                            // e1 direction in distorted coords
                            var e1x = l11, e1y = l21;
                            var e2x = 0, e2y = l22;
                            viz.drawVector(0, 0, e1x, e1y, viz.colors.orange, 'e\u2081', 2.5);
                            viz.drawVector(0, 0, e2x, e2y, viz.colors.purple, 'e\u2082', 2.5);

                            // Draw unit circle in the metric (ellipse in Euclidean)
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var a = 0; a <= 200; a++) {
                                var theta = 2 * Math.PI * a / 200;
                                var cx = Math.cos(theta), cy = Math.sin(theta);
                                // Unit vector in metric: g(v,v)=1 means |Lv|=1
                                // So v = L^{-1} * (cos, sin)
                                var det = l11 * l22;
                                var vx = (l22 * cx) / det;
                                var vy = (-l21 * cx + l11 * cy) / det;
                                var spt = viz.toScreen(vx, vy);
                                if (a === 0) ctx.moveTo(spt[0], spt[1]);
                                else ctx.lineTo(spt[0], spt[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Labels
                            viz.screenText('Unit circle in metric g', viz.width / 2, viz.height - 45, viz.colors.yellow, 12);

                            var det2 = gxx * gyy - gxyC * gxyC;
                            viz.screenText(
                                'g = [' + gxx.toFixed(1) + ', ' + gxyC.toFixed(2) + '; ' + gxyC.toFixed(2) + ', ' + gyy.toFixed(1) + ']   det = ' + det2.toFixed(2),
                                viz.width / 2, viz.height - 25, viz.colors.text, 11
                            );
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the matrix \\([g_{ij}]\\) must be positive definite (all eigenvalues positive) for \\(g\\) to be a Riemannian metric. What goes wrong if the matrix is only positive semi-definite?',
                    hint: 'Consider a nonzero vector \\(v \\in T_pM\\) in the kernel of a semi-definite matrix. What is \\(g_p(v,v)\\)?',
                    solution: 'If \\([g_{ij}]\\) is only positive semi-definite, there exists a nonzero vector \\(v\\) with \\(g_p(v,v) = v^T [g_{ij}] v = 0\\), violating the positive definiteness requirement. Such a \\(v\\) would have "zero length," making it impossible to distinguish it from the zero vector metrically. This would also prevent \\(g\\) from defining a genuine distance function (distinct points could have zero distance).'
                },
                {
                    question: 'Verify that the Euclidean metric \\(g = dx^1 \\otimes dx^1 + dx^2 \\otimes dx^2\\) on \\(\\mathbb{R}^2\\) has \\(g_{ij} = \\delta_{ij}\\) and that \\(g_p(v,w)\\) reduces to the standard dot product \\(v \\cdot w\\).',
                    hint: 'Write \\(v = v^1 \\partial_1 + v^2 \\partial_2\\) and compute \\(g_p(v,w) = g_{ij}v^i w^j\\).',
                    solution: 'We have \\(g_{ij} = g(\\partial_i, \\partial_j) = \\delta_{ij}\\) since \\(dx^i(\\partial_j) = \\delta^i_j\\). Then \\(g_p(v,w) = \\delta_{ij}v^i w^j = v^1 w^1 + v^2 w^2 = v \\cdot w\\), the standard dot product.'
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
<h2>Examples of Riemannian Metrics</h2>

<h3>1. Euclidean Space \\((\\mathbb{R}^n, g_{\\text{Eucl}})\\)</h3>

<p>The simplest example: in standard coordinates \\((x^1, \\ldots, x^n)\\),</p>
\\[
g_{\\text{Eucl}} = (dx^1)^2 + (dx^2)^2 + \\cdots + (dx^n)^2, \\qquad g_{ij} = \\delta_{ij}.
\\]
<p>This is the "flat" metric against which all others are compared.</p>

<h3>2. The Round Sphere \\((S^2, g_{\\text{round}})\\)</h3>

<p>In spherical coordinates \\((\\theta, \\phi)\\) with \\(\\theta \\in (0,\\pi)\\), \\(\\phi \\in [0,2\\pi)\\):</p>
\\[
g_{S^2} = d\\theta^2 + \\sin^2\\!\\theta \\, d\\phi^2.
\\]
<p>The factor \\(\\sin^2\\!\\theta\\) captures the fact that circles of latitude shrink as you approach the poles. The metric components are \\(g_{\\theta\\theta} = 1\\), \\(g_{\\phi\\phi} = \\sin^2\\!\\theta\\), \\(g_{\\theta\\phi} = 0\\).</p>

<div class="viz-placeholder" data-viz="viz-sphere-metric"></div>

<h3>3. The Poincare Disk \\((\\mathbb{D}^2, g_{\\text{hyp}})\\)</h3>

<p>The open unit disk \\(\\mathbb{D}^2 = \\{(x,y) : x^2 + y^2 < 1\\}\\) with</p>
\\[
g_{\\text{hyp}} = \\frac{4\\,(dx^2 + dy^2)}{(1 - x^2 - y^2)^2}.
\\]
<p>This is a model of the <strong>hyperbolic plane</strong> \\(\\mathbb{H}^2\\), a space of constant negative curvature \\(K = -1\\). The conformal factor \\(\\lambda(x,y) = 2/(1 - x^2 - y^2)\\) blows up as \\((x,y)\\) approaches the boundary circle, making the boundary "infinitely far away." Geodesics are arcs of circles orthogonal to the boundary.</p>

<div class="viz-placeholder" data-viz="viz-poincare-disk"></div>

<h3>4. The Poincare Half-Plane \\((\\mathbb{H}^2, g_{\\text{hyp}})\\)</h3>

<p>The upper half-plane \\(\\{(x,y) : y > 0\\}\\) with</p>
\\[
g_{\\text{hyp}} = \\frac{dx^2 + dy^2}{y^2}.
\\]
<p>This is another model of \\(\\mathbb{H}^2\\), isometric to the Poincare disk. Geodesics are vertical lines and semicircles centered on the \\(x\\)-axis. The metric blows up as \\(y \\to 0^+\\), so the \\(x\\)-axis is "at infinity."</p>

<div class="viz-placeholder" data-viz="viz-poincare-half-plane"></div>

<h3>5. The Fubini-Study Metric</h3>

<p>Complex projective space \\(\\mathbb{CP}^n\\) carries a natural Riemannian metric called the <strong>Fubini-Study metric</strong>. For \\(\\mathbb{CP}^1 \\cong S^2\\), in the standard chart \\(z = x + iy\\):</p>
\\[
g_{FS} = \\frac{4\\,(dx^2 + dy^2)}{(1 + x^2 + y^2)^2}.
\\]
<p>This is the round metric on \\(S^2\\) of radius 1, written in stereographic coordinates. The conformal factor \\(4/(1+|z|^2)^2\\) is the Jacobian of stereographic projection.</p>

<div class="env-block remark">
    <div class="env-title">Conformal Metrics</div>
    <div class="env-body">
        <p>All four non-Euclidean examples above are <strong>conformal</strong> to the Euclidean metric: they have the form \\(g = \\lambda^2(x) \\, g_{\\text{Eucl}}\\) for some positive function \\(\\lambda\\). Conformal metrics preserve angles but distort distances. This is why the Poincare disk and half-plane models accurately represent angles in hyperbolic geometry.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-sphere-metric',
                    title: 'The Round Metric on S\u00B2',
                    description: 'The sphere with its round metric. Lines of latitude and longitude form the coordinate grid. Great circles (geodesics) are shown in yellow. Notice how the spacing of longitude lines shrinks near the poles, reflecting the sin\u00B2\u03B8 factor.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 150
                        });

                        var rotY = 0.3;
                        var rotX = 0.4;
                        VizEngine.createSlider(controls, 'Rotate Y', -3.14, 3.14, rotY, 0.05, function(v) { rotY = v; });
                        VizEngine.createSlider(controls, 'Tilt X', -1.5, 1.5, rotX, 0.05, function(v) { rotX = v; });

                        function project(theta, phi) {
                            var x = Math.sin(theta) * Math.cos(phi);
                            var y = Math.sin(theta) * Math.sin(phi);
                            var z = Math.cos(theta);
                            // Rotate around Y axis
                            var x2 = x * Math.cos(rotY) + z * Math.sin(rotY);
                            var z2 = -x * Math.sin(rotY) + z * Math.cos(rotY);
                            // Rotate around X axis
                            var y2 = y * Math.cos(rotX) - z2 * Math.sin(rotX);
                            var z3 = y * Math.sin(rotX) + z2 * Math.cos(rotX);
                            return { sx: x2, sy: -y2, depth: z3 };
                        }

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;
                            viz.screenText('The Round Metric on S\u00B2', viz.width / 2, 18, viz.colors.white, 15);

                            var steps = 80;

                            // Draw latitude lines
                            for (var lat = 1; lat < 12; lat++) {
                                var theta = lat * Math.PI / 12;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var s = 0; s <= steps; s++) {
                                    var phi = 2 * Math.PI * s / steps;
                                    var p = project(theta, phi);
                                    var sx = viz.originX + p.sx * viz.scale;
                                    var sy = viz.originY + p.sy * viz.scale;
                                    if (p.depth < 0) { started = false; continue; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Draw longitude lines
                            for (var lon = 0; lon < 12; lon++) {
                                var phi2 = lon * Math.PI / 6;
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started2 = false;
                                for (var s2 = 0; s2 <= steps; s2++) {
                                    var theta2 = Math.PI * s2 / steps;
                                    var p2 = project(theta2, phi2);
                                    var sx2 = viz.originX + p2.sx * viz.scale;
                                    var sy2 = viz.originY + p2.sy * viz.scale;
                                    if (p2.depth < 0) { started2 = false; continue; }
                                    if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; }
                                    else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Draw a great circle geodesic (equator)
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var startedGeo = false;
                            for (var sg = 0; sg <= steps; sg++) {
                                var phiG = 2 * Math.PI * sg / steps;
                                var pG = project(Math.PI / 2, phiG);
                                var sxG = viz.originX + pG.sx * viz.scale;
                                var syG = viz.originY + pG.sy * viz.scale;
                                if (pG.depth < 0) { startedGeo = false; continue; }
                                if (!startedGeo) { ctx.moveTo(sxG, syG); startedGeo = true; }
                                else ctx.lineTo(sxG, syG);
                            }
                            ctx.stroke();

                            // Another great circle (through poles, at phi=0)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var startedGeo2 = false;
                            for (var sg2 = 0; sg2 <= steps; sg2++) {
                                var thetaG = Math.PI * sg2 / steps;
                                var pG2 = project(thetaG, 0);
                                var sxG2 = viz.originX + pG2.sx * viz.scale;
                                var syG2 = viz.originY + pG2.sy * viz.scale;
                                if (pG2.depth < 0) { startedGeo2 = false; continue; }
                                if (!startedGeo2) { ctx.moveTo(sxG2, syG2); startedGeo2 = true; }
                                else ctx.lineTo(sxG2, syG2);
                            }
                            ctx.stroke();

                            // Sphere outline
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, 2 * Math.PI);
                            ctx.stroke();

                            // Legend
                            viz.screenText('g = d\u03B8\u00B2 + sin\u00B2\u03B8 d\u03C6\u00B2', viz.width / 2, viz.height - 40, viz.colors.teal, 13);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillRect(130, viz.height - 22, 12, 3);
                            viz.screenText('equator (geodesic)', 205, viz.height - 20, viz.colors.yellow, 11);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(310, viz.height - 22, 12, 3);
                            viz.screenText('meridian (geodesic)', 390, viz.height - 20, viz.colors.orange, 11);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-poincare-disk',
                    title: 'The Poincar\u00E9 Disk Model',
                    description: 'Hyperbolic geometry in the Poincar\u00E9 disk. Geodesics are arcs of circles orthogonal to the boundary. Distances grow exponentially near the boundary. Click to place geodesic endpoints.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 440,
                            originX: 280, originY: 220, scale: 170
                        });

                        var nGeodesics = 6;
                        VizEngine.createSlider(controls, 'Geodesics', 3, 12, nGeodesics, 1, function(v) { nGeodesics = Math.round(v); });

                        // Hyperbolic geodesic between two points in the disk
                        function hypGeodesic(ctx, x1, y1, x2, y2, color, lw) {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = lw || 2;

                            // Check if geodesic passes through origin (straight line)
                            var cross = x1 * y2 - x2 * y1;
                            if (Math.abs(cross) < 1e-6) {
                                var s1 = viz.toScreen(x1, y1);
                                var s2 = viz.toScreen(x2, y2);
                                ctx.beginPath();
                                ctx.moveTo(s1[0], s1[1]);
                                ctx.lineTo(s2[0], s2[1]);
                                ctx.stroke();
                                return;
                            }

                            // Find the circle orthogonal to unit circle passing through (x1,y1) and (x2,y2)
                            // The center (cx, cy) satisfies: cx*x1 + cy*y1 = (1 + x1^2 + y1^2)/2
                            // and cx*x2 + cy*y2 = (1 + x2^2 + y2^2)/2
                            var a1 = x1, b1 = y1, c1 = (1 + x1*x1 + y1*y1) / 2;
                            var a2 = x2, b2 = y2, c2 = (1 + x2*x2 + y2*y2) / 2;
                            var det = a1*b2 - a2*b1;
                            if (Math.abs(det) < 1e-10) return;
                            var cx = (c1*b2 - c2*b1) / det;
                            var cy = (a1*c2 - a2*c1) / det;
                            var r = Math.sqrt((x1-cx)*(x1-cx) + (y1-cy)*(y1-cy));

                            var ang1 = Math.atan2(y1 - cy, x1 - cx);
                            var ang2 = Math.atan2(y2 - cy, x2 - cx);

                            // Ensure we take the shorter arc
                            var diff = ang2 - ang1;
                            while (diff > Math.PI) diff -= 2*Math.PI;
                            while (diff < -Math.PI) diff += 2*Math.PI;

                            ctx.beginPath();
                            var numSteps = 60;
                            for (var i = 0; i <= numSteps; i++) {
                                var t = i / numSteps;
                                var angle = ang1 + diff * t;
                                var px = cx + r * Math.cos(angle);
                                var py = cy + r * Math.sin(angle);
                                var sp = viz.toScreen(px, py);
                                if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                else ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.stroke();
                        }

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Poincar\u00E9 Disk Model of H\u00B2', viz.width / 2, 18, viz.colors.white, 15);

                            // Boundary circle
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, 2 * Math.PI);
                            ctx.stroke();

                            // Fill disk with subtle gradient to show metric blowup
                            var grad = ctx.createRadialGradient(viz.originX, viz.originY, 0, viz.originX, viz.originY, viz.scale);
                            grad.addColorStop(0, '#1a1a4033');
                            grad.addColorStop(0.7, '#1a1a4066');
                            grad.addColorStop(1, '#1a1a40cc');
                            ctx.fillStyle = grad;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, 2 * Math.PI);
                            ctx.fill();

                            // Draw hyperbolic geodesics
                            var geoColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.red, viz.colors.yellow, viz.colors.pink];
                            for (var i = 0; i < nGeodesics; i++) {
                                var angle1 = 2 * Math.PI * i / nGeodesics + 0.2;
                                var angle2 = angle1 + Math.PI * 0.6 + 0.3 * i;
                                var r1 = 0.85, r2 = 0.85;
                                var px1 = r1 * Math.cos(angle1), py1 = r1 * Math.sin(angle1);
                                var px2 = r2 * Math.cos(angle2), py2 = r2 * Math.sin(angle2);
                                hypGeodesic(ctx, px1, py1, px2, py2, geoColors[i % geoColors.length], 2);
                            }

                            // Draw a geodesic through the origin (diameter)
                            hypGeodesic(ctx, -0.9, 0, 0.9, 0, viz.colors.yellow, 2.5);

                            // Draw concentric "hyperbolic circles" to show metric scaling
                            ctx.globalAlpha = 0.3;
                            for (var c = 1; c <= 4; c++) {
                                var eucR = Math.tanh(c * 0.5); // hyperbolic distance c maps to Euclidean radius tanh(c/2) in disk model
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 0.5;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.arc(viz.originX, viz.originY, eucR * viz.scale, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }
                            ctx.globalAlpha = 1;

                            // Labels
                            viz.screenText('g = 4(dx\u00B2+dy\u00B2)/(1\u2212r\u00B2)\u00B2', viz.width / 2, viz.height - 40, viz.colors.teal, 12);
                            viz.screenText('Geodesics = circular arcs \u22A5 boundary', viz.width / 2, viz.height - 20, viz.colors.text, 11);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-poincare-half-plane',
                    title: 'The Poincar\u00E9 Half-Plane Model',
                    description: 'The upper half-plane model of hyperbolic geometry. Geodesics are semicircles centered on the x-axis and vertical lines. The metric blows up as y approaches 0.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 380, scale: 60
                        });

                        var nGeo = 5;
                        VizEngine.createSlider(controls, 'Geodesics', 2, 10, nGeo, 1, function(v) { nGeo = Math.round(v); });

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Poincar\u00E9 Half-Plane Model of H\u00B2', viz.width / 2, 18, viz.colors.white, 15);

                            // Draw the x-axis (boundary at infinity)
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            var axisY = viz.originY;
                            ctx.beginPath();
                            ctx.moveTo(0, axisY);
                            ctx.lineTo(viz.width, axisY);
                            ctx.stroke();

                            // Gradient showing metric blowup near y=0
                            var grad = ctx.createLinearGradient(0, 40, 0, axisY);
                            grad.addColorStop(0, '#1a1a4011');
                            grad.addColorStop(0.8, '#1a1a4044');
                            grad.addColorStop(1, '#1a1a40cc');
                            ctx.fillStyle = grad;
                            ctx.fillRect(0, 40, viz.width, axisY - 40);

                            // Draw horizontal lines (y = const) showing metric scaling
                            ctx.globalAlpha = 0.3;
                            for (var yy = 0.5; yy <= 5; yy += 0.5) {
                                var sp = viz.toScreen(0, yy);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(0, sp[1]);
                                ctx.lineTo(viz.width, sp[1]);
                                ctx.stroke();
                                if (yy === Math.round(yy)) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'right';
                                    ctx.fillText('y=' + yy, 35, sp[1] + 4);
                                }
                            }
                            ctx.globalAlpha = 1;

                            // Draw semicircular geodesics
                            var geoColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.red, viz.colors.yellow, viz.colors.pink];
                            for (var i = 0; i < nGeo; i++) {
                                var centerX = -3 + i * 1.5;
                                var radius = 0.8 + i * 0.4;
                                ctx.strokeStyle = geoColors[i % geoColors.length];
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var s = 0; s <= 60; s++) {
                                    var angle = Math.PI * s / 60;
                                    var px = centerX + radius * Math.cos(angle);
                                    var py = radius * Math.sin(angle);
                                    if (py < 0.01) continue;
                                    var sp2 = viz.toScreen(px, py);
                                    if (s === 0) ctx.moveTo(sp2[0], sp2[1]);
                                    else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw a vertical geodesic
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2.5;
                            var vx = 1.0;
                            var sBot = viz.toScreen(vx, 0.05);
                            var sTop = viz.toScreen(vx, 5.5);
                            ctx.beginPath();
                            ctx.moveTo(sBot[0], sBot[1]);
                            ctx.lineTo(sTop[0], sTop[1]);
                            ctx.stroke();

                            // Show equal hyperbolic-length segments on the vertical geodesic
                            ctx.fillStyle = viz.colors.yellow;
                            var segHeights = [0.25, 0.5, 1, 2, 4];
                            for (var si = 0; si < segHeights.length; si++) {
                                var sp3 = viz.toScreen(vx, segHeights[si]);
                                ctx.beginPath();
                                ctx.arc(sp3[0], sp3[1], 3, 0, 2 * Math.PI);
                                ctx.fill();
                            }

                            // Annotations
                            viz.screenText('g = (dx\u00B2+dy\u00B2)/y\u00B2', viz.width / 2, viz.height - 45, viz.colors.teal, 12);
                            viz.screenText('Geodesics = semicircles on x-axis + vertical lines', viz.width / 2, viz.height - 25, viz.colors.text, 11);
                            viz.screenText('\u221E', viz.width / 2, axisY + 12, viz.colors.red, 14);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the Poincare disk metric \\(g = \\frac{4(dx^2 + dy^2)}{(1 - r^2)^2}\\) is conformally equivalent to the Euclidean metric. What is the conformal factor \\(\\lambda(r)\\)?',
                    hint: 'A metric \\(g = \\lambda^2 g_{\\text{Eucl}}\\) is conformal to the Euclidean metric. Write \\(g = \\lambda^2(dx^2 + dy^2)\\) and identify \\(\\lambda\\).',
                    solution: 'We have \\(g = \\frac{4(dx^2+dy^2)}{(1-r^2)^2} = \\lambda^2 (dx^2+dy^2)\\) where \\(\\lambda(r) = \\frac{2}{1-r^2}\\). As \\(r \\to 1^-\\), \\(\\lambda \\to \\infty\\), confirming that the boundary is infinitely far away in the hyperbolic metric.'
                },
                {
                    question: 'Compute the hyperbolic distance from the origin to the point \\((r, 0)\\) in the Poincare disk model, for \\(0 < r < 1\\).',
                    hint: 'The path \\(\\gamma(t) = (t, 0)\\) for \\(t \\in [0, r]\\) is a geodesic (diameter). Integrate \\(\\int_0^r \\lambda(t) \\, dt\\).',
                    solution: 'Along the geodesic \\(\\gamma(t) = (t,0)\\): \\(d_{\\text{hyp}}(0, (r,0)) = \\int_0^r \\frac{2}{1-t^2}\\,dt = \\int_0^r \\left(\\frac{1}{1-t} + \\frac{1}{1+t}\\right)dt = \\ln\\frac{1+r}{1-r} = 2\\,\\text{arctanh}(r)\\). As \\(r \\to 1\\), this diverges to \\(\\infty\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Lengths & Distances
        // ================================================================
        {
            id: 'sec-lengths-distances',
            title: 'Lengths & Distances',
            content: `
<h2>Lengths of Curves and Riemannian Distance</h2>

<h3>Length of a Tangent Vector</h3>

<p>Given a Riemannian manifold \\((M, g)\\), the <strong>length</strong> (or norm) of a tangent vector \\(v \\in T_pM\\) is</p>
\\[
|v|_g = \\sqrt{g_p(v, v)}.
\\]
<p>The <strong>angle</strong> between two nonzero vectors \\(v, w \\in T_pM\\) is</p>
\\[
\\cos \\alpha = \\frac{g_p(v, w)}{|v|_g \\, |w|_g}.
\\]

<h3>Length of a Curve</h3>

<div class="env-block definition">
    <div class="env-title">Definition 14.4 (Length of a Curve)</div>
    <div class="env-body">
        <p>Let \\(\\gamma : [a, b] \\to M\\) be a piecewise smooth curve. Its <strong>length</strong> is</p>
        \\[
        L(\\gamma) = \\int_a^b |\\gamma'(t)|_g \\, dt = \\int_a^b \\sqrt{g_{\\gamma(t)}(\\gamma'(t), \\gamma'(t))} \\, dt.
        \\]
        <p>In local coordinates \\(\\gamma(t) = (x^1(t), \\ldots, x^n(t))\\):</p>
        \\[
        L(\\gamma) = \\int_a^b \\sqrt{g_{ij}(\\gamma(t)) \\, \\dot{x}^i(t) \\, \\dot{x}^j(t)} \\, dt.
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Length on the Sphere</div>
    <div class="env-body">
        <p>A curve of constant latitude \\(\\theta = \\theta_0\\) parametrized by \\(\\gamma(t) = (\\theta_0, t)\\) for \\(t \\in [0, 2\\pi]\\):</p>
        \\[
        L = \\int_0^{2\\pi} \\sqrt{0 + \\sin^2\\!\\theta_0 \\cdot 1} \\, dt = 2\\pi \\sin \\theta_0.
        \\]
        <p>At the equator (\\(\\theta_0 = \\pi/2\\)), \\(L = 2\\pi\\). At latitude \\(\\theta_0 = \\pi/6\\) (near the pole), \\(L = \\pi\\). This confirms that lines of latitude shrink toward the poles.</p>
    </div>
</div>

<h3>Riemannian Distance</h3>

<div class="env-block definition">
    <div class="env-title">Definition 14.5 (Riemannian Distance)</div>
    <div class="env-body">
        <p>The <strong>Riemannian distance</strong> between two points \\(p, q \\in M\\) is</p>
        \\[
        d(p, q) = \\inf\\{L(\\gamma) : \\gamma \\text{ is a piecewise smooth curve from } p \\text{ to } q\\}.
        \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.6 (Metric Space Structure)</div>
    <div class="env-body">
        <p>The Riemannian distance \\(d\\) makes \\((M, d)\\) into a metric space. Moreover, the metric space topology coincides with the manifold topology.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Positivity and symmetry are immediate. The triangle inequality follows from the fact that concatenating curves gives a curve whose length is the sum. The key nontrivial fact is \\(d(p,q) = 0 \\implies p = q\\): this uses the positive definiteness of \\(g\\) and a comparison with Euclidean distance in a chart.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 14.7 (Geodesic)</div>
    <div class="env-body">
        <p>A curve \\(\\gamma\\) that locally minimizes length (more precisely, is a critical point of the length functional) is called a <strong>geodesic</strong>. Geodesics are the "straightest possible curves" on a Riemannian manifold. We will study them in detail in Chapter 16.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Hyperbolic Distance</div>
    <div class="env-body">
        <p>In the Poincare half-plane model, the distance between \\((x_1, y_1)\\) and \\((x_2, y_2)\\) is</p>
        \\[
        d((x_1,y_1),(x_2,y_2)) = \\operatorname{arcosh}\\!\\left(1 + \\frac{(x_1-x_2)^2 + (y_1-y_2)^2}{2y_1 y_2}\\right).
        \\]
        <p>In particular, \\(d((0,1),(0,y)) = |\\ln y|\\) for \\(y > 0\\).</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Compute the length of the curve \\(\\gamma(t) = (\\cos t, \\sin t)\\) for \\(t \\in [0, 2\\pi]\\) in \\(\\mathbb{R}^2\\) with the metric \\(g = 4\\,dx^2 + dy^2\\). Compare with the Euclidean length.',
                    hint: 'Compute \\(\\dot{x} = -\\sin t\\), \\(\\dot{y} = \\cos t\\), then integrate \\(\\sqrt{4\\sin^2 t + \\cos^2 t}\\).',
                    solution: 'We have \\(L = \\int_0^{2\\pi} \\sqrt{4\\sin^2 t + \\cos^2 t}\\,dt = \\int_0^{2\\pi} \\sqrt{1 + 3\\sin^2 t}\\,dt\\). This is an elliptic integral, approximately \\(8.36\\). The Euclidean length (with \\(g_{ij} = \\delta_{ij}\\)) is \\(2\\pi \\approx 6.28\\). The stretched metric in the \\(x\\)-direction makes the curve longer.'
                },
                {
                    question: 'In the Poincare half-plane, compute the hyperbolic length of the Euclidean straight line segment from \\((0, 1)\\) to \\((1, 1)\\) (a horizontal segment at height \\(y=1\\)). Then compute the length of the geodesic (semicircle) connecting the same two points. Which is shorter?',
                    hint: 'For the horizontal segment, parametrize as \\(\\gamma(t) = (t, 1)\\) for \\(t \\in [0,1]\\). For the semicircle, parametrize as \\(\\gamma(t) = (1/2 + (1/2)\\cos t, (1/2)\\sin t)\\) for \\(t \\in [0, \\pi]\\)... but be careful, the geodesic is the semicircle centered at \\((1/2, 0)\\) with radius \\(1/\\sqrt{2}\\). Actually, use the distance formula.',
                    solution: 'Horizontal segment: \\(L = \\int_0^1 \\frac{|\\dot{\\gamma}|}{y}dt = \\int_0^1 \\frac{1}{1}dt = 1\\). The geodesic is the semicircle centered at \\((1/2, 0)\\) with radius \\(\\sqrt{1/4 + 1} = \\sqrt{5}/2\\). Using the distance formula: \\(d = \\operatorname{arcosh}(1 + 1/2) = \\operatorname{arcosh}(3/2) \\approx 0.962\\). The geodesic is shorter, as expected.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Isometries & Local Isometries
        // ================================================================
        {
            id: 'sec-isometries',
            title: 'Isometries & Local Isometries',
            content: `
<h2>Isometries and Local Isometries</h2>

<div class="env-block definition">
    <div class="env-title">Definition 14.8 (Isometry)</div>
    <div class="env-body">
        <p>Let \\((M, g)\\) and \\((N, h)\\) be Riemannian manifolds. A diffeomorphism \\(F : M \\to N\\) is an <strong>isometry</strong> if it preserves the metric:</p>
        \\[
        F^*h = g,
        \\]
        <p>i.e., for all \\(p \\in M\\) and \\(v, w \\in T_pM\\):</p>
        \\[
        h_{F(p)}(dF_p(v), dF_p(w)) = g_p(v, w).
        \\]
        <p>If such an \\(F\\) exists, we say \\((M,g)\\) and \\((N,h)\\) are <strong>isometric</strong>, and write \\((M,g) \\cong (N,h)\\).</p>
    </div>
</div>

<p>An isometry preserves all geometric quantities: lengths, angles, areas, curvature. Two isometric Riemannian manifolds are geometrically indistinguishable.</p>

<div class="env-block definition">
    <div class="env-title">Definition 14.9 (Local Isometry)</div>
    <div class="env-body">
        <p>A smooth map \\(F : (M, g) \\to (N, h)\\) is a <strong>local isometry</strong> if for every \\(p \\in M\\) there exists a neighborhood \\(U\\) of \\(p\\) such that \\(F|_U : U \\to F(U)\\) is an isometry. Equivalently, \\(F^*h = g\\) (without requiring \\(F\\) to be a diffeomorphism).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Cylinder is Locally Isometric to the Plane</div>
    <div class="env-body">
        <p>The map \\(F : \\mathbb{R}^2 \\to S^1 \\times \\mathbb{R}\\) defined by \\(F(u,v) = (\\cos u, \\sin u, v)\\) is a local isometry from the Euclidean plane to the cylinder (with its induced metric). The cylinder and the plane have the same local geometry (both have zero Gaussian curvature), even though they are globally different.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Isometries of the Euclidean Plane</div>
    <div class="env-body">
        <p>The isometry group of \\((\\mathbb{R}^2, g_{\\text{Eucl}})\\) consists of translations, rotations, and reflections (and their compositions). This is the Euclidean group \\(E(2) = O(2) \\ltimes \\mathbb{R}^2\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Isometries of the Hyperbolic Plane</div>
    <div class="env-body">
        <p>The isometry group of the Poincare disk is \\(PSL(2, \\mathbb{R})\\), the group of Mobius transformations preserving the unit disk. These are maps of the form \\(z \\mapsto e^{i\\theta}\\frac{z - a}{1 - \\bar{a}z}\\) for \\(|a| < 1\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.10 (Isometries Preserve Geodesics)</div>
    <div class="env-body">
        <p>If \\(F : (M, g) \\to (N, h)\\) is an isometry and \\(\\gamma\\) is a geodesic in \\(M\\), then \\(F \\circ \\gamma\\) is a geodesic in \\(N\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-isometry-demo"></div>
`,
            visualizations: [
                {
                    id: 'viz-isometry-demo',
                    title: 'Isometric Surfaces: Same Geometry, Different Shape',
                    description: 'A flat sheet and a cylinder have the same intrinsic geometry (both have zero Gaussian curvature). The cylinder is obtained by rolling the sheet without stretching. Geodesics on the plane become helices on the cylinder.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 1
                        });

                        var bendAmount = 0;
                        VizEngine.createSlider(controls, 'Bend', 0, 1, bendAmount, 0.02, function(v) { bendAmount = v; });

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Isometry: Flat Sheet \u2192 Cylinder', viz.width / 2, 18, viz.colors.white, 15);

                            var W = 200, H = 200;
                            var cx = viz.width / 2, cy = viz.height / 2 + 10;
                            var gridN = 10;

                            // Bend parameter: 0 = flat, 1 = full cylinder
                            var totalAngle = bendAmount * 2 * Math.PI;
                            var radius = totalAngle > 0.01 ? W / totalAngle : 1e6;

                            function map3D(u, v) {
                                // u in [0, W], v in [0, H]
                                // Flat: (u - W/2, v - H/2, 0)
                                // Bent: wrap u around circle of radius
                                var angle = (u / W) * totalAngle - totalAngle / 2;
                                var x, z;
                                if (totalAngle < 0.01) {
                                    x = u - W / 2;
                                    z = 0;
                                } else {
                                    x = radius * Math.sin(angle);
                                    z = radius * (Math.cos(angle) - 1);
                                }
                                var y = v - H / 2;
                                return { x: x, y: y, z: z };
                            }

                            // Simple orthographic projection with slight tilt
                            function proj(p3) {
                                var tiltX = 0.3;
                                var tiltY = 0.15;
                                var x2 = p3.x * Math.cos(tiltY) + p3.z * Math.sin(tiltY);
                                var z2 = -p3.x * Math.sin(tiltY) + p3.z * Math.cos(tiltY);
                                var y2 = p3.y * Math.cos(tiltX) - z2 * Math.sin(tiltX);
                                var z3 = p3.y * Math.sin(tiltX) + z2 * Math.cos(tiltX);
                                return { sx: cx + x2, sy: cy - y2, depth: z3 };
                            }

                            // Draw grid lines
                            var steps = 40;
                            // u-lines (horizontal on flat sheet)
                            for (var i = 0; i <= gridN; i++) {
                                var v = i * H / gridN;
                                ctx.strokeStyle = viz.colors.blue + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var s = 0; s <= steps; s++) {
                                    var u = s * W / steps;
                                    var p3 = map3D(u, v);
                                    var pp = proj(p3);
                                    if (!started) { ctx.moveTo(pp.sx, pp.sy); started = true; }
                                    else ctx.lineTo(pp.sx, pp.sy);
                                }
                                ctx.stroke();
                            }
                            // v-lines (vertical on flat sheet)
                            for (var j = 0; j <= gridN; j++) {
                                var u2 = j * W / gridN;
                                ctx.strokeStyle = viz.colors.teal + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var s2 = 0; s2 <= steps; s2++) {
                                    var v2 = s2 * H / steps;
                                    var p3b = map3D(u2, v2);
                                    var ppb = proj(p3b);
                                    if (s2 === 0) ctx.moveTo(ppb.sx, ppb.sy);
                                    else ctx.lineTo(ppb.sx, ppb.sy);
                                }
                                ctx.stroke();
                            }

                            // Draw a diagonal "geodesic" (straight line on flat sheet => helix on cylinder)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var sg = 0; sg <= steps * 2; sg++) {
                                var t = sg / (steps * 2);
                                var ug = t * W;
                                var vg = t * H;
                                var p3g = map3D(ug, vg);
                                var ppg = proj(p3g);
                                if (sg === 0) ctx.moveTo(ppg.sx, ppg.sy);
                                else ctx.lineTo(ppg.sx, ppg.sy);
                            }
                            ctx.stroke();

                            // Labels
                            var shapeLabel = bendAmount < 0.1 ? 'Flat sheet (K = 0)' : bendAmount < 0.9 ? 'Bending... (K = 0)' : 'Cylinder (K = 0)';
                            viz.screenText(shapeLabel, viz.width / 2, viz.height - 45, viz.colors.white, 13);
                            viz.screenText('Orange line: geodesic (straight \u2192 helix)', viz.width / 2, viz.height - 25, viz.colors.orange, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the map \\(F(x, y) = (x + a, y + b)\\) (translation) is an isometry of \\((\\mathbb{R}^2, g_{\\text{Eucl}})\\).',
                    hint: 'Compute \\(dF\\) and verify \\(F^* g_{\\text{Eucl}} = g_{\\text{Eucl}}\\).',
                    solution: 'The differential is \\(dF = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\) (the identity). So \\((F^*g)(v,w) = g(dF \\cdot v, dF \\cdot w) = g(v, w)\\). Hence \\(F^*g = g\\), confirming that translations are isometries.'
                },
                {
                    question: 'The cone \\(z = \\sqrt{x^2 + y^2}\\) (minus the apex) is locally isometric to a flat sector of the plane. What is the opening angle of the sector for a cone of half-angle \\(\\pi/4\\)?',
                    hint: 'If the half-angle of the cone is \\(\\alpha\\), the induced metric in polar coordinates \\((r, \\theta)\\) on the cone is \\(dr^2 + r^2 \\sin^2\\!\\alpha \\, d\\theta^2\\). Compare with the flat metric in polar coordinates \\(d\\rho^2 + \\rho^2 d\\phi^2\\).',
                    solution: 'For half-angle \\(\\alpha = \\pi/4\\), \\(\\sin\\alpha = \\sqrt{2}/2\\). The cone metric is \\(dr^2 + r^2(\\sqrt{2}/2)^2 d\\theta^2 = dr^2 + (r^2/2)d\\theta^2\\). Setting \\(\\rho = r\\) and \\(\\phi = \\theta/\\sqrt{2}\\), this becomes \\(d\\rho^2 + \\rho^2 d\\phi^2\\), the flat metric. The full circle \\(\\theta \\in [0, 2\\pi]\\) maps to \\(\\phi \\in [0, 2\\pi/\\sqrt{2}] = [0, \\sqrt{2}\\pi]\\). The opening angle of the flat sector is \\(\\sqrt{2}\\pi \\approx 4.44\\) radians, or about \\(255°\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to Connections
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>The Road to Curvature</h2>

<p>We now have the ability to measure lengths, angles, and distances on abstract manifolds. But a Riemannian metric alone does not yet tell us how to differentiate vector fields on \\(M\\), or how to compare tangent vectors at different points.</p>

<h3>What We Still Need</h3>

<p>Consider a vector field \\(X\\) along a curve \\(\\gamma(t)\\). To compute \\(X'(t)\\), we need to compare \\(X(\\gamma(t+\\varepsilon))\\) and \\(X(\\gamma(t))\\), but these live in <em>different</em> tangent spaces \\(T_{\\gamma(t+\\varepsilon)}M\\) and \\(T_{\\gamma(t)}M\\). On \\(\\mathbb{R}^n\\), all tangent spaces are canonically identified, so this is easy. On a general manifold, there is no canonical identification; we need a <strong>connection</strong>.</p>

<div class="env-block intuition">
    <div class="env-title">The Key Ideas Ahead</div>
    <div class="env-body">
        <ul>
            <li><strong>Chapter 15 (Connections & Parallel Transport):</strong> A connection provides a rule for "transporting" a tangent vector along a curve, keeping it "parallel." The Levi-Civita connection is the unique connection that is compatible with the metric and torsion-free.</li>
            <li><strong>Chapter 16 (Geodesics & the Exponential Map):</strong> Geodesics are curves whose velocity vectors are parallel-transported along themselves. The exponential map \\(\\exp_p : T_pM \\to M\\) sends a vector to the point reached by the geodesic in that direction.</li>
            <li><strong>Chapter 17 (Curvature Tensors):</strong> The Riemann curvature tensor measures how parallel transport around a loop fails to return a vector to itself. This is the intrinsic notion of curvature, generalizing Gaussian curvature from surfaces to arbitrary dimensions.</li>
        </ul>
    </div>
</div>

<h3>The Fundamental Theorem of Riemannian Geometry</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.11 (Levi-Civita, Preview)</div>
    <div class="env-body">
        <p>On any Riemannian manifold \\((M, g)\\), there exists a unique connection \\(\\nabla\\) (the <strong>Levi-Civita connection</strong>) that is:</p>
        <ol>
            <li><strong>Compatible with \\(g\\):</strong> \\(Xg(Y, Z) = g(\\nabla_X Y, Z) + g(Y, \\nabla_X Z)\\)</li>
            <li><strong>Torsion-free:</strong> \\(\\nabla_X Y - \\nabla_Y X = [X, Y]\\)</li>
        </ol>
        <p>This connection is determined by the <strong>Koszul formula</strong>:</p>
        \\[
        2g(\\nabla_X Y, Z) = Xg(Y,Z) + Yg(X,Z) - Zg(X,Y) + g([X,Y],Z) - g([X,Z],Y) - g([Y,Z],X).
        \\]
    </div>
</div>

<p>The Levi-Civita connection completes the bridge from metric geometry to differential geometry: from the ability to measure, we derive the ability to differentiate and to define curvature. The Riemannian metric is the single piece of extra structure from which <em>all</em> of Riemannian geometry flows.</p>

<div class="viz-placeholder" data-viz="viz-hyperbolic-tiling"></div>
`,
            visualizations: [
                {
                    id: 'viz-hyperbolic-tiling',
                    title: 'Hyperbolic Tiling',
                    description: 'A regular tiling of the hyperbolic plane in the Poincar\u00E9 disk model, reminiscent of Escher\'s Circle Limit woodcuts. All tiles are the same size in the hyperbolic metric, despite appearing to shrink toward the boundary.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 480,
                            originX: 280, originY: 240, scale: 200
                        });

                        var depth = 4;
                        VizEngine.createSlider(controls, 'Depth', 1, 6, depth, 1, function(v) { depth = Math.round(v); });

                        var animPhase = 0;

                        // Mobius transformation on the disk: T_a(z) = (z - a)/(1 - conj(a)*z)
                        function mobiusApply(zr, zi, ar, ai) {
                            // (z - a) / (1 - conj(a)*z)
                            var nr = zr - ar, ni = zi - ai;
                            var dr = 1 - (ar * zr + ai * zi), di = (ai * zr - ar * zi);
                            var denom = dr * dr + di * di;
                            if (denom < 1e-12) return { r: 0, i: 0 };
                            return { r: (nr * dr + ni * di) / denom, i: (ni * dr - nr * di) / denom };
                        }

                        // Reflect a point across a geodesic (circle arc) in the disk
                        // For a {p,q} tiling, we use reflections across sides of the fundamental polygon
                        // Here we do a simpler approach: generate a {5,4} tiling by repeated reflections

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            animPhase = t * 0.0003;

                            viz.screenText('Hyperbolic Tiling in the Poincar\u00E9 Disk', viz.width / 2, 18, viz.colors.white, 15);

                            // Draw the boundary circle
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, 2 * Math.PI);
                            ctx.stroke();

                            // Background fill
                            var grad = ctx.createRadialGradient(viz.originX, viz.originY, 0, viz.originX, viz.originY, viz.scale);
                            grad.addColorStop(0, '#0c0c2088');
                            grad.addColorStop(1, '#0c0c20dd');
                            ctx.fillStyle = grad;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, 2 * Math.PI);
                            ctx.fill();

                            // Generate a {7,3} tiling approximation using concentric geodesic polygons
                            // Simpler approach: draw geodesic arcs from center creating a rosette pattern

                            var p = 7; // p-gon
                            var nRings = depth;
                            var baseColors = [
                                viz.colors.blue, viz.colors.teal, viz.colors.purple,
                                viz.colors.orange, viz.colors.green, viz.colors.red, viz.colors.yellow
                            ];

                            // Draw central polygon
                            var centralR = 0.3;
                            var rotation = animPhase;

                            function drawHypPolygon(centerR, centerAngle, polyR, sides, ringIdx) {
                                // Position of polygon center in disk
                                var cx2 = centerR * Math.cos(centerAngle);
                                var cy2 = centerR * Math.sin(centerAngle);

                                var vertices = [];
                                for (var v = 0; v < sides; v++) {
                                    var angle = rotation + 2 * Math.PI * v / sides;
                                    var vr = cx2 + polyR * Math.cos(angle);
                                    var vi = cy2 + polyR * Math.sin(angle);
                                    // Clamp to disk
                                    var rr = Math.sqrt(vr * vr + vi * vi);
                                    if (rr > 0.98) { vr *= 0.98 / rr; vi *= 0.98 / rr; }
                                    vertices.push([vr, vi]);
                                }

                                // Draw the polygon
                                var col = baseColors[ringIdx % baseColors.length];
                                ctx.fillStyle = col + '33';
                                ctx.strokeStyle = col + 'aa';
                                ctx.lineWidth = 1.2;
                                ctx.beginPath();
                                for (var vv = 0; vv <= sides; vv++) {
                                    var vtx = vertices[vv % sides];
                                    var sp = [viz.originX + vtx[0] * viz.scale, viz.originY - vtx[1] * viz.scale];
                                    if (vv === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();
                            }

                            // Central polygon
                            drawHypPolygon(0, 0, centralR, p, 0);

                            // Rings of polygons
                            for (var ring = 1; ring <= nRings; ring++) {
                                var nPoly = p * ring;
                                var ringR = centralR * 2 * ring / (1 + centralR * centralR * ring * ring * 0.3);
                                // Adjust polygon size with ring (smaller as we go out)
                                var polySize = centralR / (1 + ring * 0.8);

                                for (var pi = 0; pi < nPoly; pi++) {
                                    var polyAngle = rotation + 2 * Math.PI * pi / nPoly + (ring % 2) * Math.PI / nPoly;
                                    var pr = ringR;
                                    if (pr > 0.95) continue;
                                    drawHypPolygon(pr, polyAngle, polySize, p, ring);
                                }
                            }

                            // Draw geodesic lines radiating from center
                            ctx.globalAlpha = 0.4;
                            for (var gi = 0; gi < p; gi++) {
                                var gAngle = rotation + 2 * Math.PI * gi / p;
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 0.8;
                                ctx.beginPath();
                                var sp1 = [viz.originX, viz.originY];
                                var endR = 0.97;
                                var sp2 = [viz.originX + endR * Math.cos(gAngle) * viz.scale, viz.originY - endR * Math.sin(gAngle) * viz.scale];
                                ctx.moveTo(sp1[0], sp1[1]);
                                ctx.lineTo(sp2[0], sp2[1]);
                                ctx.stroke();
                            }
                            ctx.globalAlpha = 1;

                            // Labels
                            viz.screenText('All tiles have equal hyperbolic area', viz.width / 2, viz.height - 25, viz.colors.text, 11);
                            viz.screenText('{7,3} tiling approximation', viz.width / 2, viz.height - 45, viz.colors.teal, 12);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the Levi-Civita connection of the Euclidean metric \\(g = \\delta_{ij}dx^i dx^j\\) on \\(\\mathbb{R}^n\\) has all Christoffel symbols equal to zero: \\(\\Gamma^k_{ij} = 0\\).',
                    hint: 'The Christoffel symbols are \\(\\Gamma^k_{ij} = \\frac{1}{2}g^{kl}(\\partial_i g_{jl} + \\partial_j g_{il} - \\partial_l g_{ij})\\). What happens when \\(g_{ij}\\) is constant?',
                    solution: 'Since \\(g_{ij} = \\delta_{ij}\\) is constant, all partial derivatives \\(\\partial_l g_{ij} = 0\\). Therefore \\(\\Gamma^k_{ij} = \\frac{1}{2}\\delta^{kl}(0 + 0 - 0) = 0\\). Covariant differentiation reduces to ordinary partial differentiation, and geodesics are straight lines.'
                },
                {
                    question: 'The flat torus \\(T^2 = \\mathbb{R}^2 / \\mathbb{Z}^2\\) inherits the Euclidean metric from \\(\\mathbb{R}^2\\). It is a compact Riemannian manifold with zero curvature. Explain why \\(T^2\\) cannot be isometrically embedded in \\(\\mathbb{R}^3\\) (as a smooth surface) with this flat metric.',
                    hint: 'Think about the Gauss-Bonnet theorem for compact surfaces. What does \\(K = 0\\) everywhere imply about the integral \\(\\int K\\,dA\\)?',
                    solution: 'By the Gauss-Bonnet theorem, \\(\\int_{T^2} K\\,dA = 2\\pi\\chi(T^2) = 2\\pi \\cdot 0 = 0\\). This is consistent with \\(K = 0\\). However, any smooth embedding of a torus in \\(\\mathbb{R}^3\\) must have regions of positive and negative curvature (the "outside" of the doughnut has \\(K > 0\\), the "inside" has \\(K < 0\\)). A flat torus cannot be smoothly embedded in \\(\\mathbb{R}^3\\) because the embedding would induce nonzero Gaussian curvature. (It can be embedded in \\(\\mathbb{R}^4\\) as \\((\\cos\\theta, \\sin\\theta, \\cos\\phi, \\sin\\phi)\\).)'
                }
            ]
        }
    ]
});
