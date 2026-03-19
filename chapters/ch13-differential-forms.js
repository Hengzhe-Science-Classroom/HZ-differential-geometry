window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Differential Forms & Integration',
    subtitle: 'The language of integration on manifolds',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Differential Forms?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Differential Forms?',
            content: `
<h2>Why Differential Forms?</h2>

<div class="env-block intuition">
    <div class="env-title">The Problem with Classical Integration</div>
    <div class="env-body">
        <p>In vector calculus, you learned three different integral theorems: Green's theorem relates a line integral to a double integral, Gauss's divergence theorem relates a surface integral to a triple integral, and Stokes's theorem relates a line integral to a surface integral. These theorems look different, use different notation, and seem to require different proofs. But they are all the same theorem.</p>
        <p>Differential forms are the language that reveals this unity. A single statement, \\(\\int_M d\\omega = \\int_{\\partial M} \\omega\\), contains all three classical theorems as special cases.</p>
    </div>
</div>

<p>Beyond unification, differential forms solve a practical problem: how do you integrate on a curved manifold? On \\(\\mathbb{R}^n\\), the expression \\(\\int f(x)\\,dx\\) makes sense because \\(dx\\) has a well-defined meaning. But on a sphere or a torus, there is no global coordinate system, so "\\(dx\\)" is meaningless. Differential forms provide coordinate-independent objects that can be integrated over oriented manifolds.</p>

<h3>What a Differential Form Is, Informally</h3>

<p>A \\(k\\)-form is a machine that eats \\(k\\) tangent vectors at a point and outputs a number, doing so in a way that is:</p>
<ul>
    <li><strong>Multilinear</strong>: linear in each input separately.</li>
    <li><strong>Alternating</strong>: swapping two inputs flips the sign.</li>
    <li><strong>Smooth</strong>: the output varies smoothly as you move across the manifold.</li>
</ul>

<p>A 0-form is just a smooth function. A 1-form eats one vector and returns a number (think of the work done by a force along an infinitesimal displacement). A 2-form eats two vectors and returns a number (think of the flux through the parallelogram they span).</p>

<h3>From Vectors to Covectors</h3>

<p>In Chapter 12, we built the tangent space \\(T_pM\\) at each point. Its dual space, denoted \\(T_p^*M\\), consists of all linear maps \\(\\alpha: T_pM \\to \\mathbb{R}\\). An element of \\(T_p^*M\\) is called a <em>covector</em> or <em>cotangent vector</em>. A 1-form is a smooth assignment of a covector to each point of the manifold.</p>

<p>If \\((x^1, \\ldots, x^n)\\) are local coordinates, the coordinate differentials \\(dx^1, \\ldots, dx^n\\) form a basis for \\(T_p^*M\\), dual to the coordinate basis \\(\\partial/\\partial x^1, \\ldots, \\partial/\\partial x^n\\) of \\(T_pM\\):</p>

\\[
dx^i\\!\\left(\\frac{\\partial}{\\partial x^j}\\right) = \\delta^i_j.
\\]

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The modern theory of differential forms was developed by Elie Cartan in the early 20th century, building on work by Grassmann, Poincare, and others. Cartan's <em>exterior calculus</em> replaced the ad hoc formulas of vector calculus with an elegant algebraic framework that works in any dimension.</p>
    </div>
</div>

<h3>The Road Ahead</h3>

<p>In this chapter, we develop four interconnected tools:</p>
<ol>
    <li><strong>Differential forms and the wedge product</strong> (the algebra)</li>
    <li><strong>The exterior derivative \\(d\\)</strong> (the calculus)</li>
    <li><strong>Pullback</strong> (how forms transform under maps)</li>
    <li><strong>Integration and Stokes's theorem</strong> (the payoff)</li>
</ol>

<p>Together, these give us a coordinate-free framework for integration that works on any smooth manifold.</p>
`,
            exercises: []
        },

        // ================================================================
        // SECTION 2: Differential Forms
        // ================================================================
        {
            id: 'sec-forms',
            title: 'Differential Forms',
            content: `
<h2>Differential Forms</h2>

<h3>1-Forms</h3>

<div class="env-block definition">
    <div class="env-title">Definition 13.1 (1-Form)</div>
    <div class="env-body">
        <p>A <strong>1-form</strong> (or covector field) on a smooth manifold \\(M\\) is a smooth section of the cotangent bundle \\(T^*M\\). That is, \\(\\omega\\) assigns to each point \\(p \\in M\\) a linear map \\(\\omega_p : T_pM \\to \\mathbb{R}\\), varying smoothly with \\(p\\).</p>
        <p>In local coordinates \\((x^1, \\ldots, x^n)\\), a 1-form can be written as</p>
        \\[\\omega = \\sum_{i=1}^n f_i(x) \\, dx^i\\]
        <p>where \\(f_1, \\ldots, f_n\\) are smooth functions.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Differential of a Function</div>
    <div class="env-body">
        <p>Given a smooth function \\(f: M \\to \\mathbb{R}\\), its <em>differential</em> \\(df\\) is a 1-form defined by</p>
        \\[df(v) = v(f) \\quad \\text{for all } v \\in T_pM.\\]
        <p>In coordinates: \\(df = \\sum_{i=1}^n \\frac{\\partial f}{\\partial x^i} dx^i\\). This is the gradient, expressed as a covector rather than a vector.</p>
    </div>
</div>

<p>A 1-form \\(\\omega\\) at a point \\(p\\) can be visualized as a stack of parallel hyperplanes in \\(T_pM\\). When a vector \\(v\\) is placed at \\(p\\), the value \\(\\omega_p(v)\\) counts how many hyperplanes \\(v\\) crosses. Longer vectors or denser stacks give larger values.</p>

<div class="viz-placeholder" data-viz="viz-1-form"></div>

<h3>\\(k\\)-Forms and the Exterior Algebra</h3>

<div class="env-block definition">
    <div class="env-title">Definition 13.2 (\\(k\\)-Form)</div>
    <div class="env-body">
        <p>A <strong>\\(k\\)-form</strong> on \\(M\\) is a smooth section of \\(\\Lambda^k(T^*M)\\). At each point \\(p\\), it is an alternating multilinear map</p>
        \\[\\omega_p : \\underbrace{T_pM \\times \\cdots \\times T_pM}_{k \\text{ copies}} \\to \\mathbb{R}.\\]
        <p><em>Alternating</em> means that swapping any two inputs negates the output.</p>
    </div>
</div>

<p>The space of all \\(k\\)-forms on \\(M\\) is denoted \\(\\Omega^k(M)\\). We have:</p>
<ul>
    <li>\\(\\Omega^0(M) = C^\\infty(M)\\) (smooth functions).</li>
    <li>\\(\\Omega^k(M) = 0\\) for \\(k > n = \\dim M\\) (there are not enough independent directions).</li>
    <li>\\(\\dim \\Lambda^k(T_p^*M) = \\binom{n}{k}\\), so \\(k\\)-forms have \\(\\binom{n}{k}\\) independent components.</li>
</ul>

<h3>The Wedge Product</h3>

<div class="env-block definition">
    <div class="env-title">Definition 13.3 (Wedge Product)</div>
    <div class="env-body">
        <p>The <strong>wedge product</strong> \\(\\wedge : \\Omega^k(M) \\times \\Omega^l(M) \\to \\Omega^{k+l}(M)\\) is defined by</p>
        \\[(\\alpha \\wedge \\beta)(v_1, \\ldots, v_{k+l}) = \\frac{1}{k!\\,l!} \\sum_{\\sigma \\in S_{k+l}} \\text{sgn}(\\sigma) \\, \\alpha(v_{\\sigma(1)}, \\ldots, v_{\\sigma(k)}) \\, \\beta(v_{\\sigma(k+1)}, \\ldots, v_{\\sigma(k+l)}).\\]
    </div>
</div>

<p>The key properties of the wedge product are:</p>
<ol>
    <li><strong>Associativity</strong>: \\((\\alpha \\wedge \\beta) \\wedge \\gamma = \\alpha \\wedge (\\beta \\wedge \\gamma)\\).</li>
    <li><strong>Anticommutativity</strong>: \\(\\alpha \\wedge \\beta = (-1)^{kl} \\, \\beta \\wedge \\alpha\\) for \\(\\alpha \\in \\Omega^k, \\beta \\in \\Omega^l\\).</li>
    <li><strong>Bilinearity</strong>: \\((f\\alpha + g\\beta) \\wedge \\gamma = f(\\alpha \\wedge \\gamma) + g(\\beta \\wedge \\gamma)\\).</li>
</ol>

<p>In particular, for 1-forms: \\(dx^i \\wedge dx^j = -dx^j \\wedge dx^i\\), which implies \\(dx^i \\wedge dx^i = 0\\). This is the algebraic reason that forms are alternating.</p>

<div class="env-block example">
    <div class="env-title">Example: 2-Forms in \\(\\mathbb{R}^3\\)</div>
    <div class="env-body">
        <p>A general 2-form on \\(\\mathbb{R}^3\\) is</p>
        \\[\\omega = f_{12}\\, dx \\wedge dy + f_{13}\\, dx \\wedge dz + f_{23}\\, dy \\wedge dz.\\]
        <p>It has \\(\\binom{3}{2} = 3\\) components, just like a vector field. Applied to two vectors \\(u, v \\in \\mathbb{R}^3\\), the 2-form \\(dx \\wedge dy\\) returns the signed area of the projection of the parallelogram spanned by \\(u\\) and \\(v\\) onto the \\(xy\\)-plane.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-2-form"></div>
`,
            visualizations: [
                // --- VIZ: 1-form as stacks of planes ---
                {
                    id: 'viz-1-form',
                    title: '1-Form as a Stack of Planes',
                    description: 'A 1-form at a point is visualized as equally spaced parallel lines (hyperplanes in 2D). A vector v evaluated by the form counts how many lines it crosses. Drag the vector to see the evaluation change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 50 });
                        var vDrag = viz.addDraggable('v', 2.5, 1.5, viz.colors.blue, 8);
                        var formAngle = Math.PI / 4;
                        var formDensity = 1.5;

                        VizEngine.createSlider(controls, 'Form angle', 0, 3.14, formAngle, 0.05, function(v) {
                            formAngle = v;
                        });
                        VizEngine.createSlider(controls, 'Density', 0.5, 3, formDensity, 0.1, function(v) {
                            formDensity = v;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // The 1-form direction (normal to the planes)
                            var nx = Math.cos(formAngle);
                            var ny = Math.sin(formAngle);

                            // Draw stacks of lines perpendicular to (nx, ny)
                            var lineDir = [-ny, nx]; // direction along planes
                            var spacing = 1 / formDensity;

                            for (var k = -15; k <= 15; k++) {
                                var cx = k * spacing * nx;
                                var cy = k * spacing * ny;
                                var x1 = cx + lineDir[0] * 12;
                                var y1 = cy + lineDir[1] * 12;
                                var x2 = cx - lineDir[0] * 12;
                                var y2 = cy - lineDir[1] * 12;
                                var alpha = k === 0 ? 'aa' : '44';
                                viz.drawSegment(x1, y1, x2, y2, viz.colors.purple + alpha, k === 0 ? 1.5 : 0.8);
                            }

                            // Draw vector from origin
                            viz.drawVector(0, 0, vDrag.x, vDrag.y, viz.colors.blue, 'v', 2.5);

                            // Compute evaluation: omega(v) = (nx, ny) . (vx, vy) * density
                            var evaluation = (nx * vDrag.x + ny * vDrag.y) * formDensity;

                            // Show the form covector (small)
                            viz.drawVector(0, 0, nx * formDensity * 0.8, ny * formDensity * 0.8, viz.colors.purple, '\u03C9', 2);

                            // Info
                            viz.screenText('\u03C9(v) = ' + evaluation.toFixed(2), viz.width / 2, 25, viz.colors.white, 16);
                            viz.screenText('The 1-form \u03C9 "counts" how many planes v crosses', viz.width / 2, viz.height - 15, viz.colors.text, 11);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                // --- VIZ: 2-form as area measurement ---
                {
                    id: 'viz-2-form',
                    title: '2-Form: Area Measurement via Wedge Product',
                    description: 'A 2-form dx^dy measures the signed area of the parallelogram spanned by two vectors. Drag u and v to see how the area (and sign) changes. The wedge product is anticommutative: swapping u and v flips the sign.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 50 });
                        var uDrag = viz.addDraggable('u', 2, 0.5, viz.colors.blue, 8);
                        var vDrag = viz.addDraggable('v', 0.5, 2, viz.colors.teal, 8);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Parallelogram
                            var area = uDrag.x * vDrag.y - uDrag.y * vDrag.x;
                            var fillColor = area >= 0 ? viz.colors.green + '33' : viz.colors.red + '33';
                            var strokeColor = area >= 0 ? viz.colors.green : viz.colors.red;
                            viz.drawPolygon(
                                [[0, 0], [uDrag.x, uDrag.y], [uDrag.x + vDrag.x, uDrag.y + vDrag.y], [vDrag.x, vDrag.y]],
                                fillColor, strokeColor, 1.5
                            );

                            // Vectors
                            viz.drawVector(0, 0, uDrag.x, uDrag.y, viz.colors.blue, 'u', 2.5);
                            viz.drawVector(0, 0, vDrag.x, vDrag.y, viz.colors.teal, 'v', 2.5);

                            // Show area
                            var sign = area >= 0 ? '+' : '';
                            viz.screenText('(dx \u2227 dy)(u, v) = u\u2081v\u2082 \u2212 u\u2082v\u2081 = ' + sign + area.toFixed(2), viz.width / 2, 25, viz.colors.white, 14);
                            viz.screenText(area >= 0 ? 'Positive orientation (counterclockwise)' : 'Negative orientation (clockwise)', viz.width / 2, 48, area >= 0 ? viz.colors.green : viz.colors.red, 12);
                            viz.screenText('Signed area of parallelogram = det[u | v]', viz.width / 2, viz.height - 15, viz.colors.text, 11);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\omega = x\\,dy - y\\,dx\\) on \\(\\mathbb{R}^2\\). Compute \\(\\omega_p(v)\\) at the point \\(p = (1, 2)\\) for the vector \\(v = 3\\,\\partial/\\partial x + 4\\,\\partial/\\partial y\\).',
                    hint: 'Substitute: \\(\\omega_p(v) = x \\cdot dy(v) - y \\cdot dx(v)\\), using \\(dx(\\partial/\\partial x) = 1\\), \\(dx(\\partial/\\partial y) = 0\\), etc.',
                    solution: '\\(\\omega_p(v) = 1 \\cdot 4 - 2 \\cdot 3 = 4 - 6 = -2\\).'
                },
                {
                    question: 'Show that \\(dx \\wedge dx = 0\\) directly from the definition of alternating forms.',
                    hint: 'An alternating 2-form \\(\\alpha\\) satisfies \\(\\alpha(v, v) = 0\\) for all \\(v\\). Alternatively, use anticommutativity: \\(\\alpha \\wedge \\alpha = -\\alpha \\wedge \\alpha\\).',
                    solution: 'By anticommutativity: \\(dx \\wedge dx = -dx \\wedge dx\\), so \\(2(dx \\wedge dx) = 0\\), hence \\(dx \\wedge dx = 0\\). Alternatively, \\((dx \\wedge dx)(u, v) = dx(u)dx(v) - dx(v)dx(u) = 0\\).'
                },
                {
                    question: 'On \\(\\mathbb{R}^3\\), compute \\((2\\,dx + 3\\,dy) \\wedge (dx - dz)\\).',
                    hint: 'Distribute and use \\(dx \\wedge dx = 0\\) and anticommutativity.',
                    solution: '\\((2\\,dx + 3\\,dy) \\wedge (dx - dz) = 2\\,dx \\wedge dx - 2\\,dx \\wedge dz + 3\\,dy \\wedge dx - 3\\,dy \\wedge dz = 0 - 2\\,dx \\wedge dz - 3\\,dx \\wedge dy - 3\\,dy \\wedge dz = -3\\,dx \\wedge dy - 2\\,dx \\wedge dz - 3\\,dy \\wedge dz\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Exterior Derivative
        // ================================================================
        {
            id: 'sec-exterior-derivative',
            title: 'The Exterior Derivative',
            content: `
<h2>The Exterior Derivative</h2>

<div class="env-block intuition">
    <div class="env-title">Key Idea</div>
    <div class="env-body">
        <p>The exterior derivative \\(d\\) is a single operator that unifies the gradient, curl, and divergence of vector calculus. It takes a \\(k\\)-form and produces a \\((k+1)\\)-form, raising the "degree" by one. The miracle is that \\(d^2 = 0\\): applying \\(d\\) twice always gives zero. This encodes deep facts like "the curl of a gradient is zero" and "the divergence of a curl is zero."</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 13.4 (Exterior Derivative)</div>
    <div class="env-body">
        <p>The <strong>exterior derivative</strong> is the unique linear map \\(d: \\Omega^k(M) \\to \\Omega^{k+1}(M)\\) satisfying:</p>
        <ol>
            <li><strong>On functions</strong> (\\(k=0\\)): \\(df\\) is the differential of \\(f\\), i.e., \\(df = \\sum_i \\frac{\\partial f}{\\partial x^i} dx^i\\).</li>
            <li><strong>Leibniz rule</strong>: \\(d(\\alpha \\wedge \\beta) = d\\alpha \\wedge \\beta + (-1)^k \\alpha \\wedge d\\beta\\) for \\(\\alpha \\in \\Omega^k\\).</li>
            <li><strong>Nilpotency</strong>: \\(d^2 = d \\circ d = 0\\).</li>
        </ol>
    </div>
</div>

<p>In local coordinates, if \\(\\omega = \\sum_I f_I \\, dx^I\\), then</p>
\\[
d\\omega = \\sum_I \\sum_{j=1}^n \\frac{\\partial f_I}{\\partial x^j} \\, dx^j \\wedge dx^I.
\\]

<h3>The Three Faces of \\(d\\) in \\(\\mathbb{R}^3\\)</h3>

<p>The exterior derivative unifies the classical vector calculus operators. Identifying forms with vector fields and functions via the Euclidean metric:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.1 (\\(d\\) in \\(\\mathbb{R}^3\\))</div>
    <div class="env-body">
        <ul>
            <li>\\(d: \\Omega^0 \\to \\Omega^1\\) is the <strong>gradient</strong>: \\(df = \\frac{\\partial f}{\\partial x}dx + \\frac{\\partial f}{\\partial y}dy + \\frac{\\partial f}{\\partial z}dz\\).</li>
            <li>\\(d: \\Omega^1 \\to \\Omega^2\\) is the <strong>curl</strong>: if \\(\\omega = P\\,dx + Q\\,dy + R\\,dz\\), then \\(d\\omega = (R_y - Q_z)\\,dy \\wedge dz + (P_z - R_x)\\,dz \\wedge dx + (Q_x - P_y)\\,dx \\wedge dy\\).</li>
            <li>\\(d: \\Omega^2 \\to \\Omega^3\\) is the <strong>divergence</strong>: if \\(\\eta = F_1\\,dy \\wedge dz + F_2\\,dz \\wedge dx + F_3\\,dx \\wedge dy\\), then \\(d\\eta = \\left(\\frac{\\partial F_1}{\\partial x} + \\frac{\\partial F_2}{\\partial y} + \\frac{\\partial F_3}{\\partial z}\\right) dx \\wedge dy \\wedge dz\\).</li>
        </ul>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why \\(d^2 = 0\\) Matters</div>
    <div class="env-body">
        <p>The identity \\(d^2 = 0\\) is not just a computational convenience. It encodes:</p>
        <ul>
            <li>\\(\\nabla \\times (\\nabla f) = 0\\) (curl of gradient is zero)</li>
            <li>\\(\\nabla \\cdot (\\nabla \\times F) = 0\\) (divergence of curl is zero)</li>
        </ul>
        <p>These follow from symmetry of mixed partial derivatives: \\(\\frac{\\partial^2 f}{\\partial x^i \\partial x^j} = \\frac{\\partial^2 f}{\\partial x^j \\partial x^i}\\), combined with the antisymmetry \\(dx^i \\wedge dx^j = -dx^j \\wedge dx^i\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-exterior-derivative"></div>
`,
            visualizations: [
                {
                    id: 'viz-exterior-derivative',
                    title: 'The Three Faces of d',
                    description: 'See how the exterior derivative d connects gradient, curl, and divergence in R^3. Each row shows d acting on forms of increasing degree. The sequence 0-forms -> 1-forms -> 2-forms -> 3-forms mirrors functions -> vector fields -> vector fields -> functions.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 450, originX: 0, originY: 0, scale: 1 });

                        var t = 0;

                        function draw(time) {
                            t = time * 0.001;
                            viz.clear();
                            var ctx = viz.ctx;

                            // Title
                            viz.screenText('The Exterior Derivative: d unifies grad, curl, div', viz.width / 2, 22, viz.colors.white, 14);

                            // Layout: three panels showing the chain
                            var boxW = 130, boxH = 55;
                            var arrowW = 50;
                            var totalW = 4 * boxW + 3 * arrowW;
                            var startX = (viz.width - totalW) / 2;
                            var chainY = 75;

                            var labels = ['\u03A9\u2070(M)\nfunctions', '\u03A9\u00B9(M)\n1-forms', '\u03A9\u00B2(M)\n2-forms', '\u03A9\u00B3(M)\n3-forms'];
                            var colors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple];
                            var dLabels = ['d = grad', 'd = curl', 'd = div'];

                            for (var i = 0; i < 4; i++) {
                                var bx = startX + i * (boxW + arrowW);
                                // Box
                                ctx.strokeStyle = colors[i];
                                ctx.lineWidth = 2;
                                ctx.strokeRect(bx, chainY, boxW, boxH);
                                ctx.fillStyle = colors[i] + '22';
                                ctx.fillRect(bx, chainY, boxW, boxH);

                                // Label
                                var lines = labels[i].split('\n');
                                ctx.fillStyle = colors[i];
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(lines[0], bx + boxW / 2, chainY + boxH / 2 - 8);
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(lines[1], bx + boxW / 2, chainY + boxH / 2 + 10);

                                // Arrow
                                if (i < 3) {
                                    var ax1 = bx + boxW + 5;
                                    var ax2 = ax1 + arrowW - 10;
                                    var ay = chainY + boxH / 2;
                                    ctx.strokeStyle = viz.colors.white;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(ax1, ay);
                                    ctx.lineTo(ax2, ay);
                                    ctx.stroke();
                                    // Arrowhead
                                    ctx.beginPath();
                                    ctx.moveTo(ax2 + 8, ay);
                                    ctx.lineTo(ax2, ay - 5);
                                    ctx.lineTo(ax2, ay + 5);
                                    ctx.closePath();
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.fill();
                                    // Label
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(dLabels[i], ax1 + arrowW / 2 - 1, ay - 14);
                                }
                            }

                            // The d^2 = 0 message
                            viz.screenText('d \u2218 d = 0: curl(grad f) = 0, div(curl F) = 0', viz.width / 2, chainY + boxH + 28, viz.colors.yellow, 12);

                            // === Panel 1: Gradient (d of 0-form) ===
                            var pY = 185;
                            viz.screenText('d(0-form) = Gradient', viz.width / 6, pY, viz.colors.blue, 12);
                            // Draw contour lines of f(x,y) = x^2 + y^2 and gradient arrows
                            var cx1 = viz.width / 6, cy1 = pY + 85;
                            var rad = 60;
                            for (var r = 10; r <= rad; r += 15) {
                                ctx.strokeStyle = viz.colors.blue + '44';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(cx1, cy1, r, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                            // Gradient arrows (pointing radially outward)
                            for (var a = 0; a < 8; a++) {
                                var ang = a * Math.PI / 4 + t * 0.3;
                                var gr = 30;
                                var gx1 = cx1 + Math.cos(ang) * (gr - 8);
                                var gy1 = cy1 + Math.sin(ang) * (gr - 8);
                                var gx2 = cx1 + Math.cos(ang) * (gr + 12);
                                var gy2 = cy1 + Math.sin(ang) * (gr + 12);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(gx1, gy1);
                                ctx.lineTo(gx2, gy2);
                                ctx.stroke();
                                // Small arrowhead
                                var anga = Math.atan2(gy2 - gy1, gx2 - gx1);
                                ctx.beginPath();
                                ctx.moveTo(gx2, gy2);
                                ctx.lineTo(gx2 - 6 * Math.cos(anga - 0.4), gy2 - 6 * Math.sin(anga - 0.4));
                                ctx.lineTo(gx2 - 6 * Math.cos(anga + 0.4), gy2 - 6 * Math.sin(anga + 0.4));
                                ctx.closePath();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fill();
                            }
                            viz.screenText('f = x\u00B2+y\u00B2', cx1, cy1 + rad + 20, viz.colors.text, 10);
                            viz.screenText('\u2207f', cx1, cy1 - rad - 10, viz.colors.blue, 11);

                            // === Panel 2: Curl (d of 1-form) ===
                            var cx2 = viz.width / 2, cy2 = pY + 85;
                            viz.screenText('d(1-form) = Curl', viz.width / 2, pY, viz.colors.teal, 12);
                            // Show rotation field and curl arrow
                            for (var ai = 0; ai < 8; ai++) {
                                var ang2 = ai * Math.PI / 4 + t * 0.5;
                                var crad = 35;
                                var tx = cx2 + Math.cos(ang2) * crad;
                                var ty = cy2 + Math.sin(ang2) * crad;
                                // Tangent direction (perpendicular to radial, CCW)
                                var tlen = 12;
                                var tdx = -Math.sin(ang2) * tlen;
                                var tdy = Math.cos(ang2) * tlen;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(tx - tdx * 0.3, ty - tdy * 0.3);
                                ctx.lineTo(tx + tdx, ty + tdy);
                                ctx.stroke();
                                var anga2 = Math.atan2(tdy, tdx);
                                ctx.beginPath();
                                ctx.moveTo(tx + tdx, ty + tdy);
                                ctx.lineTo(tx + tdx - 5 * Math.cos(anga2 - 0.5), ty + tdy - 5 * Math.sin(anga2 - 0.5));
                                ctx.lineTo(tx + tdx - 5 * Math.cos(anga2 + 0.5), ty + tdy - 5 * Math.sin(anga2 + 0.5));
                                ctx.closePath();
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fill();
                            }
                            // Curl symbol in center
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('\u2299', cx2, cy2); // dot = curl pointing out of page
                            viz.screenText('F = (-y, x)', cx2, cy2 + rad + 20, viz.colors.text, 10);
                            viz.screenText('curl F = 2k\u0302', cx2, cy2 - rad - 10, viz.colors.teal, 11);

                            // === Panel 3: Divergence (d of 2-form) ===
                            var cx3 = 5 * viz.width / 6, cy3 = pY + 85;
                            viz.screenText('d(2-form) = Divergence', 5 * viz.width / 6, pY, viz.colors.orange, 12);
                            // Radial field = divergence source
                            for (var ai3 = 0; ai3 < 12; ai3++) {
                                var ang3 = ai3 * Math.PI / 6;
                                var sx1 = cx3 + Math.cos(ang3) * 8;
                                var sy1 = cy3 + Math.sin(ang3) * 8;
                                var dvLen = 18 + 8 * Math.sin(t + ai3);
                                var sx2 = cx3 + Math.cos(ang3) * (8 + dvLen);
                                var sy2 = cy3 + Math.sin(ang3) * (8 + dvLen);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(sx1, sy1);
                                ctx.lineTo(sx2, sy2);
                                ctx.stroke();
                                var anga3 = ang3;
                                ctx.beginPath();
                                ctx.moveTo(sx2, sy2);
                                ctx.lineTo(sx2 - 5 * Math.cos(anga3 - 0.4), sy2 - 5 * Math.sin(anga3 - 0.4));
                                ctx.lineTo(sx2 - 5 * Math.cos(anga3 + 0.4), sy2 - 5 * Math.sin(anga3 + 0.4));
                                ctx.closePath();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fill();
                            }
                            // Source dot
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.arc(cx3, cy3, 5, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('F = (x, y, z)', cx3, cy3 + rad + 20, viz.colors.text, 10);
                            viz.screenText('div F = 3', cx3, cy3 - rad - 10, viz.colors.orange, 11);

                            // Bottom note
                            viz.screenText('All three operators are the same d, acting on forms of different degree', viz.width / 2, viz.height - 18, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(d\\omega\\) where \\(\\omega = xy\\,dx + z^2\\,dy\\) on \\(\\mathbb{R}^3\\).',
                    hint: 'Apply \\(d\\omega = \\sum_j \\frac{\\partial f_i}{\\partial x^j} dx^j \\wedge dx^i\\) to each term. Remember \\(dx \\wedge dx = 0\\).',
                    solution: '\\(d(xy\\,dx) = y\\,dy \\wedge dx + x\\,dx \\wedge dx + 0 = -y\\,dx \\wedge dy\\). \\(d(z^2\\,dy) = 2z\\,dz \\wedge dy = -2z\\,dy \\wedge dz\\). So \\(d\\omega = -y\\,dx \\wedge dy - 2z\\,dy \\wedge dz\\).'
                },
                {
                    question: 'Verify \\(d^2 = 0\\) for \\(f(x,y) = x^2 y + e^z\\) by computing \\(d(df)\\).',
                    hint: 'First compute \\(df\\), then apply \\(d\\) again. All second-order terms cancel due to antisymmetry.',
                    solution: '\\(df = 2xy\\,dx + x^2\\,dy + e^z\\,dz\\). Then \\(d(df) = (2x\\,dy - 2x\\,dy) \\wedge \\cdots = 0\\). Explicitly: \\(d(2xy\\,dx) = 2x\\,dy \\wedge dx\\), \\(d(x^2\\,dy) = 2x\\,dx \\wedge dy\\), \\(d(e^z\\,dz) = e^z\\,dz \\wedge dz = 0\\). Sum: \\(2x\\,dy \\wedge dx + 2x\\,dx \\wedge dy = -2x\\,dx \\wedge dy + 2x\\,dx \\wedge dy = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Pullback of Forms
        // ================================================================
        {
            id: 'sec-pullback',
            title: 'Pullback of Forms',
            content: `
<h2>Pullback of Forms</h2>

<div class="env-block intuition">
    <div class="env-title">Key Idea</div>
    <div class="env-body">
        <p>If \\(F: M \\to N\\) is a smooth map and \\(\\omega\\) is a differential form on \\(N\\), we can "pull back" \\(\\omega\\) to a form \\(F^*\\omega\\) on \\(M\\). The pullback goes in the opposite direction from \\(F\\) itself: \\(F\\) maps points forward from \\(M\\) to \\(N\\), but \\(F^*\\) pulls forms backward from \\(N\\) to \\(M\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 13.5 (Pullback)</div>
    <div class="env-body">
        <p>Let \\(F: M \\to N\\) be smooth and \\(\\omega \\in \\Omega^k(N)\\). The <strong>pullback</strong> \\(F^*\\omega \\in \\Omega^k(M)\\) is defined by</p>
        \\[(F^*\\omega)_p(v_1, \\ldots, v_k) = \\omega_{F(p)}(dF_p(v_1), \\ldots, dF_p(v_k))\\]
        <p>where \\(dF_p: T_pM \\to T_{F(p)}N\\) is the differential (pushforward) of \\(F\\).</p>
    </div>
</div>

<p>In coordinates, if \\(F = (y^1(x), \\ldots, y^m(x))\\) and \\(\\omega = \\sum_I g_I(y)\\,dy^I\\), then</p>
\\[
F^*\\omega = \\sum_I (g_I \\circ F)(x) \\, d(y^{i_1} \\circ F) \\wedge \\cdots \\wedge d(y^{i_k} \\circ F).
\\]

<h3>Properties of Pullback</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.2 (Naturality of Pullback)</div>
    <div class="env-body">
        <p>Let \\(F: M \\to N\\) be smooth. Then:</p>
        <ol>
            <li>\\(F^*(\\omega + \\eta) = F^*\\omega + F^*\\eta\\) (linearity).</li>
            <li>\\(F^*(\\omega \\wedge \\eta) = F^*\\omega \\wedge F^*\\eta\\) (preserves wedge product).</li>
            <li>\\(F^*(d\\omega) = d(F^*\\omega)\\) (<strong>naturality</strong>: pullback commutes with \\(d\\)).</li>
            <li>\\((G \\circ F)^* = F^* \\circ G^*\\) (contravariant functoriality).</li>
        </ol>
    </div>
</div>

<p>Property (3) is remarkable: it says that exterior differentiation is a "natural" operation, independent of coordinates. Property (4) means the pullback reverses the order of composition, making it a <em>contravariant functor</em>.</p>

<div class="env-block example">
    <div class="env-title">Example: Pullback to Polar Coordinates</div>
    <div class="env-body">
        <p>Let \\(F: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) be \\(F(r, \\theta) = (r\\cos\\theta, r\\sin\\theta)\\). Pull back \\(\\omega = dx \\wedge dy\\):</p>
        <p>We have \\(dx = \\cos\\theta\\,dr - r\\sin\\theta\\,d\\theta\\) and \\(dy = \\sin\\theta\\,dr + r\\cos\\theta\\,d\\theta\\). Therefore:</p>
        \\[F^*(dx \\wedge dy) = (\\cos\\theta\\,dr - r\\sin\\theta\\,d\\theta) \\wedge (\\sin\\theta\\,dr + r\\cos\\theta\\,d\\theta) = r\\,dr \\wedge d\\theta.\\]
        <p>This recovers the familiar area element \\(r\\,dr\\,d\\theta\\) in polar coordinates.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-pullback-form"></div>
`,
            visualizations: [
                {
                    id: 'viz-pullback-form',
                    title: 'Pullback of a Form',
                    description: 'A map F sends points from the source (left) to the target (right). The pullback F* pulls a 1-form on the target back to a 1-form on the source. Watch how the "stacks" of the form transform under the pullback.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, originX: 0, originY: 0, scale: 1 });

                        var mapType = 0; // 0 = linear stretch, 1 = rotation, 2 = polar
                        VizEngine.createButton(controls, 'Linear', function() { mapType = 0; draw(); });
                        VizEngine.createButton(controls, 'Rotation', function() { mapType = 1; draw(); });
                        VizEngine.createButton(controls, 'Polar', function() { mapType = 2; draw(); });

                        function applyMap(x, y) {
                            if (mapType === 0) return [2 * x, y]; // stretch x by 2
                            if (mapType === 1) { // rotate 45 deg
                                var c = Math.cos(Math.PI / 4), s = Math.sin(Math.PI / 4);
                                return [c * x - s * y, s * x + c * y];
                            }
                            // polar-ish
                            var r = Math.sqrt(x * x + y * y);
                            var th = Math.atan2(y, x);
                            return [r * Math.cos(th + 0.5), r * Math.sin(th + 0.5)];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var lx = 140, rx = 420; // centers of source and target panels
                            var cy = 220;
                            var panelR = 100;

                            // Labels
                            viz.screenText('Source M', lx, 30, viz.colors.blue, 14);
                            viz.screenText('Target N', rx, 30, viz.colors.teal, 14);
                            viz.screenText('F*\u03C9 (pullback)', lx, cy + panelR + 30, viz.colors.purple, 12);
                            viz.screenText('\u03C9 (original)', rx, cy + panelR + 30, viz.colors.teal, 12);

                            // Arrow F: source -> target
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(lx + panelR + 15, 30);
                            ctx.lineTo(rx - panelR - 15, 30);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(rx - panelR - 15, 30);
                            ctx.lineTo(rx - panelR - 22, 25);
                            ctx.lineTo(rx - panelR - 22, 35);
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.white;
                            ctx.fill();
                            viz.screenText('F', (lx + rx) / 2, 22, viz.colors.yellow, 13);

                            // Arrow F*: target -> source (below)
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(rx - panelR - 15, cy + panelR + 30);
                            ctx.lineTo(lx + panelR + 15, cy + panelR + 30);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.beginPath();
                            ctx.moveTo(lx + panelR + 15, cy + panelR + 30);
                            ctx.lineTo(lx + panelR + 22, cy + panelR + 25);
                            ctx.lineTo(lx + panelR + 22, cy + panelR + 35);
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fill();
                            viz.screenText('F*', (lx + rx) / 2, cy + panelR + 22, viz.colors.purple, 13);

                            // Draw target form (horizontal lines = dy)
                            var formSpacing = 20;
                            for (var k = -5; k <= 5; k++) {
                                var yy = cy + k * formSpacing;
                                if (Math.abs(yy - cy) > panelR) continue;
                                ctx.strokeStyle = viz.colors.teal + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(rx - panelR, yy);
                                ctx.lineTo(rx + panelR, yy);
                                ctx.stroke();
                            }
                            // Target boundary
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(rx, cy, panelR, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw pullback form on source: lines that are preimages of horizontal lines
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(lx, cy, panelR, 0, Math.PI * 2);
                            ctx.clip();

                            // Sample grid and draw contours of F_y(x, y) = const
                            var res = 2;
                            for (var k2 = -5; k2 <= 5; k2++) {
                                var targetY = k2 * formSpacing;
                                ctx.strokeStyle = viz.colors.purple + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var sx = -panelR; sx <= panelR; sx += res) {
                                    // Find y such that F(sx_math, y_math).y = targetY_math
                                    // Solve numerically for each column
                                    for (var sy = -panelR; sy <= panelR; sy += res) {
                                        var mx = sx / panelR * 2.5;
                                        var my = -sy / panelR * 2.5;
                                        var fp = applyMap(mx, my);
                                        var fy_screen = fp[1] * panelR / 2.5;
                                        if (Math.abs(-fy_screen - targetY) < res * 0.8) {
                                            var px = lx + sx;
                                            var py = cy + sy;
                                            if (!started) { ctx.moveTo(px, py); started = true; }
                                            else ctx.lineTo(px, py);
                                        }
                                    }
                                }
                                ctx.stroke();
                            }
                            ctx.restore();

                            // Source boundary
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(lx, cy, panelR, 0, Math.PI * 2);
                            ctx.stroke();

                            // Map name
                            var mapNames = ['F(x,y) = (2x, y)', 'F(x,y) = R\u2084\u2085(x,y)', 'F(x,y) = twist'];
                            viz.screenText(mapNames[mapType], viz.width / 2, viz.height - 15, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(F(u, v) = (u^2, uv)\\) and \\(\\omega = x\\,dy\\) on \\(\\mathbb{R}^2\\). Compute \\(F^*\\omega\\).',
                    hint: 'Substitute \\(x = u^2\\), \\(y = uv\\), then \\(dy = v\\,du + u\\,dv\\).',
                    solution: '\\(F^*\\omega = u^2(v\\,du + u\\,dv) = u^2 v\\,du + u^3\\,dv\\).'
                },
                {
                    question: 'Verify naturality \\(F^*(d\\omega) = d(F^*\\omega)\\) for \\(F(t) = (\\cos t, \\sin t)\\) and \\(\\omega = x\\,dy - y\\,dx\\).',
                    hint: 'Compute both sides. For the left side, first find \\(d\\omega\\) then pull back. For the right, first pull back \\(\\omega\\) then differentiate.',
                    solution: 'Left: \\(d\\omega = dx \\wedge dy + dx \\wedge dy = 2\\,dx \\wedge dy\\). \\(F^*(2\\,dx \\wedge dy) = 2(-\\sin t\\,dt) \\wedge (\\cos t\\,dt) = 0\\) since \\(dt \\wedge dt = 0\\). Right: \\(F^*\\omega = \\cos t \\cdot \\cos t\\,dt - \\sin t \\cdot (-\\sin t\\,dt) = (\\cos^2 t + \\sin^2 t)dt = dt\\). Then \\(d(dt) = 0\\). Both sides are zero. (Note: this is because \\(F\\) maps from 1D to 2D, so the 2-form must vanish.)'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Integration on Manifolds
        // ================================================================
        {
            id: 'sec-integration',
            title: 'Integration on Manifolds',
            content: `
<h2>Integration on Manifolds</h2>

<div class="env-block intuition">
    <div class="env-title">Why Orientation Matters</div>
    <div class="env-body">
        <p>In single-variable calculus, \\(\\int_a^b f\\,dx = -\\int_b^a f\\,dx\\): the integral depends on the direction of traversal. On manifolds, this generalizes to <em>orientation</em>. An oriented manifold has a consistent notion of "positive direction" across all its coordinate charts. Without orientation, integration of differential forms is not well-defined (we could only integrate densities, not forms).</p>
    </div>
</div>

<h3>Orientation</h3>

<div class="env-block definition">
    <div class="env-title">Definition 13.6 (Orientation)</div>
    <div class="env-body">
        <p>An <strong>orientation</strong> of an \\(n\\)-dimensional manifold \\(M\\) is a choice of a continuous, nowhere-vanishing \\(n\\)-form \\(\\mu\\) on \\(M\\) (defined up to multiplication by a positive function). Equivalently, it is a choice of compatible orientations on all tangent spaces that varies continuously.</p>
        <p>A manifold is <strong>orientable</strong> if such a choice exists. A manifold together with a chosen orientation is <strong>oriented</strong>.</p>
    </div>
</div>

<p>Not all manifolds are orientable. The Mobius band and the Klein bottle are classic non-orientable examples. Orientability is necessary for integrating differential forms.</p>

<h3>Integration of \\(n\\)-Forms</h3>

<div class="env-block definition">
    <div class="env-title">Definition 13.7 (Integration of a Top Form)</div>
    <div class="env-body">
        <p>Let \\(M\\) be an oriented \\(n\\)-manifold and \\(\\omega \\in \\Omega^n(M)\\) a compactly supported \\(n\\)-form. In an oriented coordinate chart \\((U, \\varphi)\\) where \\(\\omega = f(x)\\,dx^1 \\wedge \\cdots \\wedge dx^n\\), define</p>
        \\[\\int_U \\omega = \\int_{\\varphi(U)} f(x^1, \\ldots, x^n) \\, dx^1 \\cdots dx^n.\\]
        <p>For a general \\(\\omega\\) supported across multiple charts, use a partition of unity \\(\\{\\rho_\\alpha\\}\\) subordinate to the atlas:</p>
        \\[\\int_M \\omega = \\sum_\\alpha \\int_{U_\\alpha} \\rho_\\alpha \\, \\omega.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.3 (Well-Definedness of Integration)</div>
    <div class="env-body">
        <p>The integral \\(\\int_M \\omega\\) is independent of the choice of oriented atlas and partition of unity. Under a change of oriented coordinates \\(y = \\varphi(x)\\), the Jacobian determinant is positive (by orientation compatibility), and the change-of-variables formula produces the correct transformation.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Area of the 2-Sphere</div>
    <div class="env-body">
        <p>The standard area form on \\(S^2 \\subset \\mathbb{R}^3\\) is \\(\\omega = \\sin\\phi\\,d\\phi \\wedge d\\theta\\) in spherical coordinates \\((\\phi, \\theta) \\in [0, \\pi] \\times [0, 2\\pi)\\). Then</p>
        \\[\\int_{S^2} \\omega = \\int_0^{2\\pi} \\int_0^\\pi \\sin\\phi \\, d\\phi \\, d\\theta = 2\\pi \\cdot [-\\cos\\phi]_0^\\pi = 2\\pi \\cdot 2 = 4\\pi.\\]
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Explain why the Mobius band is not orientable. (Hint: consider what happens to a chosen orientation as you travel around the center circle.)',
                    hint: 'Follow a consistently oriented frame around the band. When you return to the starting point, the orientation is reversed.',
                    solution: 'As you traverse the center circle of the Mobius band, the strip makes a half-twist. A local orientation (say, a normal vector) returns to the starting point pointing in the opposite direction. Since there is no way to consistently define an orientation at every point, the Mobius band is not orientable.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Stokes's Theorem
        // ================================================================
        {
            id: 'sec-stokes',
            title: 'Stokes\'s Theorem',
            content: `
<h2>Stokes's Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">The Grand Unification</div>
    <div class="env-body">
        <p>Stokes's theorem is the fundamental theorem of calculus in its most general form. Just as \\(\\int_a^b f'(x)\\,dx = f(b) - f(a)\\) relates an integral over an interval to values on its boundary, Stokes's theorem relates an integral over a manifold to an integral over its boundary. Every integral theorem you learned in vector calculus is a special case.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.4 (Stokes's Theorem)</div>
    <div class="env-body">
        <p>Let \\(M\\) be a compact oriented \\(n\\)-dimensional manifold with boundary \\(\\partial M\\) (given the induced orientation), and let \\(\\omega \\in \\Omega^{n-1}(M)\\). Then</p>
        \\[\\boxed{\\int_M d\\omega = \\int_{\\partial M} \\omega.}\\]
    </div>
</div>

<p>This single equation contains, as special cases:</p>

<h3>The Classical Special Cases</h3>

<div class="env-block example">
    <div class="env-title">Case 1: The Fundamental Theorem of Calculus (\\(n = 1\\))</div>
    <div class="env-body">
        <p>\\(M = [a, b]\\), \\(\\omega = f\\) (a 0-form), \\(d\\omega = f'(x)\\,dx\\):</p>
        \\[\\int_{[a,b]} f'(x)\\,dx = f(b) - f(a) = \\int_{\\partial[a,b]} f.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Case 2: Green's Theorem (\\(n = 2\\))</div>
    <div class="env-body">
        <p>\\(M \\subset \\mathbb{R}^2\\) a region, \\(\\omega = P\\,dx + Q\\,dy\\), \\(d\\omega = (Q_x - P_y)\\,dx \\wedge dy\\):</p>
        \\[\\iint_M (Q_x - P_y)\\,dx\\,dy = \\oint_{\\partial M} P\\,dx + Q\\,dy.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Case 3: Classical Stokes's Theorem (Surface in \\(\\mathbb{R}^3\\))</div>
    <div class="env-body">
        <p>\\(M\\) an oriented surface in \\(\\mathbb{R}^3\\), \\(\\omega\\) a 1-form (corresponding to a vector field \\(F\\)):</p>
        \\[\\iint_M (\\nabla \\times F) \\cdot dS = \\oint_{\\partial M} F \\cdot dr.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Case 4: Gauss's Divergence Theorem (\\(n = 3\\))</div>
    <div class="env-body">
        <p>\\(M \\subset \\mathbb{R}^3\\) a solid region, \\(\\omega\\) a 2-form (corresponding to a vector field \\(F\\)):</p>
        \\[\\iiint_M \\nabla \\cdot F\\,dV = \\oiint_{\\partial M} F \\cdot dA.\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-stokes-theorem"></div>
`,
            visualizations: [
                {
                    id: 'viz-stokes-theorem',
                    title: 'Stokes\'s Theorem: The Grand Unification',
                    description: 'Animated visualization showing how Green\'s, Classical Stokes\'s, and Gauss\'s theorems are all special cases of one theorem: the integral of d-omega over M equals the integral of omega over the boundary of M.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 450, originX: 0, originY: 0, scale: 1 });

                        var caseIdx = 0;
                        var caseLabels = ['FTC (n=1)', 'Green (n=2)', 'Stokes (n=2 in R\u00B3)', 'Gauss (n=3)'];
                        var caseBtn;

                        VizEngine.createButton(controls, 'Next Case', function() {
                            caseIdx = (caseIdx + 1) % 4;
                        });

                        function draw(time) {
                            var t = time * 0.001;
                            viz.clear();
                            var ctx = viz.ctx;

                            // Title
                            viz.screenText('\u222B_M d\u03C9 = \u222B_{\u2202M} \u03C9', viz.width / 2, 25, viz.colors.yellow, 18);
                            viz.screenText('Case: ' + caseLabels[caseIdx], viz.width / 2, 50, viz.colors.white, 13);

                            var cx = viz.width / 2, cy = 250;

                            if (caseIdx === 0) {
                                // FTC: interval [a,b]
                                var aX = cx - 150, bX = cx + 150, lineY = cy;
                                // The interval
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 4;
                                ctx.beginPath();
                                ctx.moveTo(aX, lineY);
                                ctx.lineTo(bX, lineY);
                                ctx.stroke();

                                // Boundary points
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(aX, lineY, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(bX, lineY, 8, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('a', aX, lineY + 22, viz.colors.orange, 14);
                                viz.screenText('b', bX, lineY + 22, viz.colors.orange, 14);
                                viz.screenText('M = [a, b]', cx, lineY - 25, viz.colors.blue, 13);
                                viz.screenText('\u2202M = {a, b}', cx, lineY + 45, viz.colors.orange, 13);

                                // Animated integral sweep
                                var sweepX = aX + ((t * 50) % 300);
                                if (sweepX <= bX) {
                                    ctx.fillStyle = viz.colors.teal + '44';
                                    ctx.fillRect(aX, lineY - 12, sweepX - aX, 24);
                                }

                                viz.screenText('\u222B\u2090\u1D47 f\'(x) dx = f(b) - f(a)', cx, cy + 90, viz.colors.white, 14);
                                viz.screenText('\u03C9 = f (0-form),  d\u03C9 = f\'dx (1-form)', cx, cy + 115, viz.colors.text, 11);

                            } else if (caseIdx === 1) {
                                // Green's theorem: 2D region
                                // Draw a region
                                ctx.fillStyle = viz.colors.blue + '22';
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                for (var i = 0; i <= 100; i++) {
                                    var th = 2 * Math.PI * i / 100;
                                    var r = 80 + 20 * Math.cos(3 * th) + 10 * Math.sin(2 * th);
                                    var px = cx + r * Math.cos(th);
                                    var py = cy + r * Math.sin(th);
                                    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                }
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();

                                // Animated circulation arrows on boundary
                                for (var j = 0; j < 8; j++) {
                                    var th2 = 2 * Math.PI * j / 8 + t * 0.5;
                                    var r2 = 80 + 20 * Math.cos(3 * th2) + 10 * Math.sin(2 * th2);
                                    var ax = cx + r2 * Math.cos(th2);
                                    var ay = cy + r2 * Math.sin(th2);
                                    // Tangent direction
                                    var dt = 0.1;
                                    var r2n = 80 + 20 * Math.cos(3 * (th2 + dt)) + 10 * Math.sin(2 * (th2 + dt));
                                    var tdx = (r2n * Math.cos(th2 + dt) - r2 * Math.cos(th2));
                                    var tdy = (r2n * Math.sin(th2 + dt) - r2 * Math.sin(th2));
                                    var tl = Math.sqrt(tdx * tdx + tdy * tdy);
                                    if (tl > 0) { tdx = tdx / tl * 15; tdy = tdy / tl * 15; }
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + tdx, ay + tdy); ctx.stroke();
                                    var anga = Math.atan2(tdy, tdx);
                                    ctx.beginPath();
                                    ctx.moveTo(ax + tdx, ay + tdy);
                                    ctx.lineTo(ax + tdx - 5 * Math.cos(anga - 0.4), ay + tdy - 5 * Math.sin(anga - 0.4));
                                    ctx.lineTo(ax + tdx - 5 * Math.cos(anga + 0.4), ay + tdy - 5 * Math.sin(anga + 0.4));
                                    ctx.closePath();
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.fill();
                                }

                                viz.screenText('M (region)', cx, cy - 5, viz.colors.blue, 12);
                                viz.screenText('\u2202M (boundary)', cx + 100, cy - 80, viz.colors.orange, 11);

                                viz.screenText('\u222C_M (Q\u2093 - P\u2099) dA = \u222E_{\u2202M} P dx + Q dy', cx, cy + 130, viz.colors.white, 13);

                            } else if (caseIdx === 2) {
                                // Classical Stokes: surface with boundary curve
                                // Draw a "surface" as an ellipse
                                ctx.fillStyle = viz.colors.teal + '22';
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.ellipse(cx, cy, 120, 70, -0.2, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.stroke();

                                // Normal vectors on surface
                                for (var ni = 0; ni < 5; ni++) {
                                    for (var nj = 0; nj < 3; nj++) {
                                        var nx2 = cx - 80 + ni * 40 + 10 * Math.sin(t + nj);
                                        var ny2 = cy - 30 + nj * 30;
                                        // Check if inside ellipse
                                        var ex = (nx2 - cx) / 120, ey = (ny2 - cy) / 70;
                                        if (ex * ex + ey * ey < 0.75) {
                                            ctx.strokeStyle = viz.colors.purple + 'aa';
                                            ctx.lineWidth = 1.5;
                                            ctx.beginPath();
                                            ctx.moveTo(nx2, ny2);
                                            ctx.lineTo(nx2 + 3, ny2 - 22);
                                            ctx.stroke();
                                            ctx.beginPath();
                                            ctx.moveTo(nx2 + 3, ny2 - 22);
                                            ctx.lineTo(nx2 - 2, ny2 - 17);
                                            ctx.lineTo(nx2 + 7, ny2 - 17);
                                            ctx.closePath();
                                            ctx.fillStyle = viz.colors.purple + 'aa';
                                            ctx.fill();
                                        }
                                    }
                                }

                                // Circulation on boundary
                                for (var k = 0; k < 10; k++) {
                                    var ka = 2 * Math.PI * k / 10 + t * 0.5;
                                    var kx = cx + 120 * Math.cos(ka) * Math.cos(-0.2) - 70 * Math.sin(ka) * Math.sin(-0.2);
                                    var ky = cy + 120 * Math.cos(ka) * Math.sin(-0.2) + 70 * Math.sin(ka) * Math.cos(-0.2);
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath(); ctx.arc(kx, ky, 2.5, 0, Math.PI * 2); ctx.fill();
                                }

                                viz.screenText('S (surface)', cx, cy + 5, viz.colors.teal, 12);
                                viz.screenText('\u2202S (boundary curve)', cx, cy + 85, viz.colors.orange, 11);
                                viz.screenText('\u222C_S (\u2207\u00D7F)\u00B7dS = \u222E_{\u2202S} F\u00B7dr', cx, cy + 125, viz.colors.white, 13);

                            } else {
                                // Gauss: 3D region (drawn as a "blob")
                                // Draw a filled shape
                                ctx.fillStyle = viz.colors.green + '22';
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                for (var gi = 0; gi <= 100; gi++) {
                                    var gth = 2 * Math.PI * gi / 100;
                                    var gr = 90 + 15 * Math.cos(4 * gth);
                                    var gpx = cx + gr * Math.cos(gth);
                                    var gpy = cy + gr * Math.sin(gth) * 0.75;
                                    gi === 0 ? ctx.moveTo(gpx, gpy) : ctx.lineTo(gpx, gpy);
                                }
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();

                                // Outward normal arrows on boundary
                                for (var fi = 0; fi < 12; fi++) {
                                    var fth = 2 * Math.PI * fi / 12 + t * 0.3;
                                    var fr = 90 + 15 * Math.cos(4 * fth);
                                    var fpx = cx + fr * Math.cos(fth);
                                    var fpy = cy + fr * Math.sin(fth) * 0.75;
                                    var fnx = Math.cos(fth) * 20;
                                    var fny = Math.sin(fth) * 0.75 * 20;
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(fpx, fpy); ctx.lineTo(fpx + fnx, fpy + fny); ctx.stroke();
                                    var fna = Math.atan2(fny, fnx);
                                    ctx.beginPath();
                                    ctx.moveTo(fpx + fnx, fpy + fny);
                                    ctx.lineTo(fpx + fnx - 5 * Math.cos(fna - 0.4), fpy + fny - 5 * Math.sin(fna - 0.4));
                                    ctx.lineTo(fpx + fnx - 5 * Math.cos(fna + 0.4), fpy + fny - 5 * Math.sin(fna + 0.4));
                                    ctx.closePath();
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.fill();
                                }

                                viz.screenText('V (solid region)', cx, cy, viz.colors.green, 12);
                                viz.screenText('\u2202V (closed surface)', cx + 95, cy - 70, viz.colors.orange, 11);
                                viz.screenText('\u222D_V \u2207\u00B7F dV = \u222F_{\u2202V} F\u00B7dA', cx, cy + 115, viz.colors.white, 13);
                            }

                            // Bottom
                            viz.screenText('One theorem unifies them all: \u222B_M d\u03C9 = \u222B_{\u2202M} \u03C9', viz.width / 2, viz.height - 18, viz.colors.yellow, 12);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use Stokes\'s theorem to show that if \\(\\omega\\) is an exact form (\\(\\omega = d\\eta\\)) and \\(M\\) is a closed manifold (\\(\\partial M = \\emptyset\\)), then \\(\\int_M \\omega = 0\\).',
                    hint: 'Apply Stokes with \\(\\omega = d\\eta\\) and use \\(\\partial M = \\emptyset\\).',
                    solution: '\\(\\int_M \\omega = \\int_M d\\eta = \\int_{\\partial M} \\eta = \\int_\\emptyset \\eta = 0\\). The integral of any exact form over a closed manifold vanishes.'
                },
                {
                    question: 'Verify Green\'s theorem for \\(\\omega = x^2\\,dy\\) and \\(M\\) the unit disk \\(x^2 + y^2 \\leq 1\\).',
                    hint: 'Compute both sides: \\(\\int_M d\\omega\\) as a double integral and \\(\\int_{\\partial M} \\omega\\) as a line integral.',
                    solution: '\\(d\\omega = 2x\\,dx \\wedge dy\\). Left side: \\(\\int_M 2x\\,dx\\,dy = \\int_0^{2\\pi}\\int_0^1 2r\\cos\\theta \\cdot r\\,dr\\,d\\theta = \\int_0^{2\\pi}\\cos\\theta\\,d\\theta \\cdot \\int_0^1 2r^2\\,dr = 0\\). Right side: parametrize \\(\\partial M\\) as \\((\\cos t, \\sin t)\\), so \\(\\omega = \\cos^2 t \\cdot \\cos t\\,dt\\), and \\(\\int_0^{2\\pi} \\cos^3 t\\,dt = 0\\). Both sides equal 0.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge — De Rham Cohomology & Beyond
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'De Rham Cohomology & What Comes Next',
            content: `
<h2>De Rham Cohomology & What Comes Next</h2>

<div class="env-block intuition">
    <div class="env-title">Closed vs. Exact: Topology from Calculus</div>
    <div class="env-body">
        <p>The identity \\(d^2 = 0\\) means every exact form is closed (if \\(\\omega = d\\eta\\), then \\(d\\omega = d^2\\eta = 0\\)). But is every closed form exact? The answer depends on the topology of the manifold, and this is where calculus meets topology.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 13.8 (Closed and Exact Forms)</div>
    <div class="env-body">
        <p>A \\(k\\)-form \\(\\omega\\) is <strong>closed</strong> if \\(d\\omega = 0\\). It is <strong>exact</strong> if \\(\\omega = d\\eta\\) for some \\((k-1)\\)-form \\(\\eta\\).</p>
        <p>Since \\(d^2 = 0\\), every exact form is closed. The converse is not always true.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 13.9 (De Rham Cohomology)</div>
    <div class="env-body">
        <p>The <strong>\\(k\\)-th de Rham cohomology group</strong> of \\(M\\) is</p>
        \\[H^k_{\\text{dR}}(M) = \\frac{\\ker(d: \\Omega^k \\to \\Omega^{k+1})}{\\text{im}(d: \\Omega^{k-1} \\to \\Omega^k)} = \\frac{\\{\\text{closed } k\\text{-forms}\\}}{\\{\\text{exact } k\\text{-forms}\\}}.\\]
        <p>This quotient measures the "failure of closed forms to be exact," which is controlled by the topology of \\(M\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Angle Form on \\(\\mathbb{R}^2 \\setminus \\{0\\}\\)</div>
    <div class="env-body">
        <p>The 1-form \\(\\omega = \\frac{-y\\,dx + x\\,dy}{x^2 + y^2}\\) is closed (\\(d\\omega = 0\\)) but not exact on \\(\\mathbb{R}^2 \\setminus \\{0\\}\\). Its integral around any circle enclosing the origin equals \\(2\\pi\\), so it cannot be \\(df\\) for any single-valued function \\(f\\). This means \\(H^1_{\\text{dR}}(\\mathbb{R}^2 \\setminus \\{0\\}) \\neq 0\\), reflecting the "hole" in the domain.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.5 (Poincare Lemma)</div>
    <div class="env-body">
        <p>If \\(M\\) is contractible (continuously deformable to a point), then every closed form on \\(M\\) is exact: \\(H^k_{\\text{dR}}(M) = 0\\) for \\(k \\geq 1\\). In particular, \\(H^k_{\\text{dR}}(\\mathbb{R}^n) = 0\\) for all \\(k \\geq 1\\).</p>
    </div>
</div>

<p>De Rham cohomology connects analysis (differential forms) to topology (holes in manifolds). The de Rham theorem states that de Rham cohomology is isomorphic to singular cohomology, confirming that this algebraic object genuinely captures the shape of the manifold.</p>

<div class="viz-placeholder" data-viz="viz-de-rham"></div>

<h3>Looking Forward</h3>

<p>We now have the complete toolkit of differential forms, exterior calculus, and integration on manifolds. In the next chapters, we will use these tools to build Riemannian geometry:</p>

<ul>
    <li><strong>Chapter 14: Riemannian Metrics</strong>. A Riemannian metric is a smoothly varying inner product on tangent spaces. It gives us lengths, angles, and volumes, turning a bare smooth manifold into a geometric space.</li>
    <li><strong>Chapter 15: Connections and Parallel Transport</strong>. To differentiate vector fields on a manifold, we need a <em>connection</em>. The Levi-Civita connection is the unique one compatible with the metric and torsion-free.</li>
    <li><strong>Chapter 16: Geodesics and the Exponential Map</strong>. Geodesics generalize straight lines: they are curves that parallel transport their own tangent vector. The exponential map provides normal coordinates centered at any point.</li>
</ul>

<p>Differential forms will return in force: curvature can be expressed as a matrix of 2-forms, volume elements are top forms determined by the metric, and the Gauss-Bonnet theorem is a deep application of Stokes's theorem to curvature forms.</p>
`,
            visualizations: [
                {
                    id: 'viz-de-rham',
                    title: 'Closed vs. Exact: De Rham Cohomology',
                    description: 'On a contractible domain (left), every closed form is exact. On a punctured plane or torus (right), some closed forms are not exact, detecting "holes" in the manifold. The angle form on R^2 minus the origin is the classic example.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, originX: 0, originY: 0, scale: 1 });

                        var showTorus = false;
                        VizEngine.createButton(controls, 'Toggle: Plane / Punctured Plane', function() {
                            showTorus = !showTorus;
                        });

                        function draw(time) {
                            var t = time * 0.001;
                            viz.clear();
                            var ctx = viz.ctx;

                            if (!showTorus) {
                                // Left: R^2 (contractible) — closed = exact
                                viz.screenText('R\u00B2: contractible', viz.width / 4, 25, viz.colors.green, 14);
                                viz.screenText('H\u00B9(R\u00B2) = 0: every closed 1-form is exact', viz.width / 4, 48, viz.colors.text, 11);

                                var lx = viz.width / 4, ly = 220;
                                // Draw a gradient vector field (exact form df = grad f)
                                for (var ix = -3; ix <= 3; ix++) {
                                    for (var iy = -3; iy <= 3; iy++) {
                                        var px = lx + ix * 30;
                                        var py = ly + iy * 30;
                                        // grad of f = x^2 + y^2 => (2x, 2y)
                                        var vx = ix * 6;
                                        var vy = iy * 6;
                                        var vl = Math.sqrt(vx * vx + vy * vy);
                                        if (vl > 1) {
                                            vx = vx / vl * 12; vy = vy / vl * 12;
                                            ctx.strokeStyle = viz.colors.green + '88';
                                            ctx.lineWidth = 1.5;
                                            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + vx, py + vy); ctx.stroke();
                                            var va = Math.atan2(vy, vx);
                                            ctx.beginPath();
                                            ctx.moveTo(px + vx, py + vy);
                                            ctx.lineTo(px + vx - 4 * Math.cos(va - 0.4), py + vy - 4 * Math.sin(va - 0.4));
                                            ctx.lineTo(px + vx - 4 * Math.cos(va + 0.4), py + vy - 4 * Math.sin(va + 0.4));
                                            ctx.closePath();
                                            ctx.fillStyle = viz.colors.green + '88';
                                            ctx.fill();
                                        }
                                    }
                                }
                                viz.screenText('df = \u2207f (exact)', lx, ly + 120, viz.colors.green, 12);

                                // Right: R^2 \ {0} — the angle form
                                var rx = 3 * viz.width / 4, ry = 220;
                                viz.screenText('R\u00B2 \\ {0}: not contractible', 3 * viz.width / 4, 25, viz.colors.red, 14);
                                viz.screenText('H\u00B9(R\u00B2\\{0}) = R: the angle form is closed but not exact', 3 * viz.width / 4, 48, viz.colors.text, 11);

                                // Hole at center
                                ctx.fillStyle = viz.colors.red + '44';
                                ctx.beginPath(); ctx.arc(rx, ry, 10, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(rx, ry, 10, 0, Math.PI * 2); ctx.stroke();
                                viz.screenText('\u00D7', rx, ry, viz.colors.red, 14);

                                // Rotation field (the angle form d-theta)
                                for (var ix2 = -3; ix2 <= 3; ix2++) {
                                    for (var iy2 = -3; iy2 <= 3; iy2++) {
                                        if (ix2 === 0 && iy2 === 0) continue;
                                        var px2 = rx + ix2 * 30;
                                        var py2 = ry + iy2 * 30;
                                        var r2 = Math.sqrt(ix2 * ix2 + iy2 * iy2);
                                        // (-y, x) / r^2
                                        var vx2 = -iy2 / (r2 * r2) * 15;
                                        var vy2 = ix2 / (r2 * r2) * 15;
                                        ctx.strokeStyle = viz.colors.purple + '88';
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath(); ctx.moveTo(px2, py2); ctx.lineTo(px2 + vx2, py2 + vy2); ctx.stroke();
                                        var va2 = Math.atan2(vy2, vx2);
                                        ctx.beginPath();
                                        ctx.moveTo(px2 + vx2, py2 + vy2);
                                        ctx.lineTo(px2 + vx2 - 4 * Math.cos(va2 - 0.4), py2 + vy2 - 4 * Math.sin(va2 - 0.4));
                                        ctx.lineTo(px2 + vx2 - 4 * Math.cos(va2 + 0.4), py2 + vy2 - 4 * Math.sin(va2 - 0.4)); // intentional for arrowhead
                                        ctx.closePath();
                                        ctx.fillStyle = viz.colors.purple + '88';
                                        ctx.fill();
                                    }
                                }

                                // Animated circle showing integral = 2pi
                                var circR = 50;
                                ctx.strokeStyle = viz.colors.yellow + 'aa';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath(); ctx.arc(rx, ry, circR, 0, Math.PI * 2); ctx.stroke();
                                ctx.setLineDash([]);

                                // Moving point on circle
                                var pt_angle = t * 1.2;
                                var ptx = rx + circR * Math.cos(pt_angle);
                                var pty = ry + circR * Math.sin(pt_angle);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath(); ctx.arc(ptx, pty, 4, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('\u222E d\u03B8 = 2\u03C0 (not exact!)', rx, ry + 120, viz.colors.purple, 12);

                            } else {
                                // Torus
                                viz.screenText('Torus T\u00B2: H\u00B9 = R\u00B2 (two independent loops)', viz.width / 2, 25, viz.colors.teal, 14);
                                viz.screenText('Two closed 1-forms that are not exact, detecting two holes', viz.width / 2, 48, viz.colors.text, 11);

                                var tcx = viz.width / 2, tcy = 240;
                                var R = 90, rr = 40;

                                // Draw torus cross-section (top view as concentric ovals)
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                // Outer
                                ctx.beginPath(); ctx.ellipse(tcx, tcy, R + rr, (R + rr) * 0.45, 0, 0, Math.PI * 2); ctx.stroke();
                                // Inner
                                ctx.strokeStyle = viz.colors.teal + '66';
                                ctx.beginPath(); ctx.ellipse(tcx, tcy, R - rr, (R - rr) * 0.45, 0, 0, Math.PI * 2); ctx.stroke();

                                // Fill between
                                ctx.fillStyle = viz.colors.teal + '11';
                                ctx.beginPath(); ctx.ellipse(tcx, tcy, R + rr, (R + rr) * 0.45, 0, 0, Math.PI * 2); ctx.fill();

                                // Loop alpha (around the hole)
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.setLineDash([6, 3]);
                                ctx.beginPath(); ctx.ellipse(tcx, tcy, R, R * 0.45, 0, 0, Math.PI * 2); ctx.stroke();
                                ctx.setLineDash([]);

                                // Moving point on alpha
                                var aAng = t * 0.8;
                                var apx = tcx + R * Math.cos(aAng);
                                var apy = tcy + R * 0.45 * Math.sin(aAng);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(apx, apy, 5, 0, Math.PI * 2); ctx.fill();

                                // Loop beta (through the hole) - drawn as a small circle on the right
                                var bCx = tcx + R, bCy = tcy;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                ctx.setLineDash([6, 3]);
                                ctx.beginPath(); ctx.ellipse(bCx, bCy, rr * 0.5, rr, 0, 0, Math.PI * 2); ctx.stroke();
                                ctx.setLineDash([]);

                                var bAng = t * 1.1;
                                var bpx = bCx + rr * 0.5 * Math.cos(bAng);
                                var bpy = bCy + rr * Math.sin(bAng);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(bpx, bpy, 5, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('\u03B1 (longitudinal)', tcx - 50, tcy + R * 0.45 + 30, viz.colors.orange, 12);
                                viz.screenText('\u03B2 (meridional)', bCx + 30, bCy - rr - 10, viz.colors.blue, 12);

                                viz.screenText('H\u2070 = R, H\u00B9 = R\u00B2, H\u00B2 = R', viz.width / 2, tcy + 140, viz.colors.white, 13);
                                viz.screenText('Betti numbers: b\u2080=1, b\u2081=2, b\u2082=1', viz.width / 2, tcy + 160, viz.colors.text, 11);
                            }

                            viz.screenText('Cohomology detects topology through differential forms', viz.width / 2, viz.height - 18, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the 1-form \\(\\omega = \\frac{-y\\,dx + x\\,dy}{x^2 + y^2}\\) is closed on \\(\\mathbb{R}^2 \\setminus \\{0\\}\\).',
                    hint: 'Compute \\(d\\omega\\) by differentiating each coefficient.',
                    solution: 'Write \\(\\omega = P\\,dx + Q\\,dy\\) with \\(P = -y/(x^2+y^2)\\), \\(Q = x/(x^2+y^2)\\). Then \\(Q_x = (y^2-x^2)/(x^2+y^2)^2\\) and \\(P_y = (y^2-x^2)/(x^2+y^2)^2 \\cdot (-1)\\). Wait: \\(P_y = \\frac{-(x^2+y^2) + y \\cdot 2y}{(x^2+y^2)^2} = \\frac{y^2 - x^2}{(x^2+y^2)^2}\\) and \\(Q_x = \\frac{(x^2+y^2) - x \\cdot 2x}{(x^2+y^2)^2} = \\frac{y^2 - x^2}{(x^2+y^2)^2}\\). So \\(d\\omega = (Q_x - P_y)\\,dx \\wedge dy = 0\\).'
                },
                {
                    question: 'Compute \\(H^0_{\\text{dR}}(M)\\) for a connected manifold \\(M\\). What does it mean?',
                    hint: 'A closed 0-form is a function \\(f\\) with \\(df = 0\\). On a connected manifold, what can you say about such a function?',
                    solution: 'A closed 0-form satisfies \\(df = 0\\), meaning \\(f\\) is locally constant. On a connected manifold, locally constant implies globally constant. Since there are no exact \\((-1)\\)-forms, \\(H^0_{\\text{dR}}(M) = \\ker d / 0 \\cong \\mathbb{R}\\). This says: the 0-th cohomology counts the connected components. For a connected manifold, \\(H^0 \\cong \\mathbb{R}\\).'
                },
                {
                    question: 'Use the Poincare lemma to argue that every closed 1-form on a star-shaped domain in \\(\\mathbb{R}^n\\) is exact.',
                    hint: 'A star-shaped domain is contractible.',
                    solution: 'A star-shaped domain \\(U \\subset \\mathbb{R}^n\\) is contractible to its center point: define \\(H(x, t) = (1-t)x + t \\cdot x_0\\). By the Poincare lemma, \\(H^k_{\\text{dR}}(U) = 0\\) for all \\(k \\geq 1\\). In particular, every closed 1-form on \\(U\\) is exact: there exists \\(f\\) with \\(\\omega = df\\).'
                }
            ]
        }
    ]
});
