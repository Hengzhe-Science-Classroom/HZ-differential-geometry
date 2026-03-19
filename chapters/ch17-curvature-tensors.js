window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Curvature Tensors',
    subtitle: 'The Riemann curvature tensor and its descendants',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Curvature Needs a Tensor
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Curvature Needs a Tensor',
            content: `
<h2>Why Curvature Needs a Tensor</h2>

<div class="env-block intuition">
    <div class="env-title">From Gaussian Curvature to Higher Dimensions</div>
    <div class="env-body">
        <p>For surfaces in \\(\\mathbb{R}^3\\), Gaussian curvature \\(K\\) is a single number at each point, capturing how the surface bends. But a 4-dimensional manifold (such as spacetime) has many more "directions to bend." A single number cannot encode all the curvature information; we need a <em>tensor</em>.</p>
        <p>At each point of an \\(n\\)-dimensional Riemannian manifold, there are \\(\\binom{n}{2}\\) independent 2-planes through that point. For \\(n = 4\\), that gives 6 independent planes, each with its own sectional curvature. The Riemann curvature tensor packages all of these into a single algebraic object.</p>
    </div>
</div>

<p>In Chapter 16, we defined the covariant derivative \\(\\nabla\\), which lets us differentiate vector fields along curves. A natural question arises: <strong>does the order of differentiation matter?</strong></p>

<p>In flat \\(\\mathbb{R}^n\\), partial derivatives commute: \\(\\partial_i \\partial_j f = \\partial_j \\partial_i f\\). But covariant derivatives need not commute. The failure of covariant derivatives to commute is precisely what the Riemann curvature tensor measures.</p>

<div class="env-block remark">
    <div class="env-title">The Moral</div>
    <div class="env-body">
        <p>Curvature = the obstruction to commutativity of covariant differentiation. Equivalently, curvature measures the holonomy: how much a vector rotates when parallel-transported around an infinitesimal loop.</p>
    </div>
</div>

<h3>What We Build in This Chapter</h3>

<p>Starting from the Riemann tensor \\(R\\), we construct a hierarchy of curvature quantities, each obtained by taking traces of the previous one:</p>

\\[
\\underbrace{R_{ijkl}}_{\\text{Riemann}} \\xrightarrow{\\text{trace}} \\underbrace{R_{ij}}_{\\text{Ricci}} \\xrightarrow{\\text{trace}} \\underbrace{S}_{\\text{Scalar}}
\\]

<p>Each successive trace loses information but gains interpretability. The Riemann tensor knows everything about curvature. The Ricci tensor averages over directions and connects to Einstein's field equations. The scalar curvature is a single number, the simplest possible curvature invariant.</p>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Riemann Curvature Tensor
        // ================================================================
        {
            id: 'sec-riemann',
            title: 'The Riemann Curvature Tensor',
            content: `
<h2>The Riemann Curvature Tensor</h2>

<div class="env-block definition">
    <div class="env-title">Definition 17.1 (Riemann Curvature Tensor)</div>
    <div class="env-body">
        <p>Let \\((M, g)\\) be a Riemannian manifold with Levi-Civita connection \\(\\nabla\\). The <strong>Riemann curvature tensor</strong> is the \\((1,3)\\)-tensor \\(R\\) defined by</p>
        \\[
        R(X, Y)Z = \\nabla_X \\nabla_Y Z - \\nabla_Y \\nabla_X Z - \\nabla_{[X, Y]} Z
        \\]
        <p>for vector fields \\(X, Y, Z\\). In local coordinates, the components are</p>
        \\[
        R^l{}_{ijk} = \\partial_i \\Gamma^l_{jk} - \\partial_j \\Gamma^l_{ik} + \\Gamma^l_{im} \\Gamma^m_{jk} - \\Gamma^l_{jm} \\Gamma^m_{ik}.
        \\]
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Understanding the Formula</div>
    <div class="env-body">
        <p>The three terms have clear geometric meaning:</p>
        <ul>
            <li>\\(\\nabla_X \\nabla_Y Z\\): differentiate \\(Z\\) first along \\(Y\\), then along \\(X\\)</li>
            <li>\\(-\\nabla_Y \\nabla_X Z\\): subtract the result in the opposite order</li>
            <li>\\(-\\nabla_{[X,Y]} Z\\): correct for the fact that \\(X\\) and \\(Y\\) may not commute as vector fields (the Lie bracket term)</li>
        </ul>
        <p>If space is flat, all three cancel. The residual measures genuine curvature.</p>
    </div>
</div>

<p>The term \\(\\nabla_{[X,Y]} Z\\) ensures that \\(R\\) is tensorial: it depends only on the pointwise values of \\(X, Y, Z\\), not on how they are extended as vector fields. Without this correction, \\(\\nabla_X \\nabla_Y Z - \\nabla_Y \\nabla_X Z\\) would depend on derivatives of \\(X\\) and \\(Y\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.1 (Tensoriality)</div>
    <div class="env-body">
        <p>The map \\(R: \\mathfrak{X}(M)^3 \\to \\mathfrak{X}(M)\\) defined by \\(R(X,Y)Z\\) is \\(C^\\infty(M)\\)-linear in each argument. That is, \\(R\\) is a genuine \\((1,3)\\)-tensor field.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The 2-Sphere \\(S^2\\)</div>
    <div class="env-body">
        <p>On the unit sphere \\(S^2\\) with the round metric \\(g = d\\theta^2 + \\sin^2\\theta\\, d\\phi^2\\), the only independent component of \\(R\\) (up to symmetries) is</p>
        \\[
        R^\\theta{}_{\\phi\\theta\\phi} = \\sin^2\\theta.
        \\]
        <p>This gives Gaussian curvature \\(K = 1\\) everywhere, confirming the sphere has constant positive curvature.</p>
    </div>
</div>

<div class="env-block example">
    <div name="flat-space" class="env-title">Example: Flat Space</div>
    <div class="env-body">
        <p>In \\(\\mathbb{R}^n\\) with the Euclidean metric, all Christoffel symbols vanish (\\(\\Gamma^k_{ij} = 0\\)), so \\(R \\equiv 0\\). Conversely, \\(R = 0\\) characterizes locally flat manifolds.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that for coordinate vector fields \\(\\partial_i, \\partial_j\\) (which satisfy \\([\\partial_i, \\partial_j] = 0\\)), the Riemann tensor reduces to \\(R(\\partial_i, \\partial_j)\\partial_k = \\nabla_{\\partial_i} \\nabla_{\\partial_j} \\partial_k - \\nabla_{\\partial_j} \\nabla_{\\partial_i} \\partial_k\\). Why does the bracket term vanish?',
                    hint: 'Coordinate vector fields commute: their Lie bracket is zero.',
                    solution: 'Since \\([\\partial_i, \\partial_j] = 0\\) for coordinate vector fields, the correction term \\(\\nabla_{[\\partial_i, \\partial_j]} \\partial_k = \\nabla_0 \\partial_k = 0\\). So \\(R(\\partial_i, \\partial_j)\\partial_k = \\nabla_{\\partial_i} \\nabla_{\\partial_j} \\partial_k - \\nabla_{\\partial_j} \\nabla_{\\partial_i} \\partial_k\\), which directly measures the non-commutativity of iterated covariant differentiation.'
                },
                {
                    question: 'Verify that \\(R = 0\\) for \\(\\mathbb{R}^n\\) with the standard Euclidean metric by computing the coordinate formula \\(R^l{}_{ijk}\\).',
                    hint: 'In Cartesian coordinates, \\(g_{ij} = \\delta_{ij}\\) and all Christoffel symbols vanish.',
                    solution: 'In Cartesian coordinates, \\(\\Gamma^l_{jk} = 0\\) for all \\(l, j, k\\). Substituting into \\(R^l{}_{ijk} = \\partial_i \\Gamma^l_{jk} - \\partial_j \\Gamma^l_{ik} + \\Gamma^l_{im}\\Gamma^m_{jk} - \\Gamma^l_{jm}\\Gamma^m_{ik}\\), every term is zero. Hence \\(R \\equiv 0\\), confirming \\(\\mathbb{R}^n\\) is flat.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Symmetries of R
        // ================================================================
        {
            id: 'sec-symmetries',
            title: 'Symmetries of R',
            content: `
<h2>Symmetries of the Riemann Tensor</h2>

<p>The Riemann tensor has far fewer independent components than a generic \\((0,4)\\)-tensor. It satisfies a remarkable collection of symmetries that dramatically reduce its degrees of freedom.</p>

<p>We work with the fully covariant version \\(R_{ijkl} = g_{lm} R^m{}_{ijk}\\), which is more natural for stating symmetries.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.2 (Symmetries of the Riemann Tensor)</div>
    <div class="env-body">
        <p>The Riemann curvature tensor satisfies:</p>
        <ol>
            <li><strong>Skew-symmetry in the first pair:</strong> \\(R_{ijkl} = -R_{jikl}\\)</li>
            <li><strong>Skew-symmetry in the second pair:</strong> \\(R_{ijkl} = -R_{ijlk}\\)</li>
            <li><strong>Pair symmetry:</strong> \\(R_{ijkl} = R_{klij}\\)</li>
            <li><strong>First Bianchi identity:</strong> \\(R_{ijkl} + R_{iklj} + R_{iljk} = 0\\)</li>
        </ol>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">What the Symmetries Mean</div>
    <div class="env-body">
        <p><strong>Skew-symmetry:</strong> Swapping the order of differentiation (first pair) or the "test direction" (second pair) flips the sign. This reflects the antisymmetric nature of the curvature as measuring the failure of commutativity.</p>
        <p><strong>Pair symmetry:</strong> The roles of the "differentiation plane" \\((i,j)\\) and the "test plane" \\((k,l)\\) are interchangeable. This is a deep consequence of the metric compatibility of the Levi-Civita connection.</p>
        <p><strong>Bianchi identity:</strong> A cyclic sum over three indices vanishes. This is the algebraic Bianchi identity (distinct from the differential Bianchi identity, which involves covariant derivatives of \\(R\\)).</p>
    </div>
</div>

<h3>Counting Independent Components</h3>

<p>For an \\(n\\)-dimensional Riemannian manifold, a generic \\((0,4)\\)-tensor has \\(n^4\\) components. The symmetries of \\(R\\) reduce this to</p>
\\[
\\frac{n^2(n^2 - 1)}{12}.
\\]

<table class="styled-table">
<thead>
<tr><th>Dimension \\(n\\)</th><th>\\(n^4\\) (generic)</th><th>Independent components of \\(R\\)</th></tr>
</thead>
<tbody>
<tr><td>2</td><td>16</td><td>1</td></tr>
<tr><td>3</td><td>81</td><td>6</td></tr>
<tr><td>4</td><td>256</td><td>20</td></tr>
<tr><td>5</td><td>625</td><td>50</td></tr>
</tbody>
</table>

<p>In dimension 2, the single component is the Gaussian curvature. In dimension 4 (spacetime), 20 independent components encode all gravitational tidal effects.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.3 (Differential Bianchi Identity)</div>
    <div class="env-body">
        <p>The Riemann tensor also satisfies the <strong>differential (second) Bianchi identity</strong>:</p>
        \\[
        \\nabla_m R_{ijkl} + \\nabla_k R_{ijlm} + \\nabla_l R_{ijmk} = 0.
        \\]
        <p>This identity is crucial: taking its trace yields the contracted Bianchi identity \\(\\nabla^i G_{ij} = 0\\), which implies conservation of the Einstein tensor and hence conservation of energy-momentum in general relativity.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify the component count formula \\(\\frac{n^2(n^2-1)}{12}\\) for \\(n = 2\\) and \\(n = 3\\). For \\(n = 2\\), show explicitly that there is only one independent component.',
                    hint: 'For \\(n = 2\\), the only nonzero index pattern (up to symmetry) is \\(R_{1212}\\). Any other nonzero component is related to this one by the symmetries.',
                    solution: 'For \\(n = 2\\): \\(\\frac{4 \\cdot 3}{12} = 1\\). The only independent component is \\(R_{1212}\\), which equals the Gaussian curvature times \\(\\det(g)\\). All other components are zero or related by \\(R_{1212} = -R_{2112} = -R_{1221} = R_{2121}\\). For \\(n = 3\\): \\(\\frac{9 \\cdot 8}{12} = 6\\), matching the 6 independent components of the Ricci tensor (since in 3D, Riemann is fully determined by Ricci).'
                },
                {
                    question: 'Using the first Bianchi identity, show that \\(R_{1234} + R_{1342} + R_{1423} = 0\\). What does this constrain about the curvature of 4-dimensional manifolds?',
                    hint: 'This is a direct application with \\(i=1, j=2, k=3, l=4\\).',
                    solution: 'The first Bianchi identity \\(R_{ijkl} + R_{iklj} + R_{iljk} = 0\\) with \\((i,j,k,l) = (1,2,3,4)\\) gives \\(R_{1234} + R_{1342} + R_{1423} = 0\\). This shows the 20 components of the Riemann tensor in 4D are not all independent of each other in a "cross-pair" sense; the Bianchi identity provides additional algebraic constraints beyond the pairwise symmetries.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Sectional Curvature
        // ================================================================
        {
            id: 'sec-sectional',
            title: 'Sectional Curvature',
            content: `
<h2>Sectional Curvature</h2>

<div class="env-block definition">
    <div class="env-title">Definition 17.2 (Sectional Curvature)</div>
    <div class="env-body">
        <p>Let \\(\\sigma \\subset T_pM\\) be a 2-dimensional subspace (a <em>2-plane</em>) spanned by linearly independent vectors \\(u, v\\). The <strong>sectional curvature</strong> of \\(\\sigma\\) is</p>
        \\[
        K(\\sigma) = K(u, v) = \\frac{R(u, v, v, u)}{\\|u\\|^2 \\|v\\|^2 - \\langle u, v \\rangle^2}
        \\]
        <p>where \\(R(u,v,v,u) = g(R(u,v)v, u) = R_{ijkl} u^i v^j v^k u^l\\) and the denominator is the squared area of the parallelogram spanned by \\(u\\) and \\(v\\).</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Geometric Interpretation</div>
    <div class="env-body">
        <p>\\(K(\\sigma)\\) is the Gaussian curvature of the 2-dimensional surface obtained by sweeping geodesics through \\(p\\) in the directions lying in \\(\\sigma\\). It measures how geodesics that start parallel in the plane \\(\\sigma\\) converge or diverge:</p>
        <ul>
            <li>\\(K > 0\\): geodesics converge (sphere-like)</li>
            <li>\\(K = 0\\): geodesics stay parallel (flat)</li>
            <li>\\(K < 0\\): geodesics diverge (saddle-like)</li>
        </ul>
    </div>
</div>

<p>The sectional curvature depends only on the plane \\(\\sigma\\), not on the particular basis \\(\\{u, v\\}\\) chosen: the denominator normalizes away the basis dependence.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.4 (Sectional Curvature Determines R)</div>
    <div class="env-body">
        <p>The Riemann curvature tensor \\(R\\) is completely determined by the sectional curvatures of all 2-planes. That is, if two Riemannian metrics on the same manifold have the same sectional curvatures for every 2-plane at every point, then their Riemann tensors are identical.</p>
    </div>
</div>

<p>This theorem justifies studying sectional curvature as the fundamental geometric quantity. The full Riemann tensor is simply the algebraic encoding of all sectional curvatures.</p>

<div class="env-block example">
    <div class="env-title">Example: Constant Sectional Curvature</div>
    <div class="env-body">
        <p>A manifold has <strong>constant sectional curvature</strong> \\(\\kappa\\) if \\(K(\\sigma) = \\kappa\\) for all 2-planes \\(\\sigma\\) at all points. The Riemann tensor then takes the simple form</p>
        \\[
        R_{ijkl} = \\kappa(g_{ik}g_{jl} - g_{il}g_{jk}).
        \\]
        <p>The three model geometries are:</p>
        <ul>
            <li>\\(\\kappa > 0\\): the sphere \\(S^n\\) (with radius \\(1/\\sqrt{\\kappa}\\))</li>
            <li>\\(\\kappa = 0\\): Euclidean space \\(\\mathbb{R}^n\\)</li>
            <li>\\(\\kappa < 0\\): hyperbolic space \\(\\mathbb{H}^n\\)</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-sectional-curvature"></div>
<div class="viz-placeholder" data-viz="viz-constant-curvature"></div>
`,
            visualizations: [
                {
                    id: 'viz-sectional-curvature',
                    title: 'Sectional Curvature of a 2-Plane',
                    description: 'Choose a 2-plane at a point on a surface by rotating the plane direction. The sectional curvature is computed and displayed. Observe how different planes through the same point can have different curvatures.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 60
                        });

                        var angle = 0;
                        var surfaceType = 0; // 0=ellipsoid, 1=saddle, 2=sphere

                        VizEngine.createSlider(controls, 'Plane angle', 0, Math.PI, 0, 0.01, function(v) {
                            angle = v;
                        });

                        var surfaceNames = ['Ellipsoid', 'Saddle', 'Sphere'];
                        var surfBtn = VizEngine.createButton(controls, 'Surface: Ellipsoid', function() {
                            surfaceType = (surfaceType + 1) % 3;
                            surfBtn.textContent = 'Surface: ' + surfaceNames[surfaceType];
                        });

                        // Principal curvatures for each surface at the displayed point
                        function getPrincipalCurvatures() {
                            if (surfaceType === 0) return [2.0, 0.5]; // ellipsoid
                            if (surfaceType === 1) return [1.0, -1.0]; // saddle
                            return [1.0, 1.0]; // sphere
                        }

                        function getSectionalCurvature(theta) {
                            var pc = getPrincipalCurvatures();
                            var k1 = pc[0], k2 = pc[1];
                            // For a surface, sectional curvature at a point in direction theta
                            // is the normal curvature product; Gaussian curvature is k1*k2
                            // but the "sectional curvature" of the tangent plane is just K = k1*k2
                            // We show how normal curvature varies: kn(theta) = k1 cos^2(theta) + k2 sin^2(theta)
                            return k1 * Math.cos(theta) * Math.cos(theta) + k2 * Math.sin(theta) * Math.sin(theta);
                        }

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var pc = getPrincipalCurvatures();
                            var k1 = pc[0], k2 = pc[1];
                            var K = k1 * k2; // Gaussian curvature

                            // Draw the surface schematically
                            ctx.strokeStyle = viz.colors.purple + '66';
                            ctx.lineWidth = 1;
                            // Draw curvature profile (normal curvature as function of angle)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var t = 0; t <= 2 * Math.PI; t += 0.02) {
                                var kn = k1 * Math.cos(t) * Math.cos(t) + k2 * Math.sin(t) * Math.sin(t);
                                var r = 1.5 + kn * 0.8;
                                var sx = viz.originX + r * Math.cos(t) * viz.scale;
                                var sy = viz.originY - r * Math.sin(t) * viz.scale;
                                if (t === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Draw the zero-curvature reference circle
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, 1.5 * viz.scale, 0, 2 * Math.PI);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw the selected direction
                            var kn = getSectionalCurvature(angle);
                            var r = 1.5 + kn * 0.8;
                            var dx = Math.cos(angle), dy = Math.sin(angle);
                            var endX = viz.originX + r * dx * viz.scale;
                            var endY = viz.originY - r * dy * viz.scale;

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, viz.originY);
                            ctx.lineTo(endX, endY);
                            ctx.stroke();

                            // Draw point at end
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(endX, endY, 5, 0, 2 * Math.PI);
                            ctx.fill();

                            // Draw principal directions
                            for (var d = 0; d < 2; d++) {
                                var a = d * Math.PI / 2;
                                var pkn = d === 0 ? k1 : k2;
                                var pr = 1.5 + pkn * 0.8;
                                ctx.strokeStyle = viz.colors.teal + '88';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([6, 3]);
                                ctx.beginPath();
                                ctx.moveTo(viz.originX - pr * Math.cos(a) * viz.scale, viz.originY + pr * Math.sin(a) * viz.scale);
                                ctx.lineTo(viz.originX + pr * Math.cos(a) * viz.scale, viz.originY - pr * Math.sin(a) * viz.scale);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Center point
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, 4, 0, 2 * Math.PI);
                            ctx.fill();

                            // Labels
                            viz.screenText(surfaceNames[surfaceType], viz.width / 2, 25, viz.colors.white, 16);
                            viz.screenText('Normal curvature profile (polar plot)', viz.width / 2, 45, viz.colors.text, 11);

                            var infoY = viz.height - 75;
                            viz.screenText('k\u2081 = ' + k1.toFixed(1) + ',  k\u2082 = ' + k2.toFixed(1), viz.width / 2, infoY, viz.colors.teal, 13);
                            viz.screenText('Gaussian curvature K = k\u2081k\u2082 = ' + K.toFixed(2), viz.width / 2, infoY + 20, viz.colors.purple, 13);
                            viz.screenText('Normal curvature at \u03b8 = ' + (angle * 180 / Math.PI).toFixed(0) + '\u00b0:  \u03ba(\u03b8) = ' + kn.toFixed(3), viz.width / 2, infoY + 40, viz.colors.orange, 13);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-constant-curvature',
                    title: 'The Three Constant-Curvature Geometries',
                    description: 'Compare sphere (K > 0), flat plane (K = 0), and hyperbolic plane (K < 0) side by side. Geodesics that start parallel converge, stay parallel, or diverge depending on the sign of curvature.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var time = 0;
                        var speed = 1;
                        VizEngine.createSlider(controls, 'Spread', 0.5, 3, 1, 0.1, function(v) { speed = v; });

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            time = t * 0.001;

                            var panelW = viz.width / 3;
                            var panelH = viz.height;
                            var titles = ['K > 0 (Sphere)', 'K = 0 (Flat)', 'K < 0 (Hyperbolic)'];
                            var colors = [viz.colors.blue, viz.colors.teal, viz.colors.orange];

                            for (var p = 0; p < 3; p++) {
                                var cx = panelW * p + panelW / 2;
                                var cy = panelH / 2 + 20;

                                // Panel border
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(panelW * p + 5, 5, panelW - 10, panelH - 10);

                                // Title
                                viz.screenText(titles[p], cx, 25, colors[p], 13);

                                // Draw geodesics
                                var separation = 0.15 * speed;
                                var numGeodesics = 7;

                                for (var g = 0; g < numGeodesics; g++) {
                                    var offset = (g - (numGeodesics - 1) / 2) * separation;
                                    ctx.strokeStyle = colors[p] + (g === Math.floor(numGeodesics / 2) ? 'ff' : '88');
                                    ctx.lineWidth = g === Math.floor(numGeodesics / 2) ? 2 : 1.2;
                                    ctx.beginPath();

                                    for (var s = 0; s <= 100; s++) {
                                        var frac = s / 100;
                                        var yy = cy - panelH * 0.35 + frac * panelH * 0.65;
                                        var xx;

                                        if (p === 0) {
                                            // Positive curvature: geodesics converge
                                            xx = cx + offset * Math.cos(frac * Math.PI * 0.8) * 80;
                                        } else if (p === 1) {
                                            // Zero curvature: geodesics stay parallel
                                            xx = cx + offset * 80;
                                        } else {
                                            // Negative curvature: geodesics diverge
                                            xx = cx + offset * Math.cosh(frac * 1.2) * 80 / Math.cosh(1.2);
                                        }

                                        if (s === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
                                    }
                                    ctx.stroke();
                                }

                                // Animated parallel transport indicator
                                var animFrac = (Math.sin(time * 0.8) * 0.5 + 0.5);
                                var indicatorY = cy - panelH * 0.35 + animFrac * panelH * 0.65;
                                ctx.strokeStyle = viz.colors.yellow + '88';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(panelW * p + 15, indicatorY);
                                ctx.lineTo(panelW * (p + 1) - 15, indicatorY);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            viz.screenText('Initially parallel geodesics', viz.width / 2, panelH - 18, viz.colors.text, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the sectional curvature of the sphere of radius \\(r\\). How does it depend on \\(r\\)?',
                    hint: 'The metric is \\(g = r^2(d\\theta^2 + \\sin^2\\theta\\, d\\phi^2)\\). Scaling the metric by \\(r^2\\) scales curvatures by \\(1/r^2\\).',
                    solution: 'The unit sphere has \\(K = 1\\). Scaling the metric by \\(r^2\\) (sphere of radius \\(r\\)) scales the sectional curvature by \\(1/r^2\\), giving \\(K = 1/r^2\\). Larger spheres are less curved, matching intuition: the Earth appears flat locally because \\(r\\) is large.'
                },
                {
                    question: 'If a manifold has constant sectional curvature \\(\\kappa\\), show that \\(R_{ijkl} = \\kappa(g_{ik}g_{jl} - g_{il}g_{jk})\\) satisfies all four symmetries of the Riemann tensor.',
                    hint: 'Check each symmetry directly using properties of the metric tensor.',
                    solution: 'Let \\(T_{ijkl} = \\kappa(g_{ik}g_{jl} - g_{il}g_{jk})\\). (1) \\(T_{jikl} = \\kappa(g_{jk}g_{il} - g_{jl}g_{ik}) = -T_{ijkl}\\). (2) \\(T_{ijlk} = \\kappa(g_{il}g_{jk} - g_{ik}g_{jl}) = -T_{ijkl}\\). (3) \\(T_{klij} = \\kappa(g_{ki}g_{lj} - g_{kj}g_{li}) = \\kappa(g_{ik}g_{jl} - g_{il}g_{jk}) = T_{ijkl}\\) by symmetry of \\(g\\). (4) Bianchi: \\(T_{ijkl} + T_{iklj} + T_{iljk} = \\kappa[(g_{ik}g_{jl} - g_{il}g_{jk}) + (g_{il}g_{kj} - g_{ij}g_{kl}) + (g_{ij}g_{lk} - g_{ik}g_{lj})] = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Ricci Curvature
        // ================================================================
        {
            id: 'sec-ricci',
            title: 'Ricci Curvature',
            content: `
<h2>Ricci Curvature</h2>

<div class="env-block definition">
    <div class="env-title">Definition 17.3 (Ricci Curvature Tensor)</div>
    <div class="env-body">
        <p>The <strong>Ricci curvature tensor</strong> \\(\\text{Ric}\\) is the trace of the Riemann tensor:</p>
        \\[
        R_{ij} = \\text{Ric}(\\partial_i, \\partial_j) = R^k{}_{ikj} = g^{kl} R_{kilj}.
        \\]
        <p>\\(\\text{Ric}\\) is a symmetric \\((0,2)\\)-tensor: \\(R_{ij} = R_{ji}\\).</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Geometric Meaning</div>
    <div class="env-body">
        <p>The Ricci curvature \\(\\text{Ric}(v, v)\\) for a unit vector \\(v\\) is the <em>average</em> of the sectional curvatures of all 2-planes containing \\(v\\). More precisely, if \\(\\{e_1, \\ldots, e_n\\}\\) is an orthonormal basis with \\(e_1 = v\\), then</p>
        \\[
        \\text{Ric}(v, v) = \\sum_{j=2}^{n} K(v, e_j).
        \\]
        <p>So Ricci curvature measures how volumes grow along geodesics in the direction \\(v\\): positive Ricci means geodesics converge (volume shrinks), negative Ricci means they diverge (volume grows).</p>
    </div>
</div>

<p>The Ricci tensor contains less information than the full Riemann tensor (it has \\(\\binom{n+1}{2}\\) independent components versus \\(\\frac{n^2(n^2-1)}{12}\\)), but it plays a central role in geometry and physics.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.5 (Ricci and Volume)</div>
    <div class="env-body">
        <p>The volume element of a geodesic ball of radius \\(\\epsilon\\) centered at \\(p\\) in direction \\(v\\) satisfies</p>
        \\[
        \\frac{\\text{Vol}(B_\\epsilon^M)}{\\text{Vol}(B_\\epsilon^{\\mathbb{R}^n})} = 1 - \\frac{R_{ij} v^i v^j}{6(n+2)} \\epsilon^2 + O(\\epsilon^4).
        \\]
        <p>Positive Ricci means volumes are smaller than in flat space; negative Ricci means they are larger.</p>
    </div>
</div>

<h3>Einstein's Field Equations (Preview)</h3>

<p>The Einstein tensor combines Ricci curvature and scalar curvature:</p>
\\[
G_{ij} = R_{ij} - \\frac{1}{2} S g_{ij}
\\]
<p>where \\(S\\) is the scalar curvature (defined in the next section). Einstein's field equations</p>
\\[
G_{ij} = 8\\pi T_{ij}
\\]
<p>relate the geometry of spacetime (left side) to the matter-energy content (right side, the stress-energy tensor \\(T_{ij}\\)). The contracted Bianchi identity ensures \\(\\nabla^i G_{ij} = 0\\), which corresponds to conservation of energy-momentum.</p>

<div class="viz-placeholder" data-viz="viz-ricci-curvature"></div>
`,
            visualizations: [
                {
                    id: 'viz-ricci-curvature',
                    title: 'Ricci Curvature as Average Sectional Curvature',
                    description: 'For a chosen direction v, Ricci curvature averages sectional curvatures over all 2-planes containing v. Watch the animation sweep through all such planes and accumulate the average.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 200, originY: 200, scale: 50
                        });

                        var k1 = 1.0, k2 = 0.5, k3 = -0.3;
                        VizEngine.createSlider(controls, 'K\u2081\u2082', -2, 2, k1, 0.1, function(v) { k1 = v; });
                        VizEngine.createSlider(controls, 'K\u2081\u2083', -2, 2, k2, 0.1, function(v) { k2 = v; });
                        VizEngine.createSlider(controls, 'K\u2082\u2083', -2, 2, k3, 0.1, function(v) { k3 = v; });

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var time = t * 0.001;

                            // We simulate a 3D point with 3 sectional curvatures
                            // Ric(e1,e1) = K12 + K13, Ric(e2,e2) = K12 + K23, Ric(e3,e3) = K13 + K23

                            var ricciVals = [
                                { dir: 'e\u2081', val: k1 + k2 },
                                { dir: 'e\u2082', val: k1 + k3 },
                                { dir: 'e\u2083', val: k2 + k3 }
                            ];

                            // Draw the sectional curvatures as a polar-like diagram
                            var centerX = 180, centerY = 200;
                            var maxK = Math.max(Math.abs(k1), Math.abs(k2), Math.abs(k3), 0.1);
                            var rScale = 70 / maxK;

                            // Reference circle
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.arc(centerX, centerY, 70, 0, 2 * Math.PI);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw sectional curvature vectors
                            var secCurvs = [
                                { label: 'K\u2081\u2082', val: k1, angle: 0 },
                                { label: 'K\u2081\u2083', val: k2, angle: 2 * Math.PI / 3 },
                                { label: 'K\u2082\u2083', val: k3, angle: 4 * Math.PI / 3 }
                            ];

                            for (var i = 0; i < secCurvs.length; i++) {
                                var sc = secCurvs[i];
                                var r = Math.abs(sc.val) * rScale;
                                var ex = centerX + r * Math.cos(sc.angle);
                                var ey = centerY - r * Math.sin(sc.angle);
                                var color = sc.val >= 0 ? viz.colors.blue : viz.colors.red;

                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(centerX, centerY);
                                ctx.lineTo(ex, ey);
                                ctx.stroke();

                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.arc(ex, ey, 4, 0, 2 * Math.PI);
                                ctx.fill();

                                var lx = centerX + (r + 20) * Math.cos(sc.angle);
                                var ly = centerY - (r + 20) * Math.sin(sc.angle);
                                ctx.fillStyle = color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(sc.label + ' = ' + sc.val.toFixed(1), lx, ly);
                            }

                            // Animated sweep: highlight which sectional curvatures contribute to Ric(v,v)
                            var sweepIdx = Math.floor((time * 0.5) % 3);

                            // Draw center point
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
                            ctx.fill();

                            // Ricci curvature display (right panel)
                            var panelX = 370;
                            viz.screenText('Ricci Curvatures', panelX + 50, 30, viz.colors.white, 14);
                            viz.screenText('(sum of sectional curvatures', panelX + 50, 48, viz.colors.text, 10);
                            viz.screenText('containing each direction)', panelX + 50, 62, viz.colors.text, 10);

                            var barMaxW = 120;
                            var maxRic = Math.max(Math.abs(ricciVals[0].val), Math.abs(ricciVals[1].val), Math.abs(ricciVals[2].val), 0.1);

                            for (var j = 0; j < 3; j++) {
                                var rv = ricciVals[j];
                                var by = 100 + j * 65;
                                var isActive = (j === sweepIdx);

                                ctx.fillStyle = isActive ? viz.colors.white : viz.colors.text;
                                ctx.font = (isActive ? 'bold ' : '') + '13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('Ric(' + rv.dir + ',' + rv.dir + ')', panelX, by);

                                // Bar
                                var barW = (rv.val / maxRic) * barMaxW * 0.8;
                                var barColor = rv.val >= 0 ? viz.colors.blue : viz.colors.red;
                                var barY = by + 20;
                                ctx.fillStyle = barColor + (isActive ? 'cc' : '66');
                                if (barW >= 0) {
                                    ctx.fillRect(panelX + 50, barY, barW, 14);
                                } else {
                                    ctx.fillRect(panelX + 50 + barW, barY, -barW, 14);
                                }

                                // Zero line
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(panelX + 50, barY - 2);
                                ctx.lineTo(panelX + 50, barY + 16);
                                ctx.stroke();

                                ctx.fillStyle = isActive ? viz.colors.white : viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText(rv.val.toFixed(2), panelX + 55 + Math.abs(barW) + 5, barY + 7);
                            }

                            // Scalar curvature
                            var S = k1 + k2 + k3;
                            viz.screenText('Scalar curvature S = ' + (2 * S).toFixed(2), viz.width / 2, viz.height - 25, viz.colors.yellow, 13);
                            viz.screenText('(sum of all sectional curvatures, counted with multiplicity)', viz.width / 2, viz.height - 10, viz.colors.text, 10);

                            // Title
                            viz.screenText('Sectional Curvatures', centerX, 25, viz.colors.purple, 14);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For a 3-dimensional manifold with sectional curvatures \\(K_{12} = a\\), \\(K_{13} = b\\), \\(K_{23} = c\\), compute all components of the Ricci tensor.',
                    hint: 'Use \\(\\text{Ric}(e_i, e_i) = \\sum_{j \\neq i} K(e_i, e_j)\\) for an orthonormal basis.',
                    solution: '\\(R_{11} = K_{12} + K_{13} = a + b\\), \\(R_{22} = K_{12} + K_{23} = a + c\\), \\(R_{33} = K_{13} + K_{23} = b + c\\). The off-diagonal components vanish for an orthonormal basis. The scalar curvature is \\(S = (a+b) + (a+c) + (b+c) = 2(a+b+c)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Scalar Curvature
        // ================================================================
        {
            id: 'sec-scalar',
            title: 'Scalar Curvature',
            content: `
<h2>Scalar Curvature</h2>

<div class="env-block definition">
    <div class="env-title">Definition 17.4 (Scalar Curvature)</div>
    <div class="env-body">
        <p>The <strong>scalar curvature</strong> \\(S\\) is the trace of the Ricci tensor:</p>
        \\[
        S = g^{ij} R_{ij} = \\text{tr}_g(\\text{Ric}).
        \\]
        <p>It is a smooth function \\(S: M \\to \\mathbb{R}\\).</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Geometric Meaning</div>
    <div class="env-body">
        <p>The scalar curvature is the simplest curvature invariant: a single number at each point. It equals twice the sum of all sectional curvatures (for an orthonormal basis):</p>
        \\[
        S = 2 \\sum_{i < j} K(e_i, e_j).
        \\]
        <p>Geometrically, \\(S\\) measures how the volume of a small geodesic ball deviates from the Euclidean volume:</p>
        \\[
        \\text{Vol}(B_\\epsilon) = \\text{Vol}(B_\\epsilon^{\\mathbb{R}^n}) \\left(1 - \\frac{S}{6(n+2)} \\epsilon^2 + O(\\epsilon^4)\\right).
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Scalar Curvature of Constant-Curvature Spaces</div>
    <div class="env-body">
        <p>If \\(K(\\sigma) = \\kappa\\) for all 2-planes, there are \\(\\binom{n}{2}\\) such planes, so</p>
        \\[
        S = 2\\binom{n}{2}\\kappa = n(n-1)\\kappa.
        \\]
        <p>For the unit \\(S^2\\): \\(S = 2(1)(1) = 2\\). For the unit \\(S^3\\): \\(S = 3(2)(1) = 6\\). For flat \\(\\mathbb{R}^n\\): \\(S = 0\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-scalar-curvature-map"></div>
`,
            visualizations: [
                {
                    id: 'viz-scalar-curvature-map',
                    title: 'Scalar Curvature Map',
                    description: 'A surface colored by its scalar curvature. Blue regions have positive curvature (sphere-like), red regions have negative curvature (saddle-like), and green regions are nearly flat.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 1
                        });

                        var bumpA = 1.0;
                        var bumpB = 0.5;
                        VizEngine.createSlider(controls, 'Bump height', 0, 2, bumpA, 0.1, function(v) { bumpA = v; });
                        VizEngine.createSlider(controls, 'Saddle depth', 0, 2, bumpB, 0.1, function(v) { bumpB = v; });

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // We draw a top-down view of a surface z = f(x,y)
                            // colored by Gaussian curvature K = (fxx*fyy - fxy^2) / (1+fx^2+fy^2)^2
                            var gridSize = 200;
                            var cellW = (viz.width - 40) / gridSize;
                            var cellH = (viz.height - 80) / gridSize;
                            var startX = 20, startY = 50;

                            for (var gi = 0; gi < gridSize; gi++) {
                                for (var gj = 0; gj < gridSize; gj++) {
                                    var u = (gi / gridSize - 0.5) * 6;
                                    var v = (gj / gridSize - 0.5) * 6;

                                    // Surface: z = a * exp(-x^2-y^2) - b * exp(-(x-1)^2-(y-1)^2) * (x-1)*(y-1)
                                    var r2 = u * u + v * v;
                                    var bump = bumpA * Math.exp(-r2 * 0.3);
                                    var u2 = u - 1.5, v2 = v - 1.5;
                                    var saddle = bumpB * Math.exp(-(u2 * u2 + v2 * v2) * 0.4) * u2 * v2 * 0.3;

                                    // Numerical Gaussian curvature via finite differences
                                    var h = 0.05;
                                    var f00 = bumpA * Math.exp(-(u * u + v * v) * 0.3) + bumpB * Math.exp(-((u - 1.5) * (u - 1.5) + (v - 1.5) * (v - 1.5)) * 0.4) * (u - 1.5) * (v - 1.5) * 0.3;
                                    var fp0 = bumpA * Math.exp(-((u + h) * (u + h) + v * v) * 0.3) + bumpB * Math.exp(-((u + h - 1.5) * (u + h - 1.5) + (v - 1.5) * (v - 1.5)) * 0.4) * (u + h - 1.5) * (v - 1.5) * 0.3;
                                    var fm0 = bumpA * Math.exp(-((u - h) * (u - h) + v * v) * 0.3) + bumpB * Math.exp(-((u - h - 1.5) * (u - h - 1.5) + (v - 1.5) * (v - 1.5)) * 0.4) * (u - h - 1.5) * (v - 1.5) * 0.3;
                                    var f0p = bumpA * Math.exp(-(u * u + (v + h) * (v + h)) * 0.3) + bumpB * Math.exp(-((u - 1.5) * (u - 1.5) + (v + h - 1.5) * (v + h - 1.5)) * 0.4) * (u - 1.5) * (v + h - 1.5) * 0.3;
                                    var f0m = bumpA * Math.exp(-(u * u + (v - h) * (v - h)) * 0.3) + bumpB * Math.exp(-((u - 1.5) * (u - 1.5) + (v - h - 1.5) * (v - h - 1.5)) * 0.4) * (u - 1.5) * (v - h - 1.5) * 0.3;
                                    var fpp = bumpA * Math.exp(-((u + h) * (u + h) + (v + h) * (v + h)) * 0.3) + bumpB * Math.exp(-((u + h - 1.5) * (u + h - 1.5) + (v + h - 1.5) * (v + h - 1.5)) * 0.4) * (u + h - 1.5) * (v + h - 1.5) * 0.3;

                                    var fx = (fp0 - fm0) / (2 * h);
                                    var fy = (f0p - f0m) / (2 * h);
                                    var fxx = (fp0 - 2 * f00 + fm0) / (h * h);
                                    var fyy = (f0p - 2 * f00 + f0m) / (h * h);
                                    var fxy = (fpp - fp0 - f0p + f00) / (h * h);

                                    var denom = (1 + fx * fx + fy * fy);
                                    var K = (fxx * fyy - fxy * fxy) / (denom * denom);

                                    // Color by curvature: blue = positive, red = negative, green = zero
                                    var maxK2 = 0.5;
                                    var t = Math.max(-1, Math.min(1, K / maxK2));
                                    var r, g2, b;
                                    if (t >= 0) {
                                        r = Math.round(30 * (1 - t));
                                        g2 = Math.round(100 * (1 - t) + 80 * t);
                                        b = Math.round(80 + 175 * t);
                                    } else {
                                        r = Math.round(80 + 175 * (-t));
                                        g2 = Math.round(100 * (1 + t) + 80 * (-t));
                                        b = Math.round(30 * (1 + t));
                                    }

                                    ctx.fillStyle = 'rgb(' + r + ',' + g2 + ',' + b + ')';
                                    ctx.fillRect(startX + gi * cellW, startY + gj * cellH, Math.ceil(cellW) + 1, Math.ceil(cellH) + 1);
                                }
                            }

                            // Color legend
                            var legY = viz.height - 22;
                            viz.screenText('K < 0 (saddle)', 80, legY, viz.colors.red, 11);
                            viz.screenText('K \u2248 0 (flat)', viz.width / 2, legY, viz.colors.teal, 11);
                            viz.screenText('K > 0 (dome)', viz.width - 80, legY, viz.colors.blue, 11);

                            viz.screenText('Gaussian Curvature Map: z = f(x,y)', viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText('bump + saddle surface, top-down view', viz.width / 2, 38, viz.colors.text, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the scalar curvature of the product manifold \\(S^2(r_1) \\times S^2(r_2)\\) (product of two spheres with radii \\(r_1\\) and \\(r_2\\)).',
                    hint: 'The curvature of a product manifold splits: mixed sectional curvatures (one direction from each factor) are zero.',
                    solution: 'The sectional curvature of \\(S^2(r_i)\\) is \\(1/r_i^2\\). In the product, the only nonzero sectional curvature planes are those lying entirely in one factor. \\(S^2(r_1)\\) contributes \\(K = 1/r_1^2\\) (one 2-plane) and \\(S^2(r_2)\\) contributes \\(K = 1/r_2^2\\) (one 2-plane). Mixed planes have \\(K = 0\\). So \\(S = 2(1/r_1^2 + 1/r_2^2 + 0 + 0 + 0 + 0) = 2/r_1^2 + 2/r_2^2\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge — From Curvature to Topology and Physics
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'From Curvature to Topology and Physics',
            content: `
<h2>From Curvature to Topology and Physics</h2>

<div class="env-block intuition">
    <div class="env-title">The Big Picture</div>
    <div class="env-body">
        <p>The Riemann curvature tensor sits at the center of a web connecting geometry, topology, and physics. In this chapter we have built the algebraic machinery; here we preview where it leads.</p>
    </div>
</div>

<h3>The Curvature Decomposition</h3>

<p>In dimension \\(n \\geq 3\\), the Riemann tensor decomposes into three irreducible pieces under the orthogonal group:</p>

\\[
R = W + \\frac{1}{n-2}\\left(\\text{Ric} - \\frac{S}{n}g\\right) \\owedge g + \\frac{S}{2n(n-1)} g \\owedge g
\\]

<p>where:</p>
<ul>
    <li>\\(W\\) is the <strong>Weyl tensor</strong> (the trace-free part of \\(R\\)), measuring conformal curvature</li>
    <li>The middle term involves the traceless Ricci tensor, measuring the anisotropic part of Ricci curvature</li>
    <li>The last term involves only the scalar curvature, measuring the isotropic (average) part</li>
</ul>

<p>In dimension 3, \\(W = 0\\) identically, so Riemann is fully determined by Ricci. In dimension 4, \\(W\\) has 10 independent components and encodes gravitational radiation in general relativity.</p>

<h3>Curvature and Topology</h3>

<p>Curvature constrains topology. Some landmark results:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.6 (Gauss-Bonnet, Dimension 2)</div>
    <div class="env-body">
        <p>For a compact oriented surface \\(M\\) without boundary,</p>
        \\[
        \\int_M K \\, dA = 2\\pi \\chi(M)
        \\]
        <p>where \\(\\chi(M)\\) is the Euler characteristic. The total curvature is a topological invariant.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.7 (Bonnet-Myers)</div>
    <div class="env-body">
        <p>If \\(\\text{Ric} \\geq (n-1)\\kappa g\\) for some \\(\\kappa > 0\\), then \\(M\\) is compact with diameter \\(\\leq \\pi/\\sqrt{\\kappa}\\) and finite fundamental group.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.8 (Cartan-Hadamard)</div>
    <div class="env-body">
        <p>If \\(M\\) is complete, simply connected, and has \\(K \\leq 0\\) everywhere, then \\(M\\) is diffeomorphic to \\(\\mathbb{R}^n\\).</p>
    </div>
</div>

<h3>Einstein's Equations</h3>

<p>In general relativity, spacetime is a 4-dimensional Lorentzian manifold \\((M, g)\\) satisfying</p>
\\[
R_{ij} - \\frac{1}{2} S g_{ij} + \\Lambda g_{ij} = 8\\pi T_{ij}
\\]
<p>where \\(\\Lambda\\) is the cosmological constant and \\(T_{ij}\\) is the stress-energy tensor. The left side is pure geometry (Ricci and scalar curvature); the right side is physics (matter and energy). "Matter tells space how to curve; space tells matter how to move."</p>

<div class="viz-placeholder" data-viz="viz-curvature-decomposition"></div>
<div class="viz-placeholder" data-viz="viz-einstein-preview"></div>
`,
            visualizations: [
                {
                    id: 'viz-curvature-decomposition',
                    title: 'Curvature Decomposition',
                    description: 'The Riemann tensor decomposes into Weyl (conformal), traceless Ricci, and scalar parts. This schematic shows how information cascades from the full tensor through successive traces.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var dimN = 4;
                        VizEngine.createSlider(controls, 'Dimension n', 2, 6, dimN, 1, function(v) { dimN = Math.round(v); draw(); });

                        function riemannComponents(n) { return n * n * (n * n - 1) / 12; }
                        function ricciComponents(n) { return n * (n + 1) / 2; }
                        function weylComponents(n) {
                            if (n <= 2) return 0;
                            if (n === 3) return 0;
                            return riemannComponents(n) - ricciComponents(n);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var n = dimN;

                            viz.screenText('Curvature Decomposition in Dimension ' + n, viz.width / 2, 25, viz.colors.white, 16);

                            var rComp = riemannComponents(n);
                            var ricComp = ricciComponents(n);
                            var wComp = weylComponents(n);
                            var scalarComp = 1;
                            var tracelessRicComp = ricComp - scalarComp;

                            // Draw hierarchy as boxes
                            var boxW = 160, boxH = 55;
                            var cx = viz.width / 2;

                            // Riemann (top)
                            var ry = 65;
                            ctx.fillStyle = viz.colors.purple + '33';
                            ctx.fillRect(cx - boxW / 2, ry, boxW, boxH);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(cx - boxW / 2, ry, boxW, boxH);
                            viz.screenText('Riemann R', cx, ry + 18, viz.colors.purple, 14);
                            viz.screenText(rComp + ' components', cx, ry + 38, viz.colors.text, 11);

                            // Arrow down
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(cx, ry + boxH);
                            ctx.lineTo(cx, ry + boxH + 20);
                            ctx.stroke();
                            viz.screenText('trace', cx + 25, ry + boxH + 10, viz.colors.text, 10);

                            // Three boxes below: Weyl, Traceless Ricci, Scalar
                            var row2Y = ry + boxH + 30;
                            var smallW = 140, smallH = 55;
                            var gap = 20;
                            var totalW = 3 * smallW + 2 * gap;
                            var startX = cx - totalW / 2;

                            // Weyl
                            var weylX = startX;
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.fillRect(weylX, row2Y, smallW, smallH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(weylX, row2Y, smallW, smallH);
                            viz.screenText('Weyl W', weylX + smallW / 2, row2Y + 18, viz.colors.blue, 13);
                            viz.screenText(wComp + ' comp.', weylX + smallW / 2, row2Y + 38, viz.colors.text, 11);

                            // Traceless Ricci
                            var ricX = startX + smallW + gap;
                            ctx.fillStyle = viz.colors.teal + '33';
                            ctx.fillRect(ricX, row2Y, smallW, smallH);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(ricX, row2Y, smallW, smallH);
                            viz.screenText('Traceless Ric', ricX + smallW / 2, row2Y + 18, viz.colors.teal, 13);
                            viz.screenText(tracelessRicComp + ' comp.', ricX + smallW / 2, row2Y + 38, viz.colors.text, 11);

                            // Scalar
                            var scX = startX + 2 * (smallW + gap);
                            ctx.fillStyle = viz.colors.yellow + '33';
                            ctx.fillRect(scX, row2Y, smallW, smallH);
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(scX, row2Y, smallW, smallH);
                            viz.screenText('Scalar S', scX + smallW / 2, row2Y + 18, viz.colors.yellow, 13);
                            viz.screenText(scalarComp + ' comp.', scX + smallW / 2, row2Y + 38, viz.colors.text, 11);

                            // Connecting lines from Riemann to three parts
                            var midpts = [weylX + smallW / 2, ricX + smallW / 2, scX + smallW / 2];
                            var arrowColors = [viz.colors.blue, viz.colors.teal, viz.colors.yellow];
                            for (var i = 0; i < 3; i++) {
                                ctx.strokeStyle = arrowColors[i] + '88';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(cx, ry + boxH + 20);
                                ctx.lineTo(midpts[i], row2Y);
                                ctx.stroke();
                            }

                            // Verification
                            var row3Y = row2Y + smallH + 25;
                            var checkStr = wComp + ' + ' + tracelessRicComp + ' + ' + scalarComp + ' = ' + (wComp + tracelessRicComp + scalarComp);
                            viz.screenText('Check: ' + checkStr + (wComp + tracelessRicComp + scalarComp === rComp ? ' \u2713' : ' \u2717'), cx, row3Y, viz.colors.white, 12);

                            // Notes
                            var noteY = row3Y + 30;
                            if (n === 2) {
                                viz.screenText('In dimension 2: only scalar curvature (Gaussian curvature)', cx, noteY, viz.colors.text, 11);
                            } else if (n === 3) {
                                viz.screenText('In dimension 3: Weyl vanishes; Riemann is determined by Ricci', cx, noteY, viz.colors.text, 11);
                            } else if (n === 4) {
                                viz.screenText('In dimension 4: Weyl has 10 components (gravitational radiation)', cx, noteY, viz.colors.text, 11);
                            }

                            // Physical interpretation
                            var physY = noteY + 25;
                            viz.screenText('Weyl = tidal forces / grav. waves', weylX + smallW / 2, physY, viz.colors.blue, 10);
                            viz.screenText('Ricci = matter content', ricX + smallW / 2, physY, viz.colors.teal, 10);
                            viz.screenText('Scalar = avg. curvature', scX + smallW / 2, physY, viz.colors.yellow, 10);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-einstein-preview',
                    title: "Einstein's Field Equations",
                    description: 'A schematic view of Einstein\'s equations: geometry (Ricci, scalar curvature) equals matter-energy content. The contracted Bianchi identity ensures energy-momentum conservation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var Lambda = 0;
                        VizEngine.createSlider(controls, '\u039b (cosmological const.)', -1, 1, 0, 0.05, function(v) { Lambda = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText("Einstein's Field Equations", viz.width / 2, 25, viz.colors.white, 16);

                            // Main equation
                            var eqY = 75;
                            var lam = Lambda.toFixed(2);
                            var eqStr = Lambda === 0
                                ? 'R\u1d62\u2c7c - \u00bdSg\u1d62\u2c7c = 8\u03c0T\u1d62\u2c7c'
                                : 'R\u1d62\u2c7c - \u00bdSg\u1d62\u2c7c + ' + lam + 'g\u1d62\u2c7c = 8\u03c0T\u1d62\u2c7c';
                            viz.screenText(eqStr, viz.width / 2, eqY, viz.colors.yellow, 18);

                            // Geometry side
                            var geoX = viz.width * 0.25;
                            var physX = viz.width * 0.75;
                            var sideY = 130;

                            // Geometry box
                            ctx.fillStyle = viz.colors.purple + '22';
                            ctx.fillRect(geoX - 100, sideY, 200, 180);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(geoX - 100, sideY, 200, 180);
                            viz.screenText('GEOMETRY', geoX, sideY + 20, viz.colors.purple, 14);

                            viz.screenText('G\u1d62\u2c7c = R\u1d62\u2c7c - \u00bdSg\u1d62\u2c7c', geoX, sideY + 55, viz.colors.white, 13);
                            viz.screenText('Einstein tensor', geoX, sideY + 75, viz.colors.text, 11);

                            viz.screenText('R\u1d62\u2c7c : Ricci curvature', geoX, sideY + 105, viz.colors.teal, 11);
                            viz.screenText('S : scalar curvature', geoX, sideY + 122, viz.colors.yellow, 11);
                            viz.screenText('g\u1d62\u2c7c : metric tensor', geoX, sideY + 139, viz.colors.blue, 11);
                            viz.screenText('\u2207\u2071G\u1d62\u2c7c = 0 (Bianchi)', geoX, sideY + 162, viz.colors.green, 11);

                            // Physics box
                            ctx.fillStyle = viz.colors.orange + '22';
                            ctx.fillRect(physX - 100, sideY, 200, 180);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(physX - 100, sideY, 200, 180);
                            viz.screenText('MATTER-ENERGY', physX, sideY + 20, viz.colors.orange, 14);

                            viz.screenText('8\u03c0T\u1d62\u2c7c', physX, sideY + 55, viz.colors.white, 13);
                            viz.screenText('Stress-energy tensor', physX, sideY + 75, viz.colors.text, 11);

                            viz.screenText('T\u2070\u2070 : energy density', physX, sideY + 105, viz.colors.orange, 11);
                            viz.screenText('T\u2070\u2071 : momentum density', physX, sideY + 122, viz.colors.orange, 11);
                            viz.screenText('T\u2071\u2c7c : stress (pressure)', physX, sideY + 139, viz.colors.orange, 11);
                            viz.screenText('\u2207\u2071T\u1d62\u2c7c = 0 (conservation)', physX, sideY + 162, viz.colors.green, 11);

                            // Equals sign
                            viz.screenText('=', viz.width / 2, sideY + 55, viz.colors.white, 24);

                            // Arrow showing duality
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            ctx.moveTo(geoX + 100, sideY + 90);
                            ctx.lineTo(physX - 100, sideY + 90);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Bottom quote
                            var quoteY = sideY + 210;
                            viz.screenText('"Matter tells spacetime how to curve;', viz.width / 2, quoteY, viz.colors.text, 12);
                            viz.screenText('spacetime tells matter how to move."', viz.width / 2, quoteY + 18, viz.colors.text, 12);
                            viz.screenText('-- John Archibald Wheeler', viz.width / 2, quoteY + 38, viz.colors.text, 10);

                            if (Lambda !== 0) {
                                viz.screenText('\u039b ' + (Lambda > 0 ? '> 0: accelerating expansion (dark energy)' : '< 0: contracting universe'), viz.width / 2, quoteY + 58, viz.colors.yellow, 11);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'State the Gauss-Bonnet theorem for a compact surface and use it to show that a torus cannot have everywhere-positive Gaussian curvature.',
                    hint: 'The Euler characteristic of a torus is \\(\\chi(T^2) = 0\\).',
                    solution: 'Gauss-Bonnet: \\(\\int_M K\\, dA = 2\\pi\\chi(M)\\). For the torus, \\(\\chi(T^2) = 0\\), so \\(\\int_{T^2} K\\, dA = 0\\). If \\(K > 0\\) everywhere, the integral would be strictly positive, a contradiction. Hence any metric on the torus must have regions of non-positive curvature.'
                },
                {
                    question: "In the Bonnet-Myers theorem, if \\(\\text{Ric} \\geq 2g\\) (corresponding to \\(\\kappa = 1, n = 3\\)), what is the upper bound on the manifold's diameter?",
                    hint: 'The diameter bound is \\(\\pi / \\sqrt{\\kappa}\\).',
                    solution: 'With \\(\\kappa = 1\\), the Bonnet-Myers diameter bound is \\(\\pi / \\sqrt{1} = \\pi\\). This is sharp: the unit sphere \\(S^3\\) has \\(\\text{Ric} = 2g\\) and diameter exactly \\(\\pi\\) (the distance between antipodal points).'
                }
            ]
        }
    ]
});
