window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Tangent Spaces & Vector Fields',
    subtitle: 'Vectors on manifolds: derivations, pushforwards, and flows',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Tangent Spaces?</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Problem</div>
    <div class="env-body">
        <p>On \\(\\mathbb{R}^n\\), vectors are arrows rooted at a point. You can add them, scale them, and differentiate functions along them without thinking twice. But on a sphere, or a torus, or any curved manifold, there is no ambient space to host those arrows. Where do "vectors" live?</p>
        <p>The answer: at each point \\(p\\) of a smooth manifold \\(M\\), there is a vector space \\(T_pM\\) called the <strong>tangent space</strong>. It consists of all directions in which you can move from \\(p\\) while staying on \\(M\\). This chapter makes that idea precise.</p>
    </div>
</div>

<p>In Chapter 11, we defined smooth manifolds and showed how charts provide local coordinates. Now we need the infinitesimal counterpart: the notion of "direction" at a point. The tangent space is the right abstraction for several reasons:</p>

<ul>
    <li><strong>Calculus on manifolds.</strong> Derivatives of functions \\(f: M \\to \\mathbb{R}\\) need a "direction" to differentiate along. That direction is a tangent vector.</li>
    <li><strong>Physics.</strong> Velocity, momentum, force, and electromagnetic fields are all tangent vectors or closely related objects (covectors, tensors). The tangent space is where physics happens.</li>
    <li><strong>Geometry.</strong> Curvature, geodesics, and parallel transport are all built on the tangent bundle \\(TM = \\bigsqcup_p T_pM\\).</li>
</ul>

<h3>From Surfaces to Manifolds</h3>

<p>For a regular surface \\(S \\subset \\mathbb{R}^3\\) (Chapters 3-10), the tangent plane at \\(p\\) is literally a 2-dimensional affine plane in \\(\\mathbb{R}^3\\) touching \\(S\\) at \\(p\\). If \\(\\mathbf{x}(u,v)\\) is a parametrization, the tangent plane is spanned by \\(\\mathbf{x}_u(p)\\) and \\(\\mathbf{x}_v(p)\\).</p>

<p>For abstract manifolds, there is no ambient \\(\\mathbb{R}^N\\). We need an <em>intrinsic</em> definition. There are three equivalent approaches, and understanding all three is essential:</p>

<ol>
    <li><strong>Geometric:</strong> velocity vectors of curves through \\(p\\).</li>
    <li><strong>Algebraic:</strong> derivations on the algebra of smooth functions at \\(p\\).</li>
    <li><strong>Coordinate-based:</strong> equivalence classes of coordinate representations.</li>
</ol>

<p>Each perspective illuminates something different. The curve approach is the most intuitive. The derivation approach is the most powerful (it generalizes to algebra and algebraic geometry). The coordinate approach is the most computational.</p>

<div class="env-block remark">
    <div class="env-title">Notation</div>
    <div class="env-body">
        <p>Throughout this chapter, \\(M\\) and \\(N\\) are smooth manifolds of dimensions \\(m\\) and \\(n\\), respectively. We write \\(C^\\infty(M)\\) for the algebra of smooth real-valued functions on \\(M\\). Charts are denoted \\((U, \\varphi)\\) with local coordinates \\((x^1, \\ldots, x^m)\\).</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Tangent Vectors as Derivations
        // ================================================================
        {
            id: 'sec-tangent-vectors',
            title: 'Tangent Vectors as Derivations',
            content: `
<h2>Tangent Vectors as Derivations</h2>

<h3>Approach 1: Velocity Vectors of Curves</h3>

<div class="env-block definition">
    <div class="env-title">Definition 12.1 (Tangent Vector via Curves)</div>
    <div class="env-body">
        <p>Let \\(M\\) be a smooth manifold and \\(p \\in M\\). A <strong>curve through \\(p\\)</strong> is a smooth map \\(\\gamma: (-\\varepsilon, \\varepsilon) \\to M\\) with \\(\\gamma(0) = p\\). Two curves \\(\\gamma_1, \\gamma_2\\) through \\(p\\) are <strong>tangent at \\(p\\)</strong> if for some (hence every) chart \\((U, \\varphi)\\) around \\(p\\),</p>
        \\[
        \\frac{d}{dt}\\bigg|_{t=0} (\\varphi \\circ \\gamma_1)(t) = \\frac{d}{dt}\\bigg|_{t=0} (\\varphi \\circ \\gamma_2)(t).
        \\]
        <p>A <strong>tangent vector</strong> at \\(p\\) is an equivalence class of curves tangent at \\(p\\).</p>
    </div>
</div>

<p>The key insight: the condition "for some, hence every" chart is well-defined because if two curves have the same velocity in one coordinate system, the chain rule guarantees they have the same velocity in any other.</p>

<h3>Approach 2: Derivations</h3>

<p>Instead of curves, we can characterize tangent vectors by <em>what they do</em> to smooth functions. A tangent vector "differentiates" functions at a point.</p>

<div class="env-block definition">
    <div class="env-title">Definition 12.2 (Derivation at a Point)</div>
    <div class="env-body">
        <p>A <strong>derivation at \\(p\\)</strong> is a linear map \\(v: C^\\infty(M) \\to \\mathbb{R}\\) satisfying the <strong>Leibniz rule</strong>:</p>
        \\[
        v(fg) = f(p)\\,v(g) + g(p)\\,v(f), \\quad \\forall f, g \\in C^\\infty(M).
        \\]
        <p>The <strong>tangent space</strong> \\(T_pM\\) is the set of all derivations at \\(p\\). It is a real vector space under pointwise operations: \\((v + w)(f) = v(f) + w(f)\\) and \\((\\lambda v)(f) = \\lambda \\cdot v(f)\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Partial Derivatives</div>
    <div class="env-body">
        <p>On \\(\\mathbb{R}^n\\) with standard coordinates \\((x^1, \\ldots, x^n)\\), the operator</p>
        \\[
        \\frac{\\partial}{\\partial x^i}\\bigg|_p : f \\mapsto \\frac{\\partial f}{\\partial x^i}(p)
        \\]
        <p>is a derivation at \\(p\\). It satisfies linearity (it is a linear map) and the Leibniz rule (the product rule for partial derivatives). The \\(n\\) operators \\(\\partial/\\partial x^1|_p, \\ldots, \\partial/\\partial x^n|_p\\) form a <strong>basis</strong> for \\(T_p\\mathbb{R}^n\\).</p>
    </div>
</div>

<h3>Approach 3: Chart-Based Definition</h3>

<div class="env-block definition">
    <div class="env-title">Definition 12.3 (Chart-Based Tangent Vector)</div>
    <div class="env-body">
        <p>Given a chart \\((U, \\varphi)\\) around \\(p\\) with coordinates \\((x^1, \\ldots, x^m)\\), a tangent vector can be identified with an \\(m\\)-tuple \\((v^1, \\ldots, v^m) \\in \\mathbb{R}^m\\) via</p>
        \\[
        v = \\sum_{i=1}^{m} v^i \\frac{\\partial}{\\partial x^i}\\bigg|_p.
        \\]
        <p>Under a change of charts \\((U, \\varphi) \\to (V, \\psi)\\) with \\(\\psi \\circ \\varphi^{-1}: (x^i) \\mapsto (y^j)\\), the components transform as</p>
        \\[
        w^j = \\sum_{i=1}^{m} \\frac{\\partial y^j}{\\partial x^i}(\\varphi(p))\\, v^i.
        \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.1 (Equivalence of Definitions)</div>
    <div class="env-body">
        <p>The three definitions of \\(T_pM\\) are naturally isomorphic. Specifically:</p>
        <ul>
            <li>A curve \\(\\gamma\\) through \\(p\\) induces a derivation \\(v_\\gamma(f) = (f \\circ \\gamma)'(0)\\).</li>
            <li>Every derivation at \\(p\\) arises from some curve.</li>
            <li>In local coordinates, the derivation \\(v_\\gamma\\) has components \\(v^i = (x^i \\circ \\gamma)'(0)\\).</li>
        </ul>
        <p>In particular, \\(\\dim T_pM = \\dim M\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why Derivations Win</div>
    <div class="env-body">
        <p>The derivation definition is preferred in modern differential geometry because it is purely algebraic, makes no reference to curves or coordinates, and generalizes immediately to other settings (e.g., algebraic geometry, where one works with polynomial rings instead of \\(C^\\infty\\)). The Leibniz rule alone pins down the correct vector space.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-tangent-space-manifold"></div>
`,
            visualizations: [
                {
                    id: 'viz-tangent-space-manifold',
                    title: 'Tangent Space at a Point on a Surface',
                    description: 'The tangent plane at a point \\(p\\) on a surface, shown with velocity vectors of several curves through \\(p\\). Drag the point to move it along the surface and watch the tangent plane tilt.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 250, scale: 50
                        });

                        // Surface: z = cos(x)*cos(y) (a "wavy" surface)
                        // We do pseudo-3D with oblique projection
                        var angleH = 0.5; // horizontal viewing angle
                        var px = 0.5, py = 0.3; // point on surface (in parameter space)

                        function surfZ(x, y) {
                            return 1.2 * Math.cos(x * 0.9) * Math.cos(y * 0.9);
                        }
                        function surfDx(x, y) {
                            return -1.2 * 0.9 * Math.sin(x * 0.9) * Math.cos(y * 0.9);
                        }
                        function surfDy(x, y) {
                            return -1.2 * 0.9 * Math.cos(x * 0.9) * Math.sin(y * 0.9);
                        }

                        // Oblique projection: (x, y, z) -> (screen_x, screen_y)
                        function project(x, y, z) {
                            var sx = x - 0.4 * y;
                            var sy = -z + 0.3 * y;
                            return [sx, sy];
                        }

                        var drag = viz.addDraggable('pt', 0, 0, viz.colors.orange, 8);
                        // We'll map drag position to px, py

                        function draw() {
                            // Map draggable position to surface parameter
                            px = drag.x * 0.7;
                            py = drag.y * 0.5;

                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw wireframe surface
                            var gridN = 20;
                            var range = 3.2;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.7;

                            // u-lines
                            for (var j = 0; j <= gridN; j++) {
                                var v = -range + 2 * range * j / gridN;
                                ctx.beginPath();
                                for (var i = 0; i <= gridN * 2; i++) {
                                    var u = -range + 2 * range * i / (gridN * 2);
                                    var z = surfZ(u, v);
                                    var pr = project(u, v, z);
                                    var sp = viz.toScreen(pr[0], pr[1]);
                                    if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }
                            // v-lines
                            for (var ii = 0; ii <= gridN; ii++) {
                                var u2 = -range + 2 * range * ii / gridN;
                                ctx.beginPath();
                                for (var jj = 0; jj <= gridN * 2; jj++) {
                                    var v2 = -range + 2 * range * jj / (gridN * 2);
                                    var z2 = surfZ(u2, v2);
                                    var pr2 = project(u2, v2, z2);
                                    var sp2 = viz.toScreen(pr2[0], pr2[1]);
                                    if (jj === 0) ctx.moveTo(sp2[0], sp2[1]);
                                    else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.stroke();
                            }

                            // Point on surface
                            var pz = surfZ(px, py);
                            var pProj = project(px, py, pz);
                            var pScreen = viz.toScreen(pProj[0], pProj[1]);

                            // Tangent plane: span of (1, 0, dz/dx) and (0, 1, dz/dy)
                            var dzx = surfDx(px, py);
                            var dzy = surfDy(px, py);

                            // Draw tangent plane as a semi-transparent quad
                            var planeSize = 1.4;
                            var corners = [
                                [-planeSize, -planeSize],
                                [planeSize, -planeSize],
                                [planeSize, planeSize],
                                [-planeSize, planeSize]
                            ];
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.strokeStyle = viz.colors.blue + '66';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            for (var ci = 0; ci < 4; ci++) {
                                var du = corners[ci][0], dv = corners[ci][1];
                                var cx3 = px + du;
                                var cy3 = py + dv;
                                var cz3 = pz + dzx * du + dzy * dv;
                                var cpr = project(cx3, cy3, cz3);
                                var csp = viz.toScreen(cpr[0], cpr[1]);
                                if (ci === 0) ctx.moveTo(csp[0], csp[1]);
                                else ctx.lineTo(csp[0], csp[1]);
                            }
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Draw curves through p and their velocity vectors
                            var curves = [
                                { color: viz.colors.teal, dir: [1, 0] },
                                { color: viz.colors.orange, dir: [0, 1] },
                                { color: viz.colors.purple, dir: [1, 1] }
                            ];

                            for (var k = 0; k < curves.length; k++) {
                                var c = curves[k];
                                var dx = c.dir[0], dy = c.dir[1];
                                var dlen = Math.sqrt(dx * dx + dy * dy);
                                dx /= dlen; dy /= dlen;

                                // Draw curve on surface
                                ctx.strokeStyle = c.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var cSteps = 40;
                                for (var s = -cSteps; s <= cSteps; s++) {
                                    var t = s / cSteps * 1.8;
                                    var cx2 = px + t * dx;
                                    var cy2 = py + t * dy;
                                    var cz2 = surfZ(cx2, cy2);
                                    var cpr2 = project(cx2, cy2, cz2);
                                    var csp2 = viz.toScreen(cpr2[0], cpr2[1]);
                                    if (s === -cSteps) ctx.moveTo(csp2[0], csp2[1]);
                                    else ctx.lineTo(csp2[0], csp2[1]);
                                }
                                ctx.stroke();

                                // Velocity vector in tangent plane
                                var vScale = 1.2;
                                var vx = dx * vScale;
                                var vy = dy * vScale;
                                var vz = (dzx * dx + dzy * dy) * vScale;
                                var endPr = project(px + vx, py + vy, pz + vz);
                                var endSp = viz.toScreen(endPr[0], endPr[1]);

                                // Arrow
                                ctx.strokeStyle = c.color;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(pScreen[0], pScreen[1]);
                                ctx.lineTo(endSp[0], endSp[1]);
                                ctx.stroke();

                                // Arrowhead
                                var adx = endSp[0] - pScreen[0];
                                var ady = endSp[1] - pScreen[1];
                                var aAngle = Math.atan2(ady, adx);
                                ctx.fillStyle = c.color;
                                ctx.beginPath();
                                ctx.moveTo(endSp[0], endSp[1]);
                                ctx.lineTo(endSp[0] - 10 * Math.cos(aAngle - 0.4), endSp[1] - 10 * Math.sin(aAngle - 0.4));
                                ctx.lineTo(endSp[0] - 10 * Math.cos(aAngle + 0.4), endSp[1] - 10 * Math.sin(aAngle + 0.4));
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Draw the point
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(pScreen[0], pScreen[1], 6, 0, Math.PI * 2);
                            ctx.fill();

                            // Update draggable position to match projected point
                            drag.x = pProj[0];
                            drag.y = pProj[1];

                            // Labels
                            viz.screenText('p', pScreen[0] + 12, pScreen[1] - 12, viz.colors.white, 14);
                            viz.screenText('T\u209aM', pScreen[0] + 20, pScreen[1] - 30, viz.colors.blue, 13);

                            // Legend
                            viz.screenText('\u03B3\u2081(t)', 20, viz.height - 60, viz.colors.teal, 12, 'left');
                            viz.screenText('\u03B3\u2082(t)', 20, viz.height - 42, viz.colors.orange, 12, 'left');
                            viz.screenText('\u03B3\u2083(t)', 20, viz.height - 24, viz.colors.purple, 12, 'left');
                            viz.screenText('Drag the point to move it on the surface', viz.width / 2, viz.height - 8, viz.colors.text, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(M = \\mathbb{R}^2\\) and \\(p = (1, 2)\\). Consider the curve \\(\\gamma(t) = (1 + 2t, 2 - t)\\). Compute the derivation \\(v_\\gamma\\) applied to \\(f(x, y) = x^2 y\\).',
                    hint: 'Compute \\(v_\\gamma(f) = (f \\circ \\gamma)\'(0)\\). First write \\(f(\\gamma(t)) = (1+2t)^2(2-t)\\), then differentiate at \\(t = 0\\).',
                    solution: '\\(f(\\gamma(t)) = (1+2t)^2(2-t)\\). Expanding: \\((1+4t+4t^2)(2-t) = 2 + 7t + 4t^2 - 4t^3\\). So \\(v_\\gamma(f) = 7\\). Alternatively, \\(v_\\gamma = 2\\partial_x - \\partial_y\\) at \\((1,2)\\), and \\(\\partial_x(x^2y) = 2xy = 4\\), \\(\\partial_y(x^2y) = x^2 = 1\\). Thus \\(v_\\gamma(f) = 2(4) + (-1)(1) = 7\\).'
                },
            ]
        },

        // ================================================================
        // SECTION 3: The Tangent Bundle TM
        // ================================================================
        {
            id: 'sec-tangent-bundle',
            title: 'The Tangent Bundle TM',
            content: `
<h2>The Tangent Bundle \\(TM\\)</h2>

<div class="env-block intuition">
    <div class="env-title">Collecting All Tangent Spaces</div>
    <div class="env-body">
        <p>At each point \\(p \\in M\\), we have the vector space \\(T_pM\\). The tangent bundle \\(TM\\) is the disjoint union of all these spaces, assembled into a single smooth manifold. A point in \\(TM\\) is a pair \\((p, v)\\) where \\(p \\in M\\) and \\(v \\in T_pM\\). This is the natural habitat of vector fields.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 12.4 (Tangent Bundle)</div>
    <div class="env-body">
        <p>The <strong>tangent bundle</strong> of a smooth \\(m\\)-manifold \\(M\\) is</p>
        \\[
        TM = \\bigsqcup_{p \\in M} T_pM = \\{(p, v) : p \\in M, \\, v \\in T_pM\\}.
        \\]
        <p>The <strong>projection map</strong> \\(\\pi: TM \\to M\\) sends \\((p, v) \\mapsto p\\). The fiber \\(\\pi^{-1}(p) = T_pM\\) is a vector space isomorphic to \\(\\mathbb{R}^m\\).</p>
    </div>
</div>

<h3>Smooth Structure on \\(TM\\)</h3>

<p>If \\((U, \\varphi)\\) is a chart on \\(M\\) with coordinates \\((x^1, \\ldots, x^m)\\), we get a chart on \\(TM\\):</p>

\\[
\\widetilde{\\varphi}: \\pi^{-1}(U) \\to \\mathbb{R}^{2m}, \\quad
(p, v) \\mapsto (x^1(p), \\ldots, x^m(p), v^1, \\ldots, v^m)
\\]

<p>where \\(v = \\sum_i v^i \\,\\partial/\\partial x^i|_p\\). These charts make \\(TM\\) a smooth \\(2m\\)-dimensional manifold.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.2 (TM is a Smooth Manifold)</div>
    <div class="env-body">
        <p>If \\(M\\) is a smooth \\(m\\)-manifold, then \\(TM\\) is a smooth \\(2m\\)-dimensional manifold, and \\(\\pi: TM \\to M\\) is a smooth surjection. Moreover, \\(TM\\) has the structure of a <strong>vector bundle</strong> of rank \\(m\\) over \\(M\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(T\\mathbb{R}^n \\cong \\mathbb{R}^{2n}\\)</div>
    <div class="env-body">
        <p>Since \\(T_p\\mathbb{R}^n \\cong \\mathbb{R}^n\\) at every point, the tangent bundle \\(T\\mathbb{R}^n = \\mathbb{R}^n \\times \\mathbb{R}^n = \\mathbb{R}^{2n}\\). This is the simplest possible case: the bundle is "trivial" (a product).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(TS^1\\) is Trivial</div>
    <div class="env-body">
        <p>At each point of the circle \\(S^1\\), the tangent space is a line (1-dimensional). The tangent bundle \\(TS^1 \\cong S^1 \\times \\mathbb{R}\\), which is an infinite cylinder. This is again trivial.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(TS^2\\) is Nontrivial</div>
    <div class="env-body">
        <p>The tangent bundle \\(TS^2\\) of the 2-sphere is <strong>not</strong> trivial: \\(TS^2 \\not\\cong S^2 \\times \\mathbb{R}^2\\). We will see the topological reason shortly (the hairy ball theorem).</p>
    </div>
</div>

<h3>Sections of the Tangent Bundle</h3>

<div class="env-block definition">
    <div class="env-title">Definition 12.5 (Section / Vector Field)</div>
    <div class="env-body">
        <p>A <strong>section</strong> of the tangent bundle is a smooth map \\(X: M \\to TM\\) such that \\(\\pi \\circ X = \\operatorname{id}_M\\). In other words, \\(X\\) assigns to each point \\(p\\) a tangent vector \\(X(p) \\in T_pM\\). A section is also called a <strong>vector field</strong> on \\(M\\).</p>
    </div>
</div>

<p>The set of all smooth vector fields on \\(M\\) is denoted \\(\\mathfrak{X}(M)\\). It is a \\(C^\\infty(M)\\)-module: you can multiply a vector field by a smooth function and add vector fields.</p>

<div class="viz-placeholder" data-viz="viz-tangent-bundle"></div>
`,
            visualizations: [
                {
                    id: 'viz-tangent-bundle',
                    title: 'The Tangent Bundle \\(TM\\)',
                    description: 'Visualizing the tangent bundle: at each point of the base manifold (a curve or surface), the tangent space is attached as a fiber. The total space \\(TM\\) is the union of all these fibers. Use the slider to rotate the view.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 320, scale: 40
                        });

                        var viewAngle = 0;
                        VizEngine.createSlider(controls, 'Rotate', 0, 6.28, 0, 0.05, function(v) {
                            viewAngle = v;
                        });

                        // We visualize TS^1 as a cylinder
                        // Base: circle in the xy-plane
                        // Fiber: vertical line at each point

                        viz.animate(function(time) {
                            var t = time * 0.0003 + viewAngle;
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = viz.height * 0.55;

                            // Draw the cylinder (tangent bundle of S^1)
                            var rBase = 120; // radius of base circle
                            var fiberH = 140; // half-height of fibers
                            var nPts = 60;

                            // Back fibers (behind the circle)
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var i = 0; i < nPts; i++) {
                                var theta = 2 * Math.PI * i / nPts;
                                var ex = Math.cos(theta + t);
                                var ey = Math.sin(theta + t) * 0.35;
                                if (Math.sin(theta + t) > 0) continue; // front, skip for now
                                var sx = cx + rBase * ex;
                                var sy = cy + rBase * ey;
                                ctx.beginPath();
                                ctx.moveTo(sx, sy - fiberH);
                                ctx.lineTo(sx, sy + fiberH);
                                ctx.stroke();
                            }

                            // Base circle (back half)
                            ctx.strokeStyle = viz.colors.blue + '66';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i2 = 0; i2 <= nPts; i2++) {
                                var theta2 = 2 * Math.PI * i2 / nPts;
                                if (Math.sin(theta2 + t) > 0.05) continue;
                                var ex2 = Math.cos(theta2 + t);
                                var ey2 = Math.sin(theta2 + t) * 0.35;
                                var sx2 = cx + rBase * ex2;
                                var sy2 = cy + rBase * ey2;
                                if (i2 === 0 || Math.sin(2 * Math.PI * (i2 - 1) / nPts + t) > 0.05) ctx.moveTo(sx2, sy2);
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Front fibers
                            ctx.strokeStyle = viz.colors.purple + '44';
                            ctx.lineWidth = 0.8;
                            for (var i3 = 0; i3 < nPts; i3++) {
                                var theta3 = 2 * Math.PI * i3 / nPts;
                                var ex3 = Math.cos(theta3 + t);
                                var ey3 = Math.sin(theta3 + t) * 0.35;
                                if (Math.sin(theta3 + t) <= 0) continue;
                                var sx3 = cx + rBase * ex3;
                                var sy3 = cy + rBase * ey3;
                                ctx.beginPath();
                                ctx.moveTo(sx3, sy3 - fiberH);
                                ctx.lineTo(sx3, sy3 + fiberH);
                                ctx.stroke();
                            }

                            // Base circle (front half)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var started = false;
                            for (var i4 = 0; i4 <= nPts; i4++) {
                                var theta4 = 2 * Math.PI * i4 / nPts;
                                if (Math.sin(theta4 + t) < -0.05) { started = false; continue; }
                                var ex4 = Math.cos(theta4 + t);
                                var ey4 = Math.sin(theta4 + t) * 0.35;
                                var sx4 = cx + rBase * ex4;
                                var sy4 = cy + rBase * ey4;
                                if (!started) { ctx.moveTo(sx4, sy4); started = true; }
                                else ctx.lineTo(sx4, sy4);
                            }
                            ctx.stroke();

                            // Highlight one fiber with a vector
                            var highlightTheta = time * 0.0008;
                            var hx = Math.cos(highlightTheta + t);
                            var hy = Math.sin(highlightTheta + t) * 0.35;
                            var hsx = cx + rBase * hx;
                            var hsy = cy + rBase * hy;

                            // The fiber line
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(hsx, hsy - fiberH);
                            ctx.lineTo(hsx, hsy + fiberH);
                            ctx.stroke();

                            // A vector in the fiber (a section value)
                            var vecVal = 60 * Math.sin(highlightTheta * 1.3);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(hsx, hsy);
                            ctx.lineTo(hsx, hsy - vecVal);
                            ctx.stroke();

                            // Arrowhead
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            var ay2 = hsy - vecVal;
                            var adir = vecVal > 0 ? -1 : 1;
                            ctx.moveTo(hsx, ay2);
                            ctx.lineTo(hsx - 5, ay2 + adir * 10);
                            ctx.lineTo(hsx + 5, ay2 + adir * 10);
                            ctx.closePath();
                            ctx.fill();

                            // Point on base
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(hsx, hsy, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Labels
                            viz.screenText('TS\u00B9 \u2245 S\u00B9 \u00D7 \u211D  (a cylinder)', viz.width / 2, 22, viz.colors.white, 14);
                            viz.screenText('S\u00B9 (base)', cx + rBase + 30, cy + 10, viz.colors.blue, 12, 'left');
                            viz.screenText('T\u209aS\u00B9 (fiber)', hsx + 15, hsy - fiberH / 2, viz.colors.teal, 11, 'left');
                            viz.screenText('X(p)', hsx + 10, hsy - vecVal / 2, viz.colors.orange, 11, 'left');
                            viz.screenText('\u03C0', hsx + 6, hsy + 15, viz.colors.text, 11, 'left');
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is the dimension of \\(TM\\) as a smooth manifold when \\(M\\) has dimension \\(m\\)?',
                    hint: 'Each point of \\(TM\\) is specified by a point in \\(M\\) (\\(m\\) coordinates) and a tangent vector (\\(m\\) more coordinates).',
                    solution: '\\(\\dim TM = 2m\\). In a chart \\((U, \\varphi)\\) on \\(M\\), a point of \\(TM\\) above \\(U\\) has coordinates \\((x^1, \\ldots, x^m, v^1, \\ldots, v^m)\\).'
                },
            ]
        },

        // ================================================================
        // SECTION 4: The Pushforward
        // ================================================================
        {
            id: 'sec-pushforward',
            title: 'The Pushforward',
            content: `
<h2>The Pushforward (Differential)</h2>

<div class="env-block intuition">
    <div class="env-title">Transporting Tangent Vectors</div>
    <div class="env-body">
        <p>If \\(F: M \\to N\\) is a smooth map and \\(v \\in T_pM\\) is a tangent vector at \\(p\\), we want to "push" \\(v\\) forward to a tangent vector at \\(F(p) \\in N\\). The pushforward \\(dF_p\\) (also written \\(F_{*,p}\\) or \\(DF_p\\)) does exactly this. It is the manifold version of the Jacobian matrix from multivariable calculus.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 12.6 (Pushforward / Differential)</div>
    <div class="env-body">
        <p>Let \\(F: M \\to N\\) be a smooth map and \\(p \\in M\\). The <strong>pushforward</strong> (or <strong>differential</strong>) of \\(F\\) at \\(p\\) is the linear map</p>
        \\[
        dF_p: T_pM \\to T_{F(p)}N
        \\]
        <p>defined by: for a derivation \\(v \\in T_pM\\) and \\(g \\in C^\\infty(N)\\),</p>
        \\[
        (dF_p(v))(g) = v(g \\circ F).
        \\]
    </div>
</div>

<p>In other words, to apply the pushed-forward vector \\(dF_p(v)\\) to a function \\(g\\) on \\(N\\), we pull \\(g\\) back to \\(M\\) via composition and let \\(v\\) act on it.</p>

<div class="env-block example">
    <div class="env-title">Example: Pushforward in Coordinates</div>
    <div class="env-body">
        <p>Let \\(F: \\mathbb{R}^m \\to \\mathbb{R}^n\\) be smooth, with \\(F(x) = (F^1(x), \\ldots, F^n(x))\\). Then</p>
        \\[
        dF_p\\left(\\frac{\\partial}{\\partial x^i}\\bigg|_p\\right) = \\sum_{j=1}^{n} \\frac{\\partial F^j}{\\partial x^i}(p) \\,\\frac{\\partial}{\\partial y^j}\\bigg|_{F(p)}.
        \\]
        <p>The matrix \\(\\left(\\partial F^j / \\partial x^i\\right)\\) is precisely the <strong>Jacobian matrix</strong> of \\(F\\) at \\(p\\).</p>
    </div>
</div>

<h3>Key Properties of the Pushforward</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.3 (Properties of the Differential)</div>
    <div class="env-body">
        <p>Let \\(F: M \\to N\\) and \\(G: N \\to P\\) be smooth maps.</p>
        <ol>
            <li><strong>Linearity:</strong> \\(dF_p\\) is a linear map from \\(T_pM\\) to \\(T_{F(p)}N\\).</li>
            <li><strong>Chain rule:</strong> \\(d(G \\circ F)_p = dG_{F(p)} \\circ dF_p\\).</li>
            <li><strong>Identity:</strong> \\(d(\\operatorname{id}_M)_p = \\operatorname{id}_{T_pM}\\).</li>
            <li><strong>Diffeomorphism:</strong> If \\(F\\) is a diffeomorphism, then \\(dF_p\\) is an isomorphism for every \\(p\\).</li>
        </ol>
    </div>
</div>

<p>The chain rule is the most important property. It says the tangent map of a composition is the composition of tangent maps. In coordinates, this is just the chain rule for Jacobian matrices.</p>

<div class="env-block example">
    <div class="env-title">Example: Pushforward of a Curve's Velocity</div>
    <div class="env-body">
        <p>If \\(\\gamma: (-\\varepsilon, \\varepsilon) \\to M\\) is a curve with \\(\\gamma(0) = p\\) and velocity \\(v = \\gamma'(0) \\in T_pM\\), then</p>
        \\[
        dF_p(v) = (F \\circ \\gamma)'(0) \\in T_{F(p)}N.
        \\]
        <p>The pushforward sends the velocity of \\(\\gamma\\) to the velocity of the image curve \\(F \\circ \\gamma\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-pushforward"></div>
`,
            visualizations: [
                {
                    id: 'viz-pushforward',
                    title: 'The Pushforward: Mapping Tangent Vectors',
                    description: 'A smooth map \\(F\\) sends points of \\(M\\) to points of \\(N\\), and the pushforward \\(dF_p\\) sends tangent vectors at \\(p\\) to tangent vectors at \\(F(p)\\). Watch how a tangent vector transforms under the map.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 140, originY: 190, scale: 55
                        });

                        var tParam = 0;
                        VizEngine.createSlider(controls, 'Point t', -2.5, 2.5, 0, 0.1, function(v) {
                            tParam = v;
                        });

                        // M is a curve: gamma(t) = (t, sin(t))
                        // F maps R^2 -> R^2: F(x,y) = (x + y, x*y) (a nonlinear map)
                        // We show M on the left, N = F(M) on the right

                        viz.animate(function(time) {
                            viz.clear();
                            var ctx = viz.ctx;

                            var leftCX = 130, rightCX = 430;
                            var cY = 190;
                            var sc = 45;

                            // --- Domain M (left) ---
                            viz.screenText('M', leftCX, 25, viz.colors.blue, 16);

                            // Draw axes for M
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(leftCX - 100, cY); ctx.lineTo(leftCX + 100, cY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(leftCX, cY - 100); ctx.lineTo(leftCX, cY + 100); ctx.stroke();

                            // Draw the curve on M
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = -30; i <= 30; i++) {
                                var tt = i * 0.1;
                                var mx = tt, my = Math.sin(tt);
                                var sx = leftCX + mx * sc, sy = cY - my * sc;
                                if (i === -30) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Point on M
                            var px_m = tParam, py_m = Math.sin(tParam);
                            var psx = leftCX + px_m * sc, psy = cY - py_m * sc;
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(psx, psy, 5, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('p', psx + 8, psy - 10, viz.colors.white, 12, 'left');

                            // Tangent vector on M: gamma'(t) = (1, cos(t))
                            var tvx_m = 1, tvy_m = Math.cos(tParam);
                            var tvLen = Math.sqrt(tvx_m * tvx_m + tvy_m * tvy_m);
                            var arrowScale = 0.8;
                            var endsx = psx + tvx_m * sc * arrowScale;
                            var endsy = psy - tvy_m * sc * arrowScale;

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(psx, psy); ctx.lineTo(endsx, endsy); ctx.stroke();
                            var ang = Math.atan2(endsy - psy, endsx - psx);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.moveTo(endsx, endsy);
                            ctx.lineTo(endsx - 10 * Math.cos(ang - 0.4), endsy - 10 * Math.sin(ang - 0.4));
                            ctx.lineTo(endsx - 10 * Math.cos(ang + 0.4), endsy - 10 * Math.sin(ang + 0.4));
                            ctx.closePath(); ctx.fill();
                            viz.screenText('v', endsx + 6, endsy - 6, viz.colors.teal, 12, 'left');

                            // --- Arrow F: M -> N ---
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1.5;
                            var arrowMidX = (leftCX + rightCX) / 2;
                            ctx.beginPath(); ctx.moveTo(leftCX + 110, cY - 80); ctx.lineTo(rightCX - 110, cY - 80); ctx.stroke();
                            var fAng = 0;
                            ctx.fillStyle = viz.colors.text;
                            ctx.beginPath();
                            ctx.moveTo(rightCX - 110, cY - 80);
                            ctx.lineTo(rightCX - 120, cY - 86);
                            ctx.lineTo(rightCX - 120, cY - 74);
                            ctx.closePath(); ctx.fill();
                            viz.screenText('F', arrowMidX, cY - 92, viz.colors.white, 14);

                            // dF_p arrow below
                            ctx.strokeStyle = viz.colors.orange + '88';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(leftCX + 110, cY + 80); ctx.lineTo(rightCX - 110, cY + 80); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange + '88';
                            ctx.beginPath();
                            ctx.moveTo(rightCX - 110, cY + 80);
                            ctx.lineTo(rightCX - 120, cY + 74);
                            ctx.lineTo(rightCX - 120, cY + 86);
                            ctx.closePath(); ctx.fill();
                            viz.screenText('dF\u209a', arrowMidX, cY + 68, viz.colors.orange, 13);

                            // --- Codomain N (right) ---
                            viz.screenText('N', rightCX, 25, viz.colors.purple, 16);

                            // F(x,y) = (x + 0.5*y, 0.5*x^2 - y)
                            function mapF(x, y) {
                                return [x + 0.5 * y, 0.5 * x * x - y];
                            }

                            // Draw axes for N
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(rightCX - 110, cY); ctx.lineTo(rightCX + 110, cY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rightCX, cY - 120); ctx.lineTo(rightCX, cY + 120); ctx.stroke();

                            // Draw image curve
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var j = -30; j <= 30; j++) {
                                var tt2 = j * 0.1;
                                var mx2 = tt2, my2 = Math.sin(tt2);
                                var fp = mapF(mx2, my2);
                                var sx2 = rightCX + fp[0] * sc * 0.6;
                                var sy2 = cY - fp[1] * sc * 0.6;
                                if (j === -30) ctx.moveTo(sx2, sy2);
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Image point F(p)
                            var fp0 = mapF(px_m, py_m);
                            var fpsx = rightCX + fp0[0] * sc * 0.6;
                            var fpsy = cY - fp0[1] * sc * 0.6;
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath(); ctx.arc(fpsx, fpsy, 5, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('F(p)', fpsx + 8, fpsy - 10, viz.colors.white, 12, 'left');

                            // Pushforward: dF_p(v) = Jacobian * v
                            // Jacobian of F(x,y) = (x + 0.5*y, 0.5*x^2 - y):
                            // [[1, 0.5], [x, -1]]
                            var J00 = 1, J01 = 0.5, J10 = px_m, J11 = -1;
                            var pfx = J00 * tvx_m + J01 * tvy_m;
                            var pfy = J10 * tvx_m + J11 * tvy_m;
                            var pfEndsx = fpsx + pfx * sc * 0.6 * arrowScale;
                            var pfEndsy = fpsy - pfy * sc * 0.6 * arrowScale;

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(fpsx, fpsy); ctx.lineTo(pfEndsx, pfEndsy); ctx.stroke();
                            var ang2 = Math.atan2(pfEndsy - fpsy, pfEndsx - fpsx);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(pfEndsx, pfEndsy);
                            ctx.lineTo(pfEndsx - 10 * Math.cos(ang2 - 0.4), pfEndsy - 10 * Math.sin(ang2 - 0.4));
                            ctx.lineTo(pfEndsx - 10 * Math.cos(ang2 + 0.4), pfEndsy - 10 * Math.sin(ang2 + 0.4));
                            ctx.closePath(); ctx.fill();
                            viz.screenText('dF\u209a(v)', pfEndsx + 6, pfEndsy - 6, viz.colors.orange, 12, 'left');

                            // Footer
                            viz.screenText('F(x,y) = (x + \u00BDy, \u00BDx\u00B2 \u2212 y)', viz.width / 2, viz.height - 10, viz.colors.text, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(F: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) be given by \\(F(x,y) = (x^2 - y^2, 2xy)\\) (the map \\(z \\mapsto z^2\\) in complex coordinates). Compute \\(dF_{(1,1)}\\) and apply it to the vector \\(v = 3\\partial_x - \\partial_y\\).',
                    hint: 'The Jacobian is \\(\\begin{pmatrix} 2x & -2y \\\\ 2y & 2x \\end{pmatrix}\\). Evaluate at \\((1,1)\\) and multiply by \\((3, -1)^T\\).',
                    solution: 'The Jacobian at \\((1,1)\\) is \\(\\begin{pmatrix} 2 & -2 \\\\ 2 & 2 \\end{pmatrix}\\). So \\(dF_{(1,1)}(v) = \\begin{pmatrix} 2 & -2 \\\\ 2 & 2 \\end{pmatrix}\\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ 4 \\end{pmatrix}\\), i.e., \\(dF_{(1,1)}(v) = 8\\partial_u + 4\\partial_v\\) at \\(F(1,1) = (0, 2)\\).'
                },
                {
                    question: 'Let \\(F: \\mathbb{R}^2 \\to \\mathbb{R}\\) be \\(F(x,y) = x^2 + y^2\\). Describe the pushforward \\(dF_{(0,0)}: T_{(0,0)}\\mathbb{R}^2 \\to T_0\\mathbb{R}\\). Is it surjective?',
                    hint: 'Compute the Jacobian at the origin. What happens to all tangent vectors?',
                    solution: 'The Jacobian is \\((2x, 2y)\\). At \\((0,0)\\), this is \\((0, 0)\\). So \\(dF_{(0,0)}(v) = 0\\) for all \\(v\\). The pushforward is the zero map, hence not surjective. This reflects the fact that \\((0,0)\\) is a critical point of \\(F\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Vector Fields
        // ================================================================
        {
            id: 'sec-vector-fields',
            title: 'Vector Fields',
            content: `
<h2>Vector Fields and the Lie Bracket</h2>

<div class="env-block definition">
    <div class="env-title">Definition 12.7 (Vector Field)</div>
    <div class="env-body">
        <p>A <strong>smooth vector field</strong> on \\(M\\) is a smooth section \\(X: M \\to TM\\) of the tangent bundle. In local coordinates \\((x^1, \\ldots, x^m)\\),</p>
        \\[
        X = \\sum_{i=1}^{m} X^i(x)\\,\\frac{\\partial}{\\partial x^i},
        \\]
        <p>where \\(X^i: U \\to \\mathbb{R}\\) are smooth functions (the <strong>component functions</strong>).</p>
    </div>
</div>

<p>A vector field assigns a tangent vector to every point, smoothly. Geometrically, think of a wind pattern on the Earth's surface, or a velocity field of a fluid. Algebraically, a vector field is a <strong>derivation on \\(C^\\infty(M)\\)</strong>:</p>

\\[
X: C^\\infty(M) \\to C^\\infty(M), \\quad (Xf)(p) = X_p(f).
\\]

<p>This is a derivation of the algebra \\(C^\\infty(M)\\) (as opposed to a derivation <em>at a point</em>).</p>

<h3>The Lie Bracket</h3>

<p>Given two vector fields \\(X, Y\\), the composition \\(X \\circ Y\\) (applying \\(Y\\) first, then \\(X\\)) is <em>not</em> a vector field: it involves second derivatives and violates the Leibniz rule. However, the commutator \\(XY - YX\\) miraculously cancels all second-order terms and is again a vector field.</p>

<div class="env-block definition">
    <div class="env-title">Definition 12.8 (Lie Bracket)</div>
    <div class="env-body">
        <p>The <strong>Lie bracket</strong> of two smooth vector fields \\(X, Y \\in \\mathfrak{X}(M)\\) is the vector field \\([X, Y]\\) defined by</p>
        \\[
        [X, Y](f) = X(Y(f)) - Y(X(f)), \\quad \\forall f \\in C^\\infty(M).
        \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.4 (Lie Bracket in Coordinates)</div>
    <div class="env-body">
        <p>If \\(X = \\sum_i X^i \\partial_i\\) and \\(Y = \\sum_j Y^j \\partial_j\\), then</p>
        \\[
        [X, Y] = \\sum_{k} \\left(\\sum_i X^i \\frac{\\partial Y^k}{\\partial x^i} - Y^i \\frac{\\partial X^k}{\\partial x^i}\\right) \\frac{\\partial}{\\partial x^k}.
        \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.5 (Properties of the Lie Bracket)</div>
    <div class="env-body">
        <p>For all \\(X, Y, Z \\in \\mathfrak{X}(M)\\) and \\(f, g \\in C^\\infty(M)\\):</p>
        <ol>
            <li><strong>Bilinearity:</strong> \\([aX + bY, Z] = a[X, Z] + b[Y, Z]\\) over \\(\\mathbb{R}\\).</li>
            <li><strong>Antisymmetry:</strong> \\([X, Y] = -[Y, X]\\).</li>
            <li><strong>Jacobi identity:</strong> \\([X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0\\).</li>
            <li><strong>\\(C^\\infty\\)-Leibniz:</strong> \\([fX, gY] = fg[X, Y] + f(Xg)Y - g(Yf)X\\).</li>
        </ol>
        <p>Properties 1-3 make \\(\\mathfrak{X}(M)\\) a <strong>Lie algebra</strong>.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Coordinate Vector Fields Commute</div>
    <div class="env-body">
        <p>For coordinate vector fields \\(\\partial/\\partial x^i\\) and \\(\\partial/\\partial x^j\\),</p>
        \\[
        \\left[\\frac{\\partial}{\\partial x^i}, \\frac{\\partial}{\\partial x^j}\\right] = 0
        \\]
        <p>because partial derivatives commute (Clairaut's theorem). This is actually a characterization: a local frame \\((E_1, \\ldots, E_m)\\) comes from some coordinate system if and only if \\([E_i, E_j] = 0\\) for all \\(i, j\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-vector-field-flow"></div>

<div class="viz-placeholder" data-viz="viz-lie-bracket"></div>
`,
            visualizations: [
                {
                    id: 'viz-vector-field-flow',
                    title: 'Vector Field and Its Flow',
                    description: 'A vector field on \\(\\mathbb{R}^2\\) with its integral curves animated. The flow lines show the trajectories particles would follow. Choose different vector fields to see their qualitative behavior.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 40
                        });

                        var fieldType = 0;
                        var fields = [
                            { name: 'Rotation: (-y, x)', fn: function(x, y) { return [-y, x]; } },
                            { name: 'Source: (x, y)', fn: function(x, y) { return [x, y]; } },
                            { name: 'Saddle: (x, -y)', fn: function(x, y) { return [x, -y]; } },
                            { name: 'Spiral: (-y+x/3, x+y/3)', fn: function(x, y) { return [-y + x / 3, x + y / 3]; } },
                            { name: 'Nonlinear: (y, -sin(x))', fn: function(x, y) { return [y, -Math.sin(x)]; } }
                        ];

                        var selectDiv = document.createElement('div');
                        selectDiv.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';
                        for (var fi = 0; fi < fields.length; fi++) {
                            (function(idx) {
                                var btn = VizEngine.createButton(selectDiv, fields[idx].name, function() {
                                    fieldType = idx;
                                });
                                if (idx === 0) btn.style.borderColor = viz.colors.blue;
                            })(fi);
                        }
                        controls.appendChild(selectDiv);

                        // Particles for flow
                        var nParticles = 80;
                        var particles = [];
                        function resetParticles() {
                            particles = [];
                            for (var i = 0; i < nParticles; i++) {
                                particles.push({
                                    x: (Math.random() - 0.5) * 10,
                                    y: (Math.random() - 0.5) * 8,
                                    age: Math.random() * 200
                                });
                            }
                        }
                        resetParticles();

                        viz.animate(function(time) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var field = fields[fieldType].fn;

                            // Draw vector field arrows
                            var gridStep = 1.0;
                            var xMin = -6, xMax = 6, yMin = -4.5, yMax = 4.5;
                            for (var gx = xMin; gx <= xMax; gx += gridStep) {
                                for (var gy = yMin; gy <= yMax; gy += gridStep) {
                                    var v = field(gx, gy);
                                    var vlen = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
                                    if (vlen < 0.01) continue;
                                    var maxLen = 0.4;
                                    var scale2 = Math.min(maxLen, vlen * 0.3) / vlen;
                                    var dx = v[0] * scale2, dy = v[1] * scale2;

                                    var sp1 = viz.toScreen(gx, gy);
                                    var sp2 = viz.toScreen(gx + dx, gy + dy);

                                    ctx.strokeStyle = viz.colors.blue + '55';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(sp1[0], sp1[1]);
                                    ctx.lineTo(sp2[0], sp2[1]);
                                    ctx.stroke();

                                    // small arrowhead
                                    var aa = Math.atan2(sp2[1] - sp1[1], sp2[0] - sp1[0]);
                                    ctx.fillStyle = viz.colors.blue + '55';
                                    ctx.beginPath();
                                    ctx.moveTo(sp2[0], sp2[1]);
                                    ctx.lineTo(sp2[0] - 5 * Math.cos(aa - 0.5), sp2[1] - 5 * Math.sin(aa - 0.5));
                                    ctx.lineTo(sp2[0] - 5 * Math.cos(aa + 0.5), sp2[1] - 5 * Math.sin(aa + 0.5));
                                    ctx.closePath(); ctx.fill();
                                }
                            }

                            // Animate particles along flow
                            var dt = 0.02;
                            for (var pi = 0; pi < particles.length; pi++) {
                                var p = particles[pi];
                                var vv = field(p.x, p.y);
                                p.x += vv[0] * dt;
                                p.y += vv[1] * dt;
                                p.age++;

                                // Reset if out of bounds or too old
                                if (Math.abs(p.x) > 8 || Math.abs(p.y) > 6 || p.age > 300) {
                                    p.x = (Math.random() - 0.5) * 10;
                                    p.y = (Math.random() - 0.5) * 8;
                                    p.age = 0;
                                }

                                var alpha = Math.min(1, p.age / 30) * Math.max(0, 1 - p.age / 300);
                                var sp = viz.toScreen(p.x, p.y);
                                ctx.fillStyle = 'rgba(63,185,160,' + alpha.toFixed(2) + ')';
                                ctx.beginPath();
                                ctx.arc(sp[0], sp[1], 2, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            viz.screenText(fields[fieldType].name, viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('Particles follow the flow (integral curves)', viz.width / 2, viz.height - 10, viz.colors.text, 11);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-lie-bracket',
                    title: 'The Lie Bracket: Measuring Non-Commutativity of Flows',
                    description: 'The Lie bracket \\([X,Y]\\) measures the failure of the flows of \\(X\\) and \\(Y\\) to commute. Flow along \\(X\\) for time \\(\\varepsilon\\), then \\(Y\\) for \\(\\varepsilon\\), vs. \\(Y\\) then \\(X\\). The gap is \\(\\approx \\varepsilon^2 [X,Y]\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 210, scale: 80
                        });

                        var eps = 0.6;
                        VizEngine.createSlider(controls, '\u03B5 (flow time)', 0.1, 1.2, 0.6, 0.05, function(v) {
                            eps = v;
                        });

                        // X = (1, x), Y = (0, 1)
                        // [X, Y] = X(Y) - Y(X) => [X,Y]^k = X^i dY^k/dx^i - Y^i dX^k/dx^i
                        // X = (1, x): X^1=1, X^2=x
                        // Y = (0, 1): Y^1=0, Y^2=1
                        // [X,Y]^1 = 1*0 - 0*0 + x*0 - 1*0 = 0  (wait, let me recompute)
                        // [X,Y]^1 = X^i dY^1/dx^i - Y^i dX^1/dx^i = 1*0 + x*0 - 0*0 - 1*0 = 0
                        // [X,Y]^2 = X^i dY^2/dx^i - Y^i dX^2/dx^i = 1*0 + x*0 - 0*1 - 1*0 = 0... hmm
                        // Let me pick X = (1, 0), Y = (0, x). Then:
                        // [X,Y]^1 = 1*0 + 0*0 - 0*0 - x*0 = 0
                        // [X,Y]^2 = 1*dY^2/dx + 0*dY^2/dy - 0*dX^2/dx - x*dX^2/dy = 1*1 - 0 = 1
                        // So [X,Y] = (0, 1) = d/dy. Good!

                        // Flow of X=(1,0): phi_t(x,y) = (x+t, y)
                        // Flow of Y=(0,x): psi_t(x,y) = (x, y + t*x)

                        function flowX(x, y, t) { return [x + t, y]; }
                        function flowY(x, y, t) { return [x, y + t * x]; }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.drawGrid(1);
                            viz.drawAxes();

                            var startX = -1, startY = -0.5;

                            // Path 1: X then Y (blue path)
                            var p1 = flowX(startX, startY, eps);
                            var p2 = flowY(p1[0], p1[1], eps);

                            // Path 2: Y then X (orange path)
                            var q1 = flowY(startX, startY, eps);
                            var q2 = flowX(q1[0], q1[1], eps);

                            // Draw path 1: X then Y
                            // X flow (horizontal)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var steps = 30;
                            for (var i = 0; i <= steps; i++) {
                                var tt = eps * i / steps;
                                var pt = flowX(startX, startY, tt);
                                var sp = viz.toScreen(pt[0], pt[1]);
                                if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                else ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.stroke();

                            // Y flow from p1
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i2 = 0; i2 <= steps; i2++) {
                                var tt2 = eps * i2 / steps;
                                var pt2 = flowY(p1[0], p1[1], tt2);
                                var sp2 = viz.toScreen(pt2[0], pt2[1]);
                                if (i2 === 0) ctx.moveTo(sp2[0], sp2[1]);
                                else ctx.lineTo(sp2[0], sp2[1]);
                            }
                            ctx.stroke();

                            // Draw path 2: Y then X
                            // Y flow (depends on x)
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            for (var i3 = 0; i3 <= steps; i3++) {
                                var tt3 = eps * i3 / steps;
                                var pt3 = flowY(startX, startY, tt3);
                                var sp3 = viz.toScreen(pt3[0], pt3[1]);
                                if (i3 === 0) ctx.moveTo(sp3[0], sp3[1]);
                                else ctx.lineTo(sp3[0], sp3[1]);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // X flow from q1
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            for (var i4 = 0; i4 <= steps; i4++) {
                                var tt4 = eps * i4 / steps;
                                var pt4 = flowX(q1[0], q1[1], tt4);
                                var sp4 = viz.toScreen(pt4[0], pt4[1]);
                                if (i4 === 0) ctx.moveTo(sp4[0], sp4[1]);
                                else ctx.lineTo(sp4[0], sp4[1]);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Gap vector (the bracket contribution)
                            var gap = [p2[0] - q2[0], p2[1] - q2[1]];

                            // Draw gap as red arrow
                            if (Math.sqrt(gap[0] * gap[0] + gap[1] * gap[1]) > 0.001) {
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 3;
                                var gsp1 = viz.toScreen(q2[0], q2[1]);
                                var gsp2 = viz.toScreen(p2[0], p2[1]);
                                ctx.beginPath();
                                ctx.moveTo(gsp1[0], gsp1[1]);
                                ctx.lineTo(gsp2[0], gsp2[1]);
                                ctx.stroke();

                                var gAng = Math.atan2(gsp2[1] - gsp1[1], gsp2[0] - gsp1[0]);
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(gsp2[0], gsp2[1]);
                                ctx.lineTo(gsp2[0] - 8 * Math.cos(gAng - 0.4), gsp2[1] - 8 * Math.sin(gAng - 0.4));
                                ctx.lineTo(gsp2[0] - 8 * Math.cos(gAng + 0.4), gsp2[1] - 8 * Math.sin(gAng + 0.4));
                                ctx.closePath(); ctx.fill();
                            }

                            // Draw points
                            viz.drawPoint(startX, startY, viz.colors.white, 'start', 5);
                            viz.drawPoint(p2[0], p2[1], viz.colors.blue, 'X\u2192Y', 4);
                            viz.drawPoint(q2[0], q2[1], viz.colors.orange, 'Y\u2192X', 4);

                            // Labels
                            viz.screenText('X = (1, 0),  Y = (0, x)', viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('[X, Y] = (0, 1) = \u2202/\u2202y', viz.width / 2, 40, viz.colors.red, 12);

                            // Legend
                            viz.screenText('Solid: X then Y', 100, viz.height - 30, viz.colors.blue, 11, 'left');
                            viz.screenText('Dashed: Y then X', 100, viz.height - 14, viz.colors.teal, 11, 'left');
                            viz.screenText('Gap \u2248 \u03B5\u00B2[X,Y]', viz.width - 80, viz.height - 22, viz.colors.red, 12);

                            var gapSize = Math.sqrt(gap[0] * gap[0] + gap[1] * gap[1]);
                            viz.screenText('|gap| = ' + gapSize.toFixed(3) + ',  \u03B5\u00B2 = ' + (eps * eps).toFixed(3), viz.width / 2, viz.height - 10, viz.colors.text, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Lie bracket \\([X, Y]\\) where \\(X = x\\,\\partial_x + y\\,\\partial_y\\) and \\(Y = -y\\,\\partial_x + x\\,\\partial_y\\) on \\(\\mathbb{R}^2\\).',
                    hint: 'Use the coordinate formula. \\(X^1 = x, X^2 = y, Y^1 = -y, Y^2 = x\\). Compute each component \\([X,Y]^k\\).',
                    solution: '\\([X,Y]^1 = x(-1) + y(0) - (-y)(1) - x(0) = -x + y\\). \\([X,Y]^2 = x(0) + y(1) - (-y)(0) - x(1) = y - x\\). So \\([X,Y] = (y-x)\\partial_x + (y-x)\\partial_y = (y-x)(\\partial_x + \\partial_y)\\).'
                },
                {
                    question: 'Verify the Jacobi identity for \\(X = \\partial_x\\), \\(Y = x\\partial_y\\), \\(Z = y\\partial_x\\) on \\(\\mathbb{R}^2\\).',
                    hint: 'First compute all pairwise brackets, then check that \\([X,[Y,Z]] + [Y,[Z,X]] + [Z,[X,Y]] = 0\\).',
                    solution: '\\([Y,Z] = x\\partial_y(y)\\partial_x - y\\partial_x(x)\\partial_y - 0 = x\\partial_x - y\\partial_y\\). Wait, let us be careful. \\([Y,Z]^1 = x \\cdot 1 - y \\cdot 0 = x\\), \\([Y,Z]^2 = x \\cdot 0 - y \\cdot 1 = -y\\). So \\([Y,Z] = x\\partial_x - y\\partial_y\\). Then \\([X, [Y,Z]]^1 = 1 \\cdot 1 - x \\cdot 0 = 1\\), \\([X,[Y,Z]]^2 = 1 \\cdot 0 - (-y) \\cdot 0 = 0\\). Now \\([Z,X]^1 = y \\cdot 0 - 1 \\cdot 0 = 0\\), \\([Z,X]^2 = y \\cdot 0 - 1 \\cdot 0 = 0\\). So \\([Y,[Z,X]] = 0\\). Next \\([X,Y]^1 = 0, [X,Y]^2 = 1\\), so \\([X,Y] = \\partial_y\\). Then \\([Z, [X,Y]]^1 = y \\cdot 0 - 0 = 0\\), \\([Z,[X,Y]]^2 = y \\cdot 0 - 1 \\cdot 0 = 0\\). Hmm, so \\([X,[Y,Z]] = \\partial_x \\neq 0\\) but \\([Y,[Z,X]] + [Z,[X,Y]] = 0\\)? Let me recheck. Actually \\([Z,X]^1 = y \\cdot \\partial_x(0) - 1 \\cdot \\partial_x(y) = 0\\), \\([Z,X]^2 = y \\cdot \\partial_x(0) - 1 \\cdot \\partial_y(0) = 0\\). Hmm, no. \\(Z = y\\partial_x\\), \\(X = \\partial_x\\). \\([Z,X]^k = Z^i \\partial_i X^k - X^i \\partial_i Z^k\\). \\(Z^1 = y, Z^2 = 0\\). \\(X^1 = 1, X^2 = 0\\). \\([Z,X]^1 = y \\cdot 0 + 0 \\cdot 0 - 1 \\cdot 0 - 0 \\cdot 0 = 0\\). \\([Z,X]^2 = y \\cdot 0 - 1 \\cdot 0 = 0\\). So \\([Z,X] = 0\\) and \\([Y,[Z,X]] = 0\\). And \\([X,Y] = \\partial_y\\), \\([Z, \\partial_y]^1 = y \\cdot \\partial_x(0) - 0 \\cdot \\partial_y(y) = 0\\). Wait: \\([Z, \\partial_y]^1 = Z^i \\partial_i (\\partial_y)^1 - (\\partial_y)^i \\partial_i Z^1 = y \\cdot 0 + 0 - 0 - 1 \\cdot 1 = -1\\). So \\([Z, \\partial_y] = -\\partial_x\\). Then the sum is \\(\\partial_x + 0 + (-\\partial_x) = 0\\). Jacobi identity verified.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Flows & Integral Curves
        // ================================================================
        {
            id: 'sec-flows',
            title: 'Flows & Integral Curves',
            content: `
<h2>Flows and Integral Curves</h2>

<div class="env-block intuition">
    <div class="env-title">ODEs on Manifolds</div>
    <div class="env-body">
        <p>A vector field \\(X\\) on \\(M\\) tells you which direction to move at every point. An <strong>integral curve</strong> is a curve that actually follows those directions: at every instant, its velocity equals the vector field. This is the manifold version of solving an ODE \\(\\dot{x} = X(x)\\). The <strong>flow</strong> assembles all integral curves into a single map.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 12.9 (Integral Curve)</div>
    <div class="env-body">
        <p>Let \\(X\\) be a smooth vector field on \\(M\\). An <strong>integral curve</strong> of \\(X\\) starting at \\(p\\) is a smooth curve \\(\\gamma: I \\to M\\) (where \\(I\\) is an interval containing 0) such that</p>
        \\[
        \\gamma(0) = p, \\quad \\gamma'(t) = X_{\\gamma(t)} \\quad \\forall t \\in I.
        \\]
        <p>In local coordinates, this becomes the ODE system</p>
        \\[
        \\frac{dx^i}{dt} = X^i(x^1(t), \\ldots, x^m(t)), \\quad x^i(0) = p^i.
        \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.6 (Existence and Uniqueness)</div>
    <div class="env-body">
        <p>For any smooth vector field \\(X\\) on \\(M\\) and any point \\(p \\in M\\), there exists a unique <strong>maximal</strong> integral curve \\(\\gamma_p: (a_p, b_p) \\to M\\) with \\(\\gamma_p(0) = p\\). The interval \\((a_p, b_p)\\) is the largest interval on which the integral curve is defined.</p>
    </div>
</div>

<h3>The Flow of a Vector Field</h3>

<div class="env-block definition">
    <div class="env-title">Definition 12.10 (Flow)</div>
    <div class="env-body">
        <p>The <strong>flow</strong> of \\(X\\) is the map \\(\\theta: \\mathcal{D} \\to M\\) defined on the <strong>flow domain</strong> \\(\\mathcal{D} = \\{(t, p) : t \\in (a_p, b_p)\\} \\subset \\mathbb{R} \\times M\\) by</p>
        \\[
        \\theta(t, p) = \\gamma_p(t),
        \\]
        <p>where \\(\\gamma_p\\) is the maximal integral curve starting at \\(p\\). We write \\(\\theta_t(p) = \\theta(t, p)\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.7 (Group Property of the Flow)</div>
    <div class="env-body">
        <p>The flow satisfies:</p>
        <ol>
            <li>\\(\\theta_0 = \\operatorname{id}_M\\).</li>
            <li>\\(\\theta_t \\circ \\theta_s = \\theta_{t+s}\\) whenever both sides are defined.</li>
        </ol>
        <p>In particular, for a <strong>complete</strong> vector field (one whose integral curves exist for all \\(t \\in \\mathbb{R}\\)), the flow \\(\\{\\theta_t\\}_{t \\in \\mathbb{R}}\\) is a <strong>one-parameter group of diffeomorphisms</strong> of \\(M\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.8 (Compact Manifolds Have Complete Flows)</div>
    <div class="env-body">
        <p>If \\(M\\) is compact, then every smooth vector field on \\(M\\) is complete. More generally, a compactly supported vector field on any manifold is complete.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Linear Vector Field</div>
    <div class="env-body">
        <p>On \\(\\mathbb{R}^2\\), let \\(X = -y\\,\\partial_x + x\\,\\partial_y\\). The integral curve through \\((x_0, y_0)\\) is</p>
        \\[
        \\gamma(t) = (x_0 \\cos t - y_0 \\sin t, \\; x_0 \\sin t + y_0 \\cos t).
        \\]
        <p>The flow \\(\\theta_t\\) is rotation by angle \\(t\\). Since \\(\\theta_{t+s} = \\theta_t \\circ \\theta_s\\), this is a one-parameter group of rotations.</p>
    </div>
</div>

<h3>The Lie Derivative via Flows</h3>

<p>The flow provides an alternative, geometric definition of the Lie bracket:</p>

\\[
[X, Y]_p = \\lim_{t \\to 0} \\frac{(\\theta_{-t})_* Y_{\\theta_t(p)} - Y_p}{t} = \\left.\\frac{d}{dt}\\right|_{t=0} (\\theta_{-t})_* Y_{\\theta_t(p)},
\\]

<p>where \\(\\theta_t\\) is the flow of \\(X\\). This is the <strong>Lie derivative</strong> \\(\\mathcal{L}_X Y\\), and it equals \\([X, Y]\\). The bracket measures the infinitesimal change in \\(Y\\) as you drag it along the flow of \\(X\\).</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Find the integral curves of \\(X = x\\,\\partial_x + 2y\\,\\partial_y\\) on \\(\\mathbb{R}^2\\). Is \\(X\\) complete?',
                    hint: 'Solve the ODE system \\(\\dot{x} = x\\), \\(\\dot{y} = 2y\\) with initial conditions \\((x_0, y_0)\\).',
                    solution: 'The system decouples: \\(x(t) = x_0 e^t\\), \\(y(t) = y_0 e^{2t}\\). These exist for all \\(t \\in \\mathbb{R}\\), so \\(X\\) is complete. The flow is \\(\\theta_t(x_0, y_0) = (x_0 e^t, y_0 e^{2t})\\). Integral curves are parabolas: eliminating \\(t\\), \\(y = y_0(x/x_0)^2\\), i.e., \\(y \\propto x^2\\).'
                },
                {
                    question: 'Give an example of an incomplete vector field on \\(\\mathbb{R}\\).',
                    hint: 'Consider \\(X = x^2 \\partial_x\\). What happens to the integral curve as \\(t\\) approaches a finite value?',
                    solution: 'Let \\(X = x^2\\,\\partial_x\\). The ODE \\(\\dot{x} = x^2\\) has solution \\(x(t) = x_0/(1 - x_0 t)\\) for \\(x_0 \\neq 0\\). This blows up at \\(t = 1/x_0\\), so the integral curve exists only on \\((-\\infty, 1/x_0)\\) for \\(x_0 > 0\\). The vector field is incomplete because the manifold \\(\\mathbb{R}\\) is not compact.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to What's Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Bridge: From Tangent Vectors to Differential Forms</h2>

<p>We have built the tangent side of the story: tangent vectors, the tangent bundle, the pushforward, vector fields, and their flows. This is the "contravariant" part of calculus on manifolds. The next chapter develops the "covariant" counterpart.</p>

<h3>What We Have Established</h3>

<ul>
    <li>At each point \\(p\\) of a smooth \\(m\\)-manifold \\(M\\), there is an \\(m\\)-dimensional vector space \\(T_pM\\), defined intrinsically via derivations.</li>
    <li>The tangent bundle \\(TM\\) assembles all tangent spaces into a \\(2m\\)-dimensional smooth manifold.</li>
    <li>Smooth maps \\(F: M \\to N\\) induce linear maps \\(dF_p: T_pM \\to T_{F(p)}N\\) that compose via the chain rule.</li>
    <li>Vector fields are sections of \\(TM\\). They form a Lie algebra under the bracket \\([X, Y]\\).</li>
    <li>Each vector field generates a flow, a one-parameter group of diffeomorphisms.</li>
</ul>

<h3>The Cotangent Space</h3>

<p>The <strong>cotangent space</strong> \\(T_p^*M = (T_pM)^*\\) is the dual vector space: linear functionals on tangent vectors. If \\(f \\in C^\\infty(M)\\), then \\(df_p \\in T_p^*M\\) is the covector defined by</p>

\\[
df_p(v) = v(f), \\quad v \\in T_pM.
\\]

<p>In coordinates, \\(df = \\sum_i (\\partial f/\\partial x^i)\\,dx^i\\), where \\(\\{dx^1, \\ldots, dx^m\\}\\) is the basis dual to \\(\\{\\partial/\\partial x^1, \\ldots, \\partial/\\partial x^m\\}\\).</p>

<h3>What Comes Next</h3>

<p>Chapter 13 will develop <strong>differential forms</strong>, the natural objects to integrate on manifolds. A differential \\(k\\)-form is a section of \\(\\Lambda^k(T^*M)\\), the \\(k\\)-th exterior power of the cotangent bundle. This leads to:</p>

<ul>
    <li>The <strong>exterior derivative</strong> \\(d\\), generalizing gradient, curl, and divergence.</li>
    <li><strong>Stokes' theorem</strong> \\(\\int_M d\\omega = \\int_{\\partial M} \\omega\\), the fundamental theorem of calculus on manifolds.</li>
    <li><strong>de Rham cohomology</strong>, connecting differential forms to topology.</li>
</ul>

<p>And later, in Chapters 14-17, we will equip \\(TM\\) with a <strong>Riemannian metric</strong> (an inner product on each tangent space) and a <strong>connection</strong> (a way to parallel-transport tangent vectors). This unlocks the full power of Riemannian geometry: geodesics, curvature, and the interplay between geometry and topology.</p>

<div class="env-block remark">
    <div class="env-title">The Hairy Ball Theorem Revisited</div>
    <div class="env-body">
        <p>A vector field on \\(S^2\\) is a continuous assignment of a tangent vector at each point. The <strong>hairy ball theorem</strong> (Brouwer, 1912) states that every continuous vector field on \\(S^2\\) must vanish somewhere. Equivalently, \\(TS^2\\) is not trivial: you cannot find two everywhere-linearly-independent vector fields on \\(S^2\\). The deeper reason is that the Euler characteristic \\(\\chi(S^2) = 2 \\neq 0\\), and by the Poincare-Hopf theorem, the sum of indices of zeros of any vector field equals \\(\\chi\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-hairy-ball-revisited"></div>
`,
            visualizations: [
                {
                    id: 'viz-hairy-ball-revisited',
                    title: 'The Hairy Ball Theorem on \\(S^2\\)',
                    description: 'Every smooth vector field on \\(S^2\\) must vanish somewhere. This visualization shows a vector field on the sphere that vanishes at the poles (two zeros, each with index +1, summing to \\(\\chi(S^2) = 2\\)).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 1
                        });

                        var rotAngle = 0;
                        VizEngine.createSlider(controls, 'Rotate', 0, 6.28, 0, 0.05, function(v) {
                            rotAngle = v;
                        });

                        var R = 150; // sphere radius in pixels

                        viz.animate(function(time) {
                            var autoRot = time * 0.0003 + rotAngle;
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = viz.height / 2;

                            // Draw sphere wireframe
                            var nLat = 12, nLon = 20;

                            // 3D rotation
                            function rot3D(x, y, z) {
                                var ca = Math.cos(autoRot), sa = Math.sin(autoRot);
                                var x2 = x * ca - z * sa;
                                var z2 = x * sa + z * ca;
                                return [x2, y, z2];
                            }

                            function project3D(x, y, z) {
                                var r = rot3D(x, y, z);
                                return [cx + r[0] * R, cy - r[1] * R, r[2]];
                            }

                            // Draw longitude lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var lon = 0; lon < nLon; lon++) {
                                var phi = 2 * Math.PI * lon / nLon;
                                ctx.beginPath();
                                var prevVis = false;
                                for (var lt = 0; lt <= 40; lt++) {
                                    var theta = Math.PI * lt / 40;
                                    var x = Math.sin(theta) * Math.cos(phi);
                                    var y = Math.cos(theta);
                                    var z = Math.sin(theta) * Math.sin(phi);
                                    var pr = project3D(x, y, z);
                                    var vis = pr[2] > -0.05;
                                    if (lt === 0 || !prevVis) ctx.moveTo(pr[0], pr[1]);
                                    else if (vis) ctx.lineTo(pr[0], pr[1]);
                                    else ctx.moveTo(pr[0], pr[1]);
                                    prevVis = vis;
                                }
                                ctx.stroke();
                            }

                            // Draw latitude lines
                            for (var lat = 1; lat < nLat; lat++) {
                                var theta2 = Math.PI * lat / nLat;
                                ctx.beginPath();
                                var prevVis2 = false;
                                for (var ln = 0; ln <= 60; ln++) {
                                    var phi2 = 2 * Math.PI * ln / 60;
                                    var x2 = Math.sin(theta2) * Math.cos(phi2);
                                    var y2 = Math.cos(theta2);
                                    var z2 = Math.sin(theta2) * Math.sin(phi2);
                                    var pr2 = project3D(x2, y2, z2);
                                    var vis2 = pr2[2] > -0.05;
                                    if (ln === 0 || !prevVis2) ctx.moveTo(pr2[0], pr2[1]);
                                    else if (vis2) ctx.lineTo(pr2[0], pr2[1]);
                                    else ctx.moveTo(pr2[0], pr2[1]);
                                    prevVis2 = vis2;
                                }
                                ctx.stroke();
                            }

                            // Vector field: V = d/dphi (rotation around y-axis)
                            // In Cartesian: V(theta, phi) = (-sin(phi), 0, cos(phi)) * sin(theta)
                            // This vanishes at theta=0 (north pole) and theta=pi (south pole)
                            var nArrows = 200;
                            for (var ai = 0; ai < nArrows; ai++) {
                                // Fibonacci sphere sampling
                                var golden = (1 + Math.sqrt(5)) / 2;
                                var theta3 = Math.acos(1 - 2 * (ai + 0.5) / nArrows);
                                var phi3 = 2 * Math.PI * ai / golden;

                                var x3 = Math.sin(theta3) * Math.cos(phi3);
                                var y3 = Math.cos(theta3);
                                var z3 = Math.sin(theta3) * Math.sin(phi3);

                                var pr3 = project3D(x3, y3, z3);
                                if (pr3[2] < 0.05) continue; // back side

                                // Vector field component: tangent to phi-circles
                                var vx = -Math.sin(phi3) * Math.sin(theta3);
                                var vy = 0;
                                var vz = Math.cos(phi3) * Math.sin(theta3);

                                var vLen = Math.sqrt(vx * vx + vy * vy + vz * vz);
                                if (vLen < 0.01) {
                                    // Zero of the vector field! Mark it
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.arc(pr3[0], pr3[1], 6, 0, Math.PI * 2);
                                    ctx.fill();
                                    continue;
                                }

                                var arrowLen = 18;
                                var rvx = rot3D(vx, vy, vz);
                                var projScale = arrowLen / Math.sqrt(rvx[0] * rvx[0] + rvx[1] * rvx[1] + 0.001);
                                var endX = pr3[0] + rvx[0] * projScale;
                                var endY = pr3[1] - rvx[1] * projScale;

                                // Color by magnitude (vanishes near poles)
                                var alpha = Math.min(1, vLen * 2);
                                ctx.strokeStyle = 'rgba(88,166,255,' + alpha.toFixed(2) + ')';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(pr3[0], pr3[1]);
                                ctx.lineTo(endX, endY);
                                ctx.stroke();

                                // tiny arrowhead
                                var aa = Math.atan2(endY - pr3[1], endX - pr3[0]);
                                ctx.fillStyle = 'rgba(88,166,255,' + alpha.toFixed(2) + ')';
                                ctx.beginPath();
                                ctx.moveTo(endX, endY);
                                ctx.lineTo(endX - 5 * Math.cos(aa - 0.5), endY - 5 * Math.sin(aa - 0.5));
                                ctx.lineTo(endX - 5 * Math.cos(aa + 0.5), endY - 5 * Math.sin(aa + 0.5));
                                ctx.closePath(); ctx.fill();
                            }

                            // Mark poles
                            var northP = project3D(0, 1, 0);
                            var southP = project3D(0, -1, 0);
                            if (northP[2] > -0.1) {
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(northP[0], northP[1], 7, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('index +1', northP[0] + 12, northP[1]);
                            }
                            if (southP[2] > -0.1) {
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(southP[0], southP[1], 7, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('index +1', southP[0] + 12, southP[1]);
                            }

                            // Title
                            viz.screenText('Vector field on S\u00B2: rotation about vertical axis', viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('Zeros at poles: sum of indices = 1 + 1 = \u03C7(S\u00B2) = 2', viz.width / 2, viz.height - 10, viz.colors.red, 12);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(T_p(M \\times N) \\cong T_pM \\oplus T_pN\\) canonically. (Hint: use the projections \\(\\pi_1: M \\times N \\to M\\) and \\(\\pi_2: M \\times N \\to N\\).)',
                    hint: 'The map \\(v \\mapsto (d(\\pi_1)_p(v), \\, d(\\pi_2)_p(v))\\) gives an isomorphism. Prove it is injective and count dimensions.',
                    solution: 'The map \\(\\Phi: T_{(p,q)}(M \\times N) \\to T_pM \\oplus T_qN\\) given by \\(\\Phi(v) = (d\\pi_{1,(p,q)}(v),\\, d\\pi_{2,(p,q)}(v))\\) is linear. Its inverse is \\((u, w) \\mapsto d(i_1)_p(u) + d(i_2)_q(w)\\), where \\(i_1(x) = (x, q)\\) and \\(i_2(y) = (p, y)\\). Since \\(\\pi_j \\circ i_j = \\mathrm{id}\\), the compositions are the identity. Both spaces have dimension \\(\\dim M + \\dim N\\), so \\(\\Phi\\) is an isomorphism.'
                },
                {
                    question: 'Let \\(S^n \\subset \\mathbb{R}^{n+1}\\) be the unit sphere. Show that \\(T_pS^n = \\{v \\in \\mathbb{R}^{n+1} : v \\cdot p = 0\\}\\), the orthogonal complement of \\(p\\).',
                    hint: 'Any curve \\(\\gamma(t)\\) on \\(S^n\\) satisfies \\(|\\gamma(t)|^2 = 1\\). Differentiate at \\(t = 0\\).',
                    solution: 'If \\(\\gamma(t) \\in S^n\\), then \\(\\gamma(t) \\cdot \\gamma(t) = 1\\). Differentiating: \\(2\\gamma\'(0) \\cdot \\gamma(0) = 0\\), so \\(\\gamma\'(0) \\perp p\\). This shows \\(T_pS^n \\subset p^\\perp\\). Since \\(\\dim T_pS^n = n = \\dim p^\\perp\\), equality holds.'
                }
            ]
        }
    ]
});
