window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'Connections & Parallel Transport',
    subtitle: 'How to differentiate vector fields on curved spaces',
    tier: 5,
    sections: [
        // ================================================================
        // SECTION 1: Why Connections?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Connections?',
            content: `
<h2>Why Connections?</h2>

<div class="env-block intuition">
    <div class="env-title">The Problem</div>
    <div class="env-body">
        <p>On \\(\\mathbb{R}^n\\), differentiating a vector field is simple: just differentiate each component. But on a curved manifold, vectors at different points live in <em>different</em> tangent spaces. How do you subtract \\(V_q \\in T_qM\\) from \\(V_p \\in T_pM\\) when these are vectors in entirely different vector spaces?</p>
    </div>
</div>

<p>Consider a vector field \\(V\\) on a surface \\(S \\subset \\mathbb{R}^3\\). If we compute the ordinary directional derivative \\(D_X V\\) in the ambient space, the result generally points <em>off the surface</em>. It has a component tangent to \\(S\\) and a component normal to \\(S\\). The tangent component is the one with geometric meaning intrinsic to the surface.</p>

<p>A <strong>connection</strong> is the abstract machinery that makes differentiation of vector fields on manifolds well-defined. It tells us how to "connect" the tangent spaces at nearby points, providing a rule for comparing vectors at different locations.</p>

<h3>Three Perspectives on the Same Idea</h3>

<ol>
    <li><strong>Extrinsic</strong>: Differentiate in the ambient space, then project back to the tangent plane. This is the classical approach for surfaces in \\(\\mathbb{R}^3\\).</li>
    <li><strong>Intrinsic (axiomatic)</strong>: Define an operator \\(\\nabla_X Y\\) satisfying certain algebraic axioms. This is the abstract manifold approach.</li>
    <li><strong>Transport</strong>: Specify, for each curve, how to "slide" a vector along the curve while keeping it "as constant as possible." This is parallel transport.</li>
</ol>

<p>All three perspectives are equivalent. A connection determines parallel transport and vice versa. The covariant derivative \\(\\nabla\\) encodes how a vector field changes relative to the connection.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The concept of a connection was developed by Tullio Levi-Civita (1917) for Riemannian manifolds, building on Christoffel's earlier work on differential invariants (1869). Elie Cartan generalized the idea to arbitrary fiber bundles in the 1920s and 1930s, creating the framework that underlies modern gauge theory in physics.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-covariant-derivative',
                    title: 'Covariant Derivative: Projecting onto the Tangent Plane',
                    description: 'A vector field on a surface is differentiated in the ambient space, then projected onto the tangent plane. The tangential component is the covariant derivative. Drag the point along the surface to see how the projection changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 330, scale: 60
                        });

                        var uParam = 0.5;
                        VizEngine.createSlider(controls, 'Position u', -1.5, 1.5, uParam, 0.05, function(v) {
                            uParam = v; draw();
                        });

                        function surfaceY(x) { return 1.5 + 0.4 * Math.sin(1.2 * x) - 0.15 * x * x; }
                        function surfaceDY(x) { return 0.4 * 1.2 * Math.cos(1.2 * x) - 0.3 * x; }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw the surface curve
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = -200; i <= 200; i++) {
                                var x = i * 0.02;
                                var y = surfaceY(x);
                                var sx = viz.originX + x * viz.scale;
                                var sy = viz.originY - y * viz.scale;
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Point on surface
                            var px = uParam;
                            var py = surfaceY(px);
                            var dy = surfaceDY(px);
                            var tanLen = Math.sqrt(1 + dy * dy);
                            var tx = 1 / tanLen;
                            var ty = dy / tanLen;
                            var nx = -ty;
                            var ny = tx;

                            // Tangent line (extended)
                            ctx.strokeStyle = viz.colors.teal + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            var ext = 3;
                            var sx1 = viz.originX + (px - tx * ext) * viz.scale;
                            var sy1 = viz.originY - (py - ty * ext) * viz.scale;
                            var sx2 = viz.originX + (px + tx * ext) * viz.scale;
                            var sy2 = viz.originY - (py + ty * ext) * viz.scale;
                            ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
                            ctx.setLineDash([]);

                            // Ambient derivative vector (some artificial vector field derivative)
                            var ambX = 0.6;
                            var ambY = 0.8 + 0.3 * Math.sin(2 * px);

                            // Project onto tangent: (amb . t) * t
                            var dot = ambX * tx + ambY * ty;
                            var projX = dot * tx;
                            var projY = dot * ty;

                            // Normal component
                            var normX = ambX - projX;
                            var normY = ambY - projY;

                            // Draw ambient derivative (orange)
                            var spx = viz.originX + px * viz.scale;
                            var spy = viz.originY - py * viz.scale;
                            viz.drawVector(px, py, px + ambX, py + ambY, viz.colors.orange, 'DxV', 2);

                            // Draw normal component (red, dashed)
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            var endAmbSx = viz.originX + (px + ambX) * viz.scale;
                            var endAmbSy = viz.originY - (py + ambY) * viz.scale;
                            var endProjSx = viz.originX + (px + projX) * viz.scale;
                            var endProjSy = viz.originY - (py + projY) * viz.scale;
                            ctx.beginPath();
                            ctx.moveTo(endAmbSx, endAmbSy);
                            ctx.lineTo(endProjSx, endProjSy);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw covariant derivative (teal, bold)
                            viz.drawVector(px, py, px + projX, py + projY, viz.colors.teal, '\u2207xV', 2.5);

                            // Draw the point
                            viz.drawPoint(px, py, viz.colors.white, 'p', 6);

                            // Labels
                            viz.screenText('Surface S', viz.width - 60, 30, viz.colors.purple, 13);
                            viz.screenText('Tangent plane T\u209aS', viz.width - 80, 50, viz.colors.teal, 11);

                            // Legend
                            var ly = viz.height - 50;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(20, ly, 14, 3);
                            viz.screenText('D\u2093V (ambient)', 95, ly + 2, viz.colors.orange, 11, 'center');

                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(170, ly, 14, 3);
                            viz.screenText('\u2207\u2093V (covariant)', 250, ly + 2, viz.colors.teal, 11, 'center');

                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(330, ly, 14, 3);
                            viz.screenText('Normal component', 420, ly + 2, viz.colors.red, 11, 'center');

                            viz.screenText('Covariant Derivative = Projection onto Tangent Plane', viz.width / 2, viz.height - 20, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider a vector field \\(V\\) on the unit sphere \\(S^2 \\subset \\mathbb{R}^3\\). At the north pole \\(p = (0,0,1)\\), the tangent plane is \\(T_pS^2 = \\{(x,y,0)\\}\\). If the ambient derivative of \\(V\\) at \\(p\\) in direction \\(X\\) is \\(D_XV = (1, 2, 3)\\), what is the covariant derivative \\(\\nabla_XV\\)?',
                    hint: 'Project \\(D_XV\\) onto the tangent plane by removing the normal component. What is the unit normal at the north pole?',
                    solution: 'At the north pole, the unit outward normal is \\(n = (0,0,1)\\). The normal component is \\((D_XV \\cdot n)\\,n = 3\\,(0,0,1) = (0,0,3)\\). So \\(\\nabla_XV = D_XV - (D_XV \\cdot n)\\,n = (1,2,3) - (0,0,3) = (1,2,0)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Covariant Derivative
        // ================================================================
        {
            id: 'sec-covariant',
            title: 'Covariant Derivative',
            content: `
<h2>The Covariant Derivative</h2>

<div class="env-block intuition">
    <div class="env-title">The Key Idea</div>
    <div class="env-body">
        <p>A covariant derivative \\(\\nabla\\) is a rule that takes a direction \\(X\\) and a vector field \\(Y\\), and produces a new vector field \\(\\nabla_X Y\\) measuring "the rate of change of \\(Y\\) in the direction \\(X\\), as seen from the manifold." It generalizes the directional derivative to curved spaces.</p>
    </div>
</div>

<h3>Formal Definition</h3>

<div class="env-block definition">
    <div class="env-title">Definition 15.1 (Affine Connection)</div>
    <div class="env-body">
        <p>An <strong>affine connection</strong> (or simply <strong>connection</strong>) on a smooth manifold \\(M\\) is a map</p>
        \\[\\nabla \\colon \\mathfrak{X}(M) \\times \\mathfrak{X}(M) \\to \\mathfrak{X}(M), \\quad (X, Y) \\mapsto \\nabla_X Y\\]
        <p>satisfying the following axioms for all vector fields \\(X, Y, Z \\in \\mathfrak{X}(M)\\) and smooth functions \\(f, g \\in C^\\infty(M)\\):</p>
        <ol>
            <li><strong>\\(C^\\infty\\)-linearity in \\(X\\)</strong>: \\(\\nabla_{fX + gZ} Y = f\\,\\nabla_X Y + g\\,\\nabla_Z Y\\)</li>
            <li><strong>\\(\\mathbb{R}\\)-linearity in \\(Y\\)</strong>: \\(\\nabla_X(Y + Z) = \\nabla_X Y + \\nabla_X Z\\)</li>
            <li><strong>Leibniz rule in \\(Y\\)</strong>: \\(\\nabla_X(fY) = (Xf)\\,Y + f\\,\\nabla_X Y\\)</li>
        </ol>
    </div>
</div>

<p>Axiom 1 says \\(\\nabla_X Y\\) depends on \\(X\\) only at the point where we evaluate. Axiom 3, the Leibniz (product) rule, is what makes \\(\\nabla\\) a <em>derivation</em>. Contrast this with axiom 2: \\(Y\\) enters \\(\\mathbb{R}\\)-linearly but <em>not</em> \\(C^\\infty\\)-linearly, because we need to know \\(Y\\) in a neighborhood (not just at a point) to compute its derivative.</p>

<h3>Connections Are Not Unique</h3>

<p>A manifold admits many connections. The difference between any two connections \\(\\nabla\\) and \\(\\tilde{\\nabla}\\) is a tensor:</p>

\\[
A(X, Y) = \\nabla_X Y - \\tilde{\\nabla}_X Y
\\]

<p>is \\(C^\\infty\\)-linear in both \\(X\\) and \\(Y\\). So the space of connections on \\(M\\) is an affine space modeled on the space of \\((1,2)\\)-tensor fields.</p>

<div class="env-block definition">
    <div class="env-title">Definition 15.2 (Torsion)</div>
    <div class="env-body">
        <p>The <strong>torsion</strong> of a connection \\(\\nabla\\) is the \\((1,2)\\)-tensor field</p>
        \\[T(X,Y) = \\nabla_X Y - \\nabla_Y X - [X,Y].\\]
        <p>A connection is <strong>torsion-free</strong> (or <strong>symmetric</strong>) if \\(T \\equiv 0\\), i.e., \\(\\nabla_X Y - \\nabla_Y X = [X,Y]\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 15.3 (Metric Compatibility)</div>
    <div class="env-body">
        <p>A connection \\(\\nabla\\) is <strong>compatible with</strong> a Riemannian metric \\(g\\) if</p>
        \\[X\\langle Y, Z \\rangle = \\langle \\nabla_X Y, Z \\rangle + \\langle Y, \\nabla_X Z \\rangle\\]
        <p>for all vector fields \\(X, Y, Z\\). Equivalently, \\(\\nabla g = 0\\). This means parallel transport preserves inner products (lengths and angles).</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify that the difference \\(A(X,Y) = \\nabla_X Y - \\tilde{\\nabla}_X Y\\) of two connections is \\(C^\\infty\\)-linear in \\(Y\\) (not just \\(\\mathbb{R}\\)-linear).',
                    hint: 'Compute \\(A(X, fY)\\) using the Leibniz rule for each connection. What cancels?',
                    solution: '\\(A(X, fY) = \\nabla_X(fY) - \\tilde{\\nabla}_X(fY) = [(Xf)Y + f\\nabla_X Y] - [(Xf)Y + f\\tilde{\\nabla}_X Y] = f(\\nabla_X Y - \\tilde{\\nabla}_X Y) = fA(X,Y)\\). The \\((Xf)Y\\) terms cancel because both connections satisfy the same Leibniz rule.'
                },
                {
                    question: 'Show that torsion \\(T(X,Y) = \\nabla_X Y - \\nabla_Y X - [X,Y]\\) is \\(C^\\infty\\)-linear in both arguments.',
                    hint: 'Check \\(T(fX, Y)\\). Use the Leibniz rule and the identity \\([fX, Y] = f[X,Y] - (Yf)X\\).',
                    solution: '\\(T(fX,Y) = \\nabla_{fX}Y - \\nabla_Y(fX) - [fX,Y] = f\\nabla_X Y - (Yf)X - f\\nabla_Y X - f[X,Y] + (Yf)X = f(\\nabla_X Y - \\nabla_Y X - [X,Y]) = fT(X,Y)\\). The \\((Yf)X\\) terms cancel. Antisymmetry \\(T(X,Y) = -T(Y,X)\\) gives linearity in the second argument as well.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Levi-Civita Connection
        // ================================================================
        {
            id: 'sec-levi-civita',
            title: 'The Levi-Civita Connection',
            content: `
<h2>The Levi-Civita Connection</h2>

<div class="env-block intuition">
    <div class="env-title">The Key Insight</div>
    <div class="env-body">
        <p>Among the infinitely many connections on a Riemannian manifold, there is exactly <em>one</em> that is both torsion-free and compatible with the metric. This is the Levi-Civita connection, and it is the canonical connection in Riemannian geometry.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.1 (Fundamental Theorem of Riemannian Geometry)</div>
    <div class="env-body">
        <p>On a Riemannian manifold \\((M, g)\\), there exists a unique connection \\(\\nabla\\) that is:</p>
        <ol>
            <li><strong>Torsion-free</strong>: \\(\\nabla_X Y - \\nabla_Y X = [X,Y]\\)</li>
            <li><strong>Metric-compatible</strong>: \\(Xg(Y,Z) = g(\\nabla_X Y, Z) + g(Y, \\nabla_X Z)\\)</li>
        </ol>
        <p>This connection is called the <strong>Levi-Civita connection</strong>.</p>
    </div>
</div>

<h3>Proof via the Koszul Formula</h3>

<p><strong>Uniqueness.</strong> Suppose \\(\\nabla\\) is torsion-free and metric-compatible. We derive a formula that determines \\(\\nabla\\) entirely from the metric. Write out metric compatibility three times with cyclically permuted arguments:</p>

\\[
\\begin{aligned}
Xg(Y,Z) &= g(\\nabla_X Y, Z) + g(Y, \\nabla_X Z) \\\\
Yg(Z,X) &= g(\\nabla_Y Z, X) + g(Z, \\nabla_Y X) \\\\
Zg(X,Y) &= g(\\nabla_Z X, Y) + g(X, \\nabla_Z Y)
\\end{aligned}
\\]

<p>Take the first plus the second minus the third. Using the torsion-free condition \\(\\nabla_X Y - \\nabla_Y X = [X,Y]\\) to simplify, we obtain:</p>

<div class="env-block theorem">
    <div class="env-title">Koszul Formula</div>
    <div class="env-body">
        \\[2g(\\nabla_X Y, Z) = Xg(Y,Z) + Yg(Z,X) - Zg(X,Y) + g([X,Y],Z) - g([Y,Z],X) + g([Z,X],Y)\\]
    </div>
</div>

<p>Since \\(g\\) is nondegenerate, the right side uniquely determines \\(\\nabla_X Y\\). This proves uniqueness.</p>

<p><strong>Existence.</strong> Define \\(\\nabla_X Y\\) by the Koszul formula. One verifies (by direct computation) that this definition satisfies all connection axioms, is torsion-free, and is metric-compatible.</p>

<div class="env-block remark">
    <div class="env-title">Why Both Conditions Matter</div>
    <div class="env-body">
        <p>Torsion-free alone does not determine a unique connection. Metric-compatible alone does not either. It is the <em>combination</em> of both that pins down a unique choice. Relaxing either condition gives a family of connections parameterized by a tensor field.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-levi-civita-uniqueness',
                    title: 'Levi-Civita Uniqueness: Torsion-Free + Metric-Compatible',
                    description: 'See how the two conditions (torsion-free and metric-compatible) each constrain the connection, and how together they pin down a unique choice. The diagram shows the space of connections as a plane, with each condition defining a line.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 200, scale: 80
                        });

                        var showTorsionFree = true;
                        var showMetric = true;

                        VizEngine.createButton(controls, 'Toggle Torsion-Free', function() {
                            showTorsionFree = !showTorsionFree; draw();
                        });
                        VizEngine.createButton(controls, 'Toggle Metric-Compatible', function() {
                            showMetric = !showMetric; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Space of All Connections on (M, g)', viz.width / 2, 25, viz.colors.white, 14);

                            // Background: "space of connections" as a faded grid
                            ctx.fillStyle = viz.colors.purple + '15';
                            ctx.fillRect(30, 50, viz.width - 60, viz.height - 100);
                            ctx.strokeStyle = viz.colors.purple + '30';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(30, 50, viz.width - 60, viz.height - 100);

                            // Torsion-free locus: a diagonal line
                            if (showTorsionFree) {
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(60, 320);
                                ctx.lineTo(500, 90);
                                ctx.stroke();
                                viz.screenText('Torsion-free connections', 400, 80, viz.colors.blue, 12, 'center', 'bottom');
                                viz.screenText('T(X,Y) = 0', 130, 310, viz.colors.blue, 11);
                            }

                            // Metric-compatible locus: another line
                            if (showMetric) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(60, 110);
                                ctx.lineTo(500, 300);
                                ctx.stroke();
                                viz.screenText('Metric-compatible connections', 400, 310, viz.colors.teal, 12, 'center', 'top');
                                viz.screenText('\u2207g = 0', 100, 120, viz.colors.teal, 11);
                            }

                            // Intersection point: Levi-Civita
                            if (showTorsionFree && showMetric) {
                                // Lines intersect at roughly (280, 200)
                                var ix = 280, iy = 195;
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.arc(ix, iy, 8, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.yellow + '33';
                                ctx.beginPath();
                                ctx.arc(ix, iy, 18, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('Levi-Civita \u2207', ix, iy - 25, viz.colors.yellow, 13);
                                viz.screenText('(unique!)', ix, iy + 25, viz.colors.yellow, 11);
                            }

                            // Summary
                            var msg = '';
                            if (showTorsionFree && showMetric) msg = 'Both conditions \u2192 unique connection (Levi-Civita)';
                            else if (showTorsionFree) msg = 'Torsion-free alone: a family of connections';
                            else if (showMetric) msg = 'Metric-compatible alone: a family of connections';
                            else msg = 'No constraints: infinitely many connections';
                            viz.screenText(msg, viz.width / 2, viz.height - 25, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive the Koszul formula by expanding metric compatibility with \\((X,Y,Z)\\), \\((Y,Z,X)\\), and \\((Z,X,Y)\\), then combining.',
                    hint: 'Write out \\(Xg(Y,Z) = g(\\nabla_X Y, Z) + g(Y, \\nabla_X Z)\\) and the two cyclic permutations. Add the first two and subtract the third. Use torsion-free to replace \\(\\nabla_A B - \\nabla_B A\\) with \\([A,B]\\).',
                    solution: 'Adding (1) \\(Xg(Y,Z) = g(\\nabla_X Y, Z) + g(Y, \\nabla_X Z)\\) and (2) \\(Yg(Z,X) = g(\\nabla_Y Z, X) + g(Z, \\nabla_Y X)\\), then subtracting (3) \\(Zg(X,Y) = g(\\nabla_Z X, Y) + g(X, \\nabla_Z Y)\\), we get: \\(Xg(Y,Z) + Yg(Z,X) - Zg(X,Y) = g(\\nabla_X Y + \\nabla_Y X, Z) + g(\\nabla_X Z - \\nabla_Z X, Y) + g(\\nabla_Y Z - \\nabla_Z Y, X)\\). Using torsion-free: \\(\\nabla_X Y + \\nabla_Y X = 2\\nabla_X Y - [X,Y]\\), \\(\\nabla_X Z - \\nabla_Z X = [X,Z]\\), \\(\\nabla_Y Z - \\nabla_Z Y = [Y,Z]\\). Substituting gives \\(2g(\\nabla_X Y, Z) = Xg(Y,Z) + Yg(Z,X) - Zg(X,Y) + g([X,Y],Z) - g([Y,Z],X) + g([Z,X],Y)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Christoffel Symbols
        // ================================================================
        {
            id: 'sec-christoffel',
            title: 'Christoffel Symbols',
            content: `
<h2>Christoffel Symbols</h2>

<div class="env-block intuition">
    <div class="env-title">Local Coordinates</div>
    <div class="env-body">
        <p>In coordinates, a connection is encoded by its <strong>Christoffel symbols</strong> \\(\\Gamma^k_{ij}\\). These \\(n^2(n+1)/2\\) functions (for a torsion-free connection on an \\(n\\)-manifold) tell you how the coordinate basis vectors change as you move. They are the "correction terms" that account for the curvature of the coordinate system.</p>
    </div>
</div>

<h3>Definition in Coordinates</h3>

<p>Given local coordinates \\((x^1, \\ldots, x^n)\\), the coordinate basis vector fields are \\(\\partial_i = \\partial / \\partial x^i\\). The Christoffel symbols are defined by:</p>

<div class="env-block definition">
    <div class="env-title">Definition 15.4 (Christoffel Symbols)</div>
    <div class="env-body">
        \\[\\nabla_{\\partial_i} \\partial_j = \\Gamma^k_{ij}\\,\\partial_k\\]
        <p>(summing over \\(k\\)). Here \\(\\Gamma^k_{ij}\\) are smooth functions, not the components of a tensor (they transform inhomogeneously under coordinate changes).</p>
    </div>
</div>

<h3>Computing from the Metric</h3>

<p>For the Levi-Civita connection, the Koszul formula gives an explicit formula in terms of the metric components \\(g_{ij} = g(\\partial_i, \\partial_j)\\):</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.2 (Christoffel Symbols from Metric)</div>
    <div class="env-body">
        \\[\\Gamma^k_{ij} = \\frac{1}{2}\\,g^{k\\ell}\\left(\\frac{\\partial g_{j\\ell}}{\\partial x^i} + \\frac{\\partial g_{i\\ell}}{\\partial x^j} - \\frac{\\partial g_{ij}}{\\partial x^\\ell}\\right)\\]
        <p>where \\(g^{k\\ell}\\) is the inverse metric (\\(g^{k\\ell}g_{\\ell m} = \\delta^k_m\\)).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The 2-Sphere</div>
    <div class="env-body">
        <p>In spherical coordinates \\((\\theta, \\phi)\\), the metric on \\(S^2\\) of radius \\(R\\) is \\(ds^2 = R^2\\,d\\theta^2 + R^2\\sin^2\\theta\\,d\\phi^2\\). So \\(g_{\\theta\\theta} = R^2\\), \\(g_{\\phi\\phi} = R^2\\sin^2\\theta\\), \\(g_{\\theta\\phi} = 0\\).</p>
        <p>The nonzero Christoffel symbols are:</p>
        \\[\\Gamma^\\theta_{\\phi\\phi} = -\\sin\\theta\\cos\\theta, \\quad \\Gamma^\\phi_{\\theta\\phi} = \\Gamma^\\phi_{\\phi\\theta} = \\cot\\theta.\\]
    </div>
</div>

<h3>The Covariant Derivative in Coordinates</h3>

<p>For a vector field \\(V = V^k\\partial_k\\), the covariant derivative along \\(X = X^i\\partial_i\\) is:</p>

\\[
\\nabla_X V = X^i\\left(\\frac{\\partial V^k}{\\partial x^i} + \\Gamma^k_{ij}V^j\\right)\\partial_k.
\\]

<p>The term \\(\\partial V^k / \\partial x^i\\) is the ordinary derivative; the \\(\\Gamma^k_{ij}V^j\\) is the correction for curvature of the coordinates.</p>
`,
            visualizations: [
                {
                    id: 'viz-christoffel-computation',
                    title: 'Computing Christoffel Symbols from the Metric',
                    description: 'Watch the step-by-step computation of Christoffel symbols for common surfaces. Select a surface to see its metric and the resulting symbols.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 440,
                            originX: 280, originY: 220, scale: 1
                        });

                        var surfaces = [
                            {
                                name: 'Sphere S\u00B2 (R=1)',
                                coords: '(\u03B8, \u03C6)',
                                metric: ['g_{\u03B8\u03B8} = 1', 'g_{\u03C6\u03C6} = sin\u00B2\u03B8', 'g_{\u03B8\u03C6} = 0'],
                                inverse: ['g^{\u03B8\u03B8} = 1', 'g^{\u03C6\u03C6} = 1/sin\u00B2\u03B8', 'g^{\u03B8\u03C6} = 0'],
                                partials: ['\u2202g_{\u03C6\u03C6}/\u2202\u03B8 = 2sin\u03B8cos\u03B8', 'All other \u2202g/\u2202x = 0'],
                                christoffel: [
                                    '\u0393\u1DBD_{\u03C6\u03C6} = -sin\u03B8 cos\u03B8',
                                    '\u0393\u1D60_{\u03B8\u03C6} = \u0393\u1D60_{\u03C6\u03B8} = cot\u03B8',
                                    'All others = 0'
                                ]
                            },
                            {
                                name: 'Hyperbolic Plane H\u00B2 (Poincar\u00E9)',
                                coords: '(x, y), y > 0',
                                metric: ['g_{xx} = 1/y\u00B2', 'g_{yy} = 1/y\u00B2', 'g_{xy} = 0'],
                                inverse: ['g^{xx} = y\u00B2', 'g^{yy} = y\u00B2', 'g^{xy} = 0'],
                                partials: ['\u2202g_{xx}/\u2202y = -2/y\u00B3', '\u2202g_{yy}/\u2202y = -2/y\u00B3', 'All others = 0'],
                                christoffel: [
                                    '\u0393\u02E3_{xy} = \u0393\u02E3_{yx} = -1/y',
                                    '\u0393\u02B8_{xx} = 1/y',
                                    '\u0393\u02B8_{yy} = -1/y',
                                    '\u0393\u02E3_{xx} = 0, \u0393\u02B8_{xy} = 0'
                                ]
                            },
                            {
                                name: 'Flat Plane (Polar Coords)',
                                coords: '(r, \u03B8)',
                                metric: ['g_{rr} = 1', 'g_{\u03B8\u03B8} = r\u00B2', 'g_{r\u03B8} = 0'],
                                inverse: ['g^{rr} = 1', 'g^{\u03B8\u03B8} = 1/r\u00B2', 'g^{r\u03B8} = 0'],
                                partials: ['\u2202g_{\u03B8\u03B8}/\u2202r = 2r', 'All others = 0'],
                                christoffel: [
                                    '\u0393\u02B3_{\u03B8\u03B8} = -r',
                                    '\u0393\u1DBF_{r\u03B8} = \u0393\u1DBF_{\u03B8r} = 1/r',
                                    'All others = 0',
                                    '(Non-zero \u0393 despite flat geometry!)'
                                ]
                            }
                        ];

                        var surfIdx = 0;
                        VizEngine.createButton(controls, 'Sphere', function() { surfIdx = 0; draw(); });
                        VizEngine.createButton(controls, 'Hyperbolic', function() { surfIdx = 1; draw(); });
                        VizEngine.createButton(controls, 'Flat (Polar)', function() { surfIdx = 2; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = surfaces[surfIdx];
                            var y = 30;
                            var lineH = 20;

                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';

                            // Title
                            viz.screenText(s.name, viz.width / 2, y, viz.colors.white, 16);
                            y += 30;

                            viz.screenText('Coordinates: ' + s.coords, 40, y, viz.colors.text, 12);
                            y += 25;

                            // Step 1: Metric
                            viz.screenText('Step 1: Metric components', 40, y, viz.colors.blue, 13);
                            y += lineH;
                            for (var i = 0; i < s.metric.length; i++) {
                                viz.screenText('  ' + s.metric[i], 50, y, viz.colors.text, 12, 'left');
                                y += lineH;
                            }
                            y += 5;

                            // Step 2: Inverse metric
                            viz.screenText('Step 2: Inverse metric', 40, y, viz.colors.teal, 13);
                            y += lineH;
                            for (var j = 0; j < s.inverse.length; j++) {
                                viz.screenText('  ' + s.inverse[j], 50, y, viz.colors.text, 12, 'left');
                                y += lineH;
                            }
                            y += 5;

                            // Step 3: Partial derivatives
                            viz.screenText('Step 3: Partial derivatives of metric', 40, y, viz.colors.orange, 13);
                            y += lineH;
                            for (var k = 0; k < s.partials.length; k++) {
                                viz.screenText('  ' + s.partials[k], 50, y, viz.colors.text, 12, 'left');
                                y += lineH;
                            }
                            y += 5;

                            // Step 4: Christoffel symbols
                            viz.screenText('Step 4: \u0393\u1D4F_{ij} = \u00BD g^{k\u2113}(\u2202g_{j\u2113}/\u2202x\u2071 + \u2202g_{i\u2113}/\u2202x\u02B2 \u2212 \u2202g_{ij}/\u2202x^\u2113)', 40, y, viz.colors.purple, 12);
                            y += lineH + 2;
                            for (var m = 0; m < s.christoffel.length; m++) {
                                var col = m < s.christoffel.length - 1 ? viz.colors.yellow : viz.colors.text;
                                viz.screenText('  ' + s.christoffel[m], 50, y, col, 12, 'left');
                                y += lineH;
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the Christoffel symbols of \\(\\mathbb{R}^2\\) in polar coordinates \\((r, \\theta)\\) with metric \\(ds^2 = dr^2 + r^2\\,d\\theta^2\\).',
                    hint: 'The only nonzero metric partial derivative is \\(\\partial g_{\\theta\\theta}/\\partial r = 2r\\). Use the formula \\(\\Gamma^k_{ij} = \\frac{1}{2}g^{k\\ell}(\\partial_i g_{j\\ell} + \\partial_j g_{i\\ell} - \\partial_\\ell g_{ij})\\).',
                    solution: '\\(g_{rr}=1\\), \\(g_{\\theta\\theta}=r^2\\), \\(g_{r\\theta}=0\\). Inverse: \\(g^{rr}=1\\), \\(g^{\\theta\\theta}=1/r^2\\). The only nonzero derivative is \\(\\partial_r g_{\\theta\\theta} = 2r\\). Then: \\(\\Gamma^r_{\\theta\\theta} = \\frac{1}{2}g^{rr}(-\\partial_r g_{\\theta\\theta}) = -r\\). \\(\\Gamma^\\theta_{r\\theta} = \\Gamma^\\theta_{\\theta r} = \\frac{1}{2}g^{\\theta\\theta}(\\partial_r g_{\\theta\\theta}) = \\frac{1}{r}\\). All others are zero.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Parallel Transport
        // ================================================================
        {
            id: 'sec-parallel',
            title: 'Parallel Transport',
            content: `
<h2>Parallel Transport</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Question</div>
    <div class="env-body">
        <p>Given a vector \\(V_0\\) at a point \\(p\\) and a curve \\(\\gamma\\) starting at \\(p\\), how do we "carry" \\(V_0\\) along \\(\\gamma\\) in the most natural way? The answer is <strong>parallel transport</strong>: move the vector so that its covariant derivative along \\(\\gamma\\) vanishes. On flat space this gives a constant vector. On curved space, the result depends on the path.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 15.5 (Parallel Transport)</div>
    <div class="env-body">
        <p>Let \\(\\gamma \\colon [0,1] \\to M\\) be a smooth curve and \\(V_0 \\in T_{\\gamma(0)}M\\). A vector field \\(V(t)\\) along \\(\\gamma\\) is <strong>parallel</strong> if</p>
        \\[\\frac{DV}{dt} := \\nabla_{\\dot{\\gamma}(t)} V(t) = 0.\\]
        <p>In local coordinates with \\(\\gamma(t) = (x^1(t), \\ldots, x^n(t))\\) and \\(V(t) = V^k(t)\\,\\partial_k\\), this becomes the ODE system:</p>
        \\[\\frac{dV^k}{dt} + \\Gamma^k_{ij}(\\gamma(t))\\,\\dot{x}^i(t)\\,V^j(t) = 0, \\quad k = 1, \\ldots, n.\\]
    </div>
</div>

<p>This is a linear first-order ODE, so it has a unique solution for each initial condition \\(V(0) = V_0\\). The map \\(P_{\\gamma} \\colon T_{\\gamma(0)}M \\to T_{\\gamma(1)}M\\) sending \\(V_0\\) to \\(V(1)\\) is the <strong>parallel transport map</strong>. Since the ODE is linear, \\(P_\\gamma\\) is a linear isomorphism.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.3 (Parallel Transport Preserves the Metric)</div>
    <div class="env-body">
        <p>If \\(\\nabla\\) is the Levi-Civita connection, then parallel transport is an <strong>isometry</strong>: for any parallel vector fields \\(V, W\\) along \\(\\gamma\\),</p>
        \\[g(V(t), W(t)) = \\text{const}.\\]
    </div>
</div>

<p><em>Proof.</em> \\(\\frac{d}{dt}g(V,W) = g(\\nabla_{\\dot\\gamma}V, W) + g(V, \\nabla_{\\dot\\gamma}W) = 0 + 0 = 0\\). \\(\\square\\)</p>

<div class="env-block example">
    <div class="env-title">Example: Parallel Transport on the Sphere</div>
    <div class="env-body">
        <p>Transport a vector around a spherical triangle with vertices at the north pole, the equator at longitude 0, and the equator at longitude \\(\\alpha\\). The three sides are arcs of great circles (geodesics). After going around the triangle, the vector returns to its starting point but has been rotated by angle \\(\\alpha\\).</p>
        <p>This angle equals the <strong>area</strong> of the triangle (on a unit sphere), a remarkable fact connected to the Gauss-Bonnet theorem and holonomy.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-parallel-transport-sphere',
                    title: 'Parallel Transport Around a Spherical Triangle',
                    description: 'THE showpiece visualization: a vector is parallel-transported around a triangle on the sphere formed by two meridians and the equator. After returning, it has rotated by an angle equal to the enclosed area. Adjust the opening angle to see the rotation change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 460,
                            originX: 280, originY: 230, scale: 140
                        });

                        var alpha = 1.2;
                        var tAnim = 0;
                        var animating = false;

                        VizEngine.createSlider(controls, 'Opening angle \u03B1', 0.2, Math.PI / 2 * 0.99, alpha, 0.05, function(v) {
                            alpha = v; tAnim = 0; draw();
                        });
                        VizEngine.createSlider(controls, 'Transport progress t', 0, 1, 0, 0.005, function(v) {
                            tAnim = v; draw();
                        });

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) { viz.stopAnimation(); animating = false; animBtn.textContent = 'Animate'; return; }
                            animating = true; animBtn.textContent = 'Stop';
                            tAnim = 0;
                            viz.animate(function() {
                                tAnim += 0.003;
                                if (tAnim > 1) { tAnim = 1; viz.stopAnimation(); animating = false; animBtn.textContent = 'Animate'; }
                                draw();
                            });
                        });

                        // 3D projection helpers
                        var camTheta = 0.45;
                        var camPhi = 0.3;
                        function project3D(x, y, z) {
                            // Simple orthographic projection with rotation
                            var ct = Math.cos(camTheta), st = Math.sin(camTheta);
                            var cp = Math.cos(camPhi), sp = Math.sin(camPhi);
                            var x1 = x * ct + z * st;
                            var y1 = y;
                            var z1 = -x * st + z * ct;
                            var px = x1;
                            var py = y1 * cp + z1 * sp;
                            return [px, py];
                        }

                        function spherePoint(theta, phi) {
                            return [Math.sin(theta) * Math.cos(phi), Math.cos(theta), Math.sin(theta) * Math.sin(phi)];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw wireframe sphere
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;

                            // Latitude lines
                            for (var lat = 1; lat < 6; lat++) {
                                var th = lat * Math.PI / 6;
                                ctx.beginPath();
                                for (var i = 0; i <= 60; i++) {
                                    var ph = i * 2 * Math.PI / 60;
                                    var p = spherePoint(th, ph);
                                    var s = project3D(p[0], p[1], p[2]);
                                    var sx = viz.originX + s[0] * viz.scale;
                                    var sy = viz.originY - s[1] * viz.scale;
                                    if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Longitude lines
                            for (var lon = 0; lon < 8; lon++) {
                                var ph2 = lon * Math.PI / 4;
                                ctx.beginPath();
                                for (var j = 0; j <= 40; j++) {
                                    var th2 = j * Math.PI / 40;
                                    var p2 = spherePoint(th2, ph2);
                                    var s2 = project3D(p2[0], p2[1], p2[2]);
                                    var sx2 = viz.originX + s2[0] * viz.scale;
                                    var sy2 = viz.originY - s2[1] * viz.scale;
                                    if (j === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Triangle path: NP -> (equator, phi=0) -> (equator, phi=alpha) -> NP
                            // Leg 1: North pole (theta=0) down meridian phi=0 to equator (theta=pi/2)
                            // Leg 2: Along equator from phi=0 to phi=alpha
                            // Leg 3: Up meridian phi=alpha to north pole

                            // Draw the triangle
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;

                            // Leg 1: meridian phi=0
                            ctx.beginPath();
                            for (var a = 0; a <= 30; a++) {
                                var t1 = a * (Math.PI / 2) / 30;
                                var pp = spherePoint(t1, 0);
                                var sp = project3D(pp[0], pp[1], pp[2]);
                                var sxx = viz.originX + sp[0] * viz.scale;
                                var syy = viz.originY - sp[1] * viz.scale;
                                if (a === 0) ctx.moveTo(sxx, syy); else ctx.lineTo(sxx, syy);
                            }
                            ctx.stroke();

                            // Leg 2: equator from phi=0 to phi=alpha
                            ctx.beginPath();
                            for (var b = 0; b <= 30; b++) {
                                var phi2 = b * alpha / 30;
                                var pp2 = spherePoint(Math.PI / 2, phi2);
                                var sp2 = project3D(pp2[0], pp2[1], pp2[2]);
                                var sxx2 = viz.originX + sp2[0] * viz.scale;
                                var syy2 = viz.originY - sp2[1] * viz.scale;
                                if (b === 0) ctx.moveTo(sxx2, syy2); else ctx.lineTo(sxx2, syy2);
                            }
                            ctx.stroke();

                            // Leg 3: meridian phi=alpha back to NP
                            ctx.beginPath();
                            for (var c = 0; c <= 30; c++) {
                                var t3 = Math.PI / 2 - c * (Math.PI / 2) / 30;
                                var pp3 = spherePoint(t3, alpha);
                                var sp3 = project3D(pp3[0], pp3[1], pp3[2]);
                                var sxx3 = viz.originX + sp3[0] * viz.scale;
                                var syy3 = viz.originY - sp3[1] * viz.scale;
                                if (c === 0) ctx.moveTo(sxx3, syy3); else ctx.lineTo(sxx3, syy3);
                            }
                            ctx.stroke();

                            // Shade triangle
                            ctx.fillStyle = viz.colors.orange + '18';
                            ctx.beginPath();
                            for (var d = 0; d <= 20; d++) {
                                var tt = d * (Math.PI / 2) / 20;
                                var ppd = spherePoint(tt, 0);
                                var spd = project3D(ppd[0], ppd[1], ppd[2]);
                                var sxd = viz.originX + spd[0] * viz.scale;
                                var syd = viz.originY - spd[1] * viz.scale;
                                if (d === 0) ctx.moveTo(sxd, syd); else ctx.lineTo(sxd, syd);
                            }
                            for (var e = 0; e <= 20; e++) {
                                var phi3 = e * alpha / 20;
                                var ppe = spherePoint(Math.PI / 2, phi3);
                                var spe = project3D(ppe[0], ppe[1], ppe[2]);
                                ctx.lineTo(viz.originX + spe[0] * viz.scale, viz.originY - spe[1] * viz.scale);
                            }
                            for (var f = 0; f <= 20; f++) {
                                var t3b = Math.PI / 2 - f * (Math.PI / 2) / 20;
                                var ppf = spherePoint(t3b, alpha);
                                var spf = project3D(ppf[0], ppf[1], ppf[2]);
                                ctx.lineTo(viz.originX + spf[0] * viz.scale, viz.originY - spf[1] * viz.scale);
                            }
                            ctx.closePath();
                            ctx.fill();

                            // Parallel transport of vector along the path
                            // Leg 1 (NP down meridian phi=0): vector starts as (tangent to equator) = d/dphi direction
                            // At NP, d/dphi points in the phi=pi/2 direction: (0, 0, 1) roughly
                            // Along meridian phi=0, parallel transport keeps vector tangent, rotating in the tangent plane
                            // For a unit sphere: PT down meridian phi=0 keeps the vector pointing in d/dphi direction
                            // = (0, 0, 1) in (x,y,z) at each point

                            // Actually, let's compute properly.
                            // Initial vector at NP: v = e_phi direction at NP ~ (0,0,1) in 3D
                            // Leg 1: Along meridian phi=0 from NP (theta=0) to equator (theta=pi/2)
                            //   PT along a geodesic (great circle) preserves the angle with the tangent
                            //   Tangent to meridian at any theta: d/dtheta = (cos(theta),0,0) at phi=0... let's use 3D
                            //   At theta on phi=0: position = (sin(theta), cos(theta), 0)
                            //   Tangent to meridian: (cos(theta), -sin(theta), 0)
                            //   Normal: (sin(theta), cos(theta), 0)
                            //   The vector is initially perpendicular to meridian (in d/dphi direction)
                            //   PT along geodesic preserves angle with tangent
                            //   So vector stays perpendicular to meridian: always in d/dphi direction
                            //   At theta, phi=0: d/dphi direction (unit) = (0, 0, 1)
                            //   So at equator (theta=pi/2, phi=0): v = (0, 0, 1)

                            // Leg 2: Along equator from phi=0 to phi=alpha at theta=pi/2
                            //   Equator is a geodesic. Tangent: d/dphi = (-sin(phi), 0, cos(phi))
                            //   Our vector (0,0,1) at phi=0 makes angle 0 with tangent (0,0,1). Wait...
                            //   tangent to equator at phi=0: d/dphi = (0, 0, 1)... hmm
                            //   Actually at theta=pi/2, phi: position = (cos(phi), 0, sin(phi))
                            //   Tangent to equator: (-sin(phi), 0, cos(phi))
                            //   At phi=0, tangent = (0,0,1). Our vector = (0,0,1). So v is parallel to tangent.
                            //   PT keeps it parallel to tangent: at phi, v = (-sin(phi), 0, cos(phi))

                            // Leg 3: Up meridian phi=alpha from equator to NP
                            //   At equator, phi=alpha: v = (-sin(alpha), 0, cos(alpha))
                            //   Tangent to meridian (going up = decreasing theta): (-cos(theta)cos(alpha), sin(theta), -cos(theta)sin(alpha))
                            //   At theta=pi/2: tangent up = (0, 1, 0) (going toward NP)
                            //   v = (-sin(alpha), 0, cos(alpha)) is perpendicular to tangent (dot=0), perpendicular to normal
                            //   PT preserves angle, so v stays perpendicular to tangent (i.e., in d/dphi direction)
                            //   At NP: d/dphi direction at phi=alpha corresponds to direction (-sin(alpha), 0, cos(alpha))
                            //   But wait, we need to think in the tangent plane at NP
                            //   At NP: tangent plane has basis (1,0,0) and (0,0,1) [x and z directions]
                            //   The final vector at NP: (-sin(alpha), 0, cos(alpha))
                            //   Original vector: (0, 0, 1)
                            //   Angle between them: cos(angle) = cos(alpha), so angle = alpha!

                            var totalLen = Math.PI / 2 + alpha + Math.PI / 2;
                            var leg1Frac = (Math.PI / 2) / totalLen;
                            var leg2Frac = alpha / totalLen;

                            var t = tAnim;
                            var pos3d, vec3d;

                            if (t <= leg1Frac) {
                                // Leg 1: down meridian phi=0
                                var frac = t / leg1Frac;
                                var theta = frac * Math.PI / 2;
                                pos3d = [Math.sin(theta), Math.cos(theta), 0];
                                vec3d = [0, 0, 1]; // always d/dphi along this meridian
                            } else if (t <= leg1Frac + leg2Frac) {
                                // Leg 2: along equator
                                var frac2 = (t - leg1Frac) / leg2Frac;
                                var phi = frac2 * alpha;
                                pos3d = [Math.cos(phi), 0, Math.sin(phi)];
                                vec3d = [-Math.sin(phi), 0, Math.cos(phi)]; // parallel to tangent
                            } else {
                                // Leg 3: up meridian phi=alpha
                                var frac3 = (t - leg1Frac - leg2Frac) / (1 - leg1Frac - leg2Frac);
                                var theta3 = Math.PI / 2 - frac3 * Math.PI / 2;
                                pos3d = [Math.sin(theta3) * Math.cos(alpha), Math.cos(theta3), Math.sin(theta3) * Math.sin(alpha)];
                                vec3d = [-Math.sin(alpha), 0, Math.cos(alpha)]; // stays perpendicular to meridian
                            }

                            // Draw vector
                            var baseProj = project3D(pos3d[0], pos3d[1], pos3d[2]);
                            var vecScale = 0.35;
                            var tipProj = project3D(
                                pos3d[0] + vec3d[0] * vecScale,
                                pos3d[1] + vec3d[1] * vecScale,
                                pos3d[2] + vec3d[2] * vecScale
                            );
                            viz.drawVector(baseProj[0], baseProj[1], tipProj[0], tipProj[1], viz.colors.teal, '', 3);
                            viz.drawPoint(baseProj[0], baseProj[1], viz.colors.white, '', 4);

                            // Draw initial vector (ghost) at NP
                            var npProj = project3D(0, 1, 0);
                            var initTipProj = project3D(0 * vecScale, 1, 1 * vecScale);
                            if (tAnim > 0.01) {
                                ctx.globalAlpha = 0.3;
                                viz.drawVector(npProj[0], npProj[1], initTipProj[0], initTipProj[1], viz.colors.blue, '', 2);
                                ctx.globalAlpha = 1;
                            }

                            // If we're at the end, show the angle
                            if (tAnim > 0.98) {
                                var finalTipProj = project3D(
                                    -Math.sin(alpha) * vecScale,
                                    1,
                                    Math.cos(alpha) * vecScale
                                );
                                viz.drawVector(npProj[0], npProj[1], finalTipProj[0], finalTipProj[1], viz.colors.teal, '', 3);

                                // Arc showing the angle
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var arcR = 0.15;
                                for (var ar = 0; ar <= 20; ar++) {
                                    var ang = ar * alpha / 20;
                                    var arcPt = project3D(-Math.sin(ang) * arcR, 1, Math.cos(ang) * arcR);
                                    var arx = viz.originX + arcPt[0] * viz.scale;
                                    var ary = viz.originY - arcPt[1] * viz.scale;
                                    if (ar === 0) ctx.moveTo(arx, ary); else ctx.lineTo(arx, ary);
                                }
                                ctx.stroke();
                            }

                            // Labels
                            var npLabel = project3D(0, 1.15, 0);
                            viz.screenText('N', viz.originX + npLabel[0] * viz.scale, viz.originY - npLabel[1] * viz.scale, viz.colors.white, 12);

                            var area = alpha; // area of spherical triangle with two right angles and opening alpha
                            viz.screenText('Opening angle \u03B1 = ' + alpha.toFixed(2) + ' rad', viz.width / 2, 20, viz.colors.orange, 13);
                            viz.screenText('Triangle area = \u03B1 = ' + alpha.toFixed(2), viz.width / 2, 40, viz.colors.yellow, 12);
                            viz.screenText('Vector rotation after loop = ' + alpha.toFixed(2) + ' rad = ' + (alpha * 180 / Math.PI).toFixed(1) + '\u00B0', viz.width / 2, viz.height - 20, viz.colors.teal, 13);
                            if (tAnim > 0.98) {
                                viz.screenText('Rotation = Area (Gauss-Bonnet!)', viz.width / 2, viz.height - 40, viz.colors.yellow, 14);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-parallel-transport-cone',
                    title: 'Parallel Transport on a Cone: Unfolding Trick',
                    description: 'A cone can be unrolled into a flat sector. Parallel transport on the cone corresponds to straight-line transport on the flat sector. When you fold back, the vector has rotated. Adjust the cone angle to see the effect.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 140, originY: 350, scale: 100
                        });

                        var halfAngle = 0.5; // half-angle of cone
                        var tParam = 0.7;

                        VizEngine.createSlider(controls, 'Cone half-angle', 0.15, 1.4, halfAngle, 0.05, function(v) {
                            halfAngle = v; draw();
                        });
                        VizEngine.createSlider(controls, 'Transport around loop', 0, 1, tParam, 0.02, function(v) {
                            tParam = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Left: the cone (side view + top view schematic)
                            var sinA = Math.sin(halfAngle);
                            var cosA = Math.cos(halfAngle);

                            // Draw the cone shape (side view triangle)
                            var coneH = 2.5;
                            var coneR = coneH * sinA / cosA;
                            var apexX = 1.0, apexY = coneH;

                            // Cone outline
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            var apexS = [viz.originX + apexX * viz.scale, viz.originY - apexY * viz.scale];
                            var leftBase = [viz.originX + (apexX - coneR) * viz.scale, viz.originY];
                            var rightBase = [viz.originX + (apexX + coneR) * viz.scale, viz.originY];
                            ctx.beginPath();
                            ctx.moveTo(leftBase[0], leftBase[1]);
                            ctx.lineTo(apexS[0], apexS[1]);
                            ctx.lineTo(rightBase[0], rightBase[1]);
                            ctx.stroke();

                            // Base ellipse
                            ctx.strokeStyle = viz.colors.purple + '88';
                            ctx.beginPath();
                            ctx.ellipse(
                                viz.originX + apexX * viz.scale,
                                viz.originY,
                                coneR * viz.scale,
                                coneR * viz.scale * 0.25,
                                0, 0, 2 * Math.PI
                            );
                            ctx.stroke();

                            // Circle on cone for parallel transport loop
                            var circleH = 1.2;
                            var circleR = circleH * sinA / cosA;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.ellipse(
                                viz.originX + apexX * viz.scale,
                                viz.originY - circleH * viz.scale,
                                circleR * viz.scale,
                                circleR * viz.scale * 0.25,
                                0, 0, 2 * Math.PI
                            );
                            ctx.stroke();

                            // Vector on cone (schematic)
                            var vecAngle = tParam * 2 * Math.PI;
                            var vx = apexX + circleR * Math.cos(vecAngle);
                            var vy = circleH;
                            viz.drawPoint(vx, vy, viz.colors.teal, '', 4);

                            viz.screenText('Cone', viz.originX + apexX * viz.scale, 20, viz.colors.purple, 13);
                            viz.screenText('half-angle = ' + (halfAngle * 180 / Math.PI).toFixed(0) + '\u00B0', viz.originX + apexX * viz.scale, 38, viz.colors.text, 11);

                            // Right: unfolded cone (flat sector)
                            var sectorCX = 420;
                            var sectorCY = 80;
                            var slantR = 160;
                            var sectorAngle = 2 * Math.PI * sinA; // sector opening angle

                            // Draw sector
                            ctx.fillStyle = viz.colors.purple + '15';
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(sectorCX, sectorCY);
                            for (var i = 0; i <= 40; i++) {
                                var ang = -sectorAngle / 2 + i * sectorAngle / 40;
                                ctx.lineTo(sectorCX + slantR * Math.sin(ang), sectorCY + slantR * Math.cos(ang));
                            }
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Circle on unfolded cone
                            var circleSlant = circleH / cosA;
                            var unR = slantR * circleSlant / (coneH / cosA);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var j = 0; j <= 40; j++) {
                                var ang2 = -sectorAngle / 2 + j * sectorAngle / 40;
                                var ux = sectorCX + unR * Math.sin(ang2);
                                var uy = sectorCY + unR * Math.cos(ang2);
                                if (j === 0) ctx.moveTo(ux, uy); else ctx.lineTo(ux, uy);
                            }
                            ctx.stroke();

                            // Parallel transport on unfolded = straight line = constant direction
                            var ptAngle = -sectorAngle / 2 + tParam * sectorAngle;
                            var ptX = sectorCX + unR * Math.sin(ptAngle);
                            var ptY = sectorCY + unR * Math.cos(ptAngle);

                            // Vector direction: always same in the flat sector (say pointing right)
                            var vdx = 25;
                            var vdy = 0;

                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.moveTo(ptX, ptY);
                            ctx.lineTo(ptX + vdx, ptY + vdy);
                            ctx.stroke();
                            // Arrowhead
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.moveTo(ptX + vdx + 4, ptY);
                            ctx.lineTo(ptX + vdx - 6, ptY - 5);
                            ctx.lineTo(ptX + vdx - 6, ptY + 5);
                            ctx.closePath();
                            ctx.fill();

                            viz.drawScreenPoint(ptX, ptY, viz.colors.white, 4);

                            // Show initial and final positions
                            var startAng = -sectorAngle / 2;
                            var startX = sectorCX + unR * Math.sin(startAng);
                            var startY = sectorCY + unR * Math.cos(startAng);

                            // Show deficit angle
                            var deficit = 2 * Math.PI - sectorAngle;
                            viz.screenText('Unfolded cone (flat sector)', sectorCX, sectorCY - 15, viz.colors.purple, 13);
                            viz.screenText('Sector angle = 2\u03C0 sin(\u03B1) = ' + (sectorAngle * 180 / Math.PI).toFixed(0) + '\u00B0', sectorCX, viz.height - 50, viz.colors.orange, 12);
                            viz.screenText('Deficit angle = 2\u03C0(1 \u2212 sin \u03B1) = ' + (deficit * 180 / Math.PI).toFixed(0) + '\u00B0', sectorCX, viz.height - 30, viz.colors.teal, 12);
                            viz.screenText('Holonomy = deficit angle = rotation of vector after one loop', viz.width / 2, viz.height - 10, viz.colors.yellow, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write the parallel transport equations for a vector \\(V = V^\\theta\\,\\partial_\\theta + V^\\phi\\,\\partial_\\phi\\) along the latitude circle \\(\\theta = \\theta_0\\) (parametrized by \\(\\phi\\)) on the unit sphere.',
                    hint: 'Along \\(\\theta = \\theta_0\\), we have \\(\\dot{\\theta} = 0\\) and \\(\\dot{\\phi} = 1\\). Use \\(\\Gamma^\\theta_{\\phi\\phi} = -\\sin\\theta\\cos\\theta\\) and \\(\\Gamma^\\phi_{\\theta\\phi} = \\cot\\theta\\).',
                    solution: 'The parallel transport equations are \\(\\dot{V}^k + \\Gamma^k_{ij}\\dot{x}^i V^j = 0\\). With \\(\\dot{\\theta}=0, \\dot{\\phi}=1\\): \\(\\dot{V}^\\theta + \\Gamma^\\theta_{\\phi\\phi} V^\\phi = 0 \\implies \\dot{V}^\\theta = \\sin\\theta_0\\cos\\theta_0\\, V^\\phi\\). And \\(\\dot{V}^\\phi + \\Gamma^\\phi_{\\phi\\theta} V^\\theta = 0 \\implies \\dot{V}^\\phi = -\\cot\\theta_0\\, V^\\theta\\). This coupled ODE has solution \\(V^\\theta(\\phi) = A\\cos(\\phi\\cos\\theta_0) + B\\sin(\\phi\\cos\\theta_0)\\), \\(V^\\phi(\\phi) = \\frac{1}{\\sin\\theta_0}[-A\\sin(\\phi\\cos\\theta_0) + B\\cos(\\phi\\cos\\theta_0)]\\). After one full loop (\\(\\phi = 2\\pi\\)), the vector has rotated by angle \\(2\\pi\\cos\\theta_0\\).'
                },
                {
                    question: 'Show that parallel transport along a geodesic preserves the angle between the transported vector and the tangent to the geodesic.',
                    hint: 'The tangent vector to a geodesic is itself parallel along the geodesic. Use the fact that parallel transport preserves inner products.',
                    solution: 'Let \\(\\dot{\\gamma}\\) be the tangent to the geodesic and \\(V\\) a parallel field along it. Then \\(\\nabla_{\\dot{\\gamma}}\\dot{\\gamma} = 0\\) (geodesic equation) and \\(\\nabla_{\\dot{\\gamma}}V = 0\\) (parallel transport). By metric compatibility: \\(\\frac{d}{dt}g(V, \\dot{\\gamma}) = g(\\nabla_{\\dot{\\gamma}}V, \\dot{\\gamma}) + g(V, \\nabla_{\\dot{\\gamma}}\\dot{\\gamma}) = 0\\). Also \\(|V|\\) and \\(|\\dot{\\gamma}|\\) are constant (both are parallel). So \\(\\cos\\angle(V, \\dot{\\gamma}) = g(V,\\dot{\\gamma})/(|V||\\dot{\\gamma}|)\\) is constant.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Holonomy
        // ================================================================
        {
            id: 'sec-holonomy',
            title: 'Holonomy',
            content: `
<h2>Holonomy</h2>

<div class="env-block intuition">
    <div class="env-title">The Signature of Curvature</div>
    <div class="env-body">
        <p>On a flat surface, parallel transport around any closed loop brings a vector back to itself. On a curved surface, it does not: the vector returns rotated. This rotation is called <strong>holonomy</strong>, and it is curvature made visible.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 15.6 (Holonomy)</div>
    <div class="env-body">
        <p>Let \\(\\gamma\\) be a piecewise smooth closed loop based at \\(p\\). The <strong>holonomy</strong> of \\(\\gamma\\) is the linear map</p>
        \\[\\operatorname{Hol}(\\gamma) = P_\\gamma \\colon T_pM \\to T_pM\\]
        <p>given by parallel transport around \\(\\gamma\\). For the Levi-Civita connection, \\(P_\\gamma\\) is an orthogonal transformation (it preserves the metric).</p>
    </div>
</div>

<h3>Holonomy and Curvature</h3>

<p>For an infinitesimal parallelogram spanned by vectors \\(X\\) and \\(Y\\) at \\(p\\), the holonomy is (to leading order):</p>

\\[
P_{\\text{loop}} \\approx \\operatorname{Id} + \\epsilon^2\\, R(X,Y)
\\]

<p>where \\(R(X,Y)\\) is the <strong>Riemann curvature endomorphism</strong>. This is the fundamental relationship: curvature <em>is</em> infinitesimal holonomy.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.4 (Ambrose-Singer)</div>
    <div class="env-body">
        <p>The Lie algebra of the holonomy group at \\(p\\) is generated by all curvature endomorphisms \\(R(X,Y)\\) obtained by parallel-transporting tangent vectors from all points of \\(M\\) back to \\(p\\). In particular, the connection is flat (zero curvature) if and only if the holonomy is trivial (parallel transport is path-independent).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Holonomy on the Sphere</div>
    <div class="env-body">
        <p>On the unit sphere with Gaussian curvature \\(K = 1\\), parallel transport around a region \\(\\Omega\\) rotates vectors by</p>
        \\[\\text{rotation angle} = \\iint_\\Omega K\\,dA = \\text{Area}(\\Omega).\\]
        <p>For a spherical triangle with angles \\(A, B, C\\): Area \\(= A + B + C - \\pi\\) (Girard's formula). So the holonomy angle equals the angular excess of the triangle.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Berry Phase</div>
    <div class="env-body">
        <p>Holonomy appears throughout physics. In quantum mechanics, when a quantum state is transported adiabatically around a loop in parameter space, it acquires a phase (Berry phase) that is precisely the holonomy of the Berry connection on the parameter space. This is the same mathematics in a different guise.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-holonomy-loop',
                    title: 'Holonomy: Transport Around Various Loops',
                    description: 'Transport a vector around loops of different sizes on the sphere. The rotation angle equals the enclosed area. Adjust the loop size to see how holonomy scales with curvature.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 440,
                            originX: 280, originY: 230, scale: 140
                        });

                        var loopSize = 0.6;
                        var tParam = 0;
                        var animating = false;

                        VizEngine.createSlider(controls, 'Loop size (colatitude)', 0.1, 1.4, loopSize, 0.05, function(v) {
                            loopSize = v; draw();
                        });
                        VizEngine.createSlider(controls, 'Progress t', 0, 1, 0, 0.005, function(v) {
                            tParam = v; draw();
                        });

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) { viz.stopAnimation(); animating = false; animBtn.textContent = 'Animate'; return; }
                            animating = true; animBtn.textContent = 'Stop';
                            tParam = 0;
                            viz.animate(function() {
                                tParam += 0.004;
                                if (tParam > 1) { tParam = 1; viz.stopAnimation(); animating = false; animBtn.textContent = 'Animate'; }
                                draw();
                            });
                        });

                        var camTheta = 0.4;
                        function project3D(x, y, z) {
                            var ct = Math.cos(camTheta), st = Math.sin(camTheta);
                            var px = x;
                            var py = y * ct + z * st;
                            return [px, py];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw sphere wireframe
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var lat = 1; lat < 6; lat++) {
                                var th = lat * Math.PI / 6;
                                ctx.beginPath();
                                for (var i = 0; i <= 60; i++) {
                                    var ph = i * 2 * Math.PI / 60;
                                    var p = [Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)];
                                    var s = project3D(p[0], p[1], p[2]);
                                    var sx = viz.originX + s[0] * viz.scale;
                                    var sy = viz.originY - s[1] * viz.scale;
                                    if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }
                            for (var lon = 0; lon < 8; lon++) {
                                var ph2 = lon * Math.PI / 4;
                                ctx.beginPath();
                                for (var j = 0; j <= 40; j++) {
                                    var th2 = j * Math.PI / 40;
                                    var p2 = [Math.sin(th2) * Math.cos(ph2), Math.cos(th2), Math.sin(th2) * Math.sin(ph2)];
                                    var s2 = project3D(p2[0], p2[1], p2[2]);
                                    var sx2 = viz.originX + s2[0] * viz.scale;
                                    var sy2 = viz.originY - s2[1] * viz.scale;
                                    if (j === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // The loop: latitude circle at theta = loopSize
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var k = 0; k <= 60; k++) {
                                var phi = k * 2 * Math.PI / 60;
                                var lp = [Math.sin(loopSize) * Math.cos(phi), Math.cos(loopSize), Math.sin(loopSize) * Math.sin(phi)];
                                var ls = project3D(lp[0], lp[1], lp[2]);
                                var lsx = viz.originX + ls[0] * viz.scale;
                                var lsy = viz.originY - ls[1] * viz.scale;
                                if (k === 0) ctx.moveTo(lsx, lsy); else ctx.lineTo(lsx, lsy);
                            }
                            ctx.stroke();

                            // Shade spherical cap
                            ctx.fillStyle = viz.colors.orange + '12';
                            ctx.beginPath();
                            var npS = project3D(0, 1, 0);
                            ctx.moveTo(viz.originX + npS[0] * viz.scale, viz.originY - npS[1] * viz.scale);
                            for (var m = 0; m <= 40; m++) {
                                var thm = m * loopSize / 40;
                                var pm = [Math.sin(thm), Math.cos(thm), 0];
                                var sm = project3D(pm[0], pm[1], pm[2]);
                                ctx.lineTo(viz.originX + sm[0] * viz.scale, viz.originY - sm[1] * viz.scale);
                            }
                            ctx.closePath();
                            ctx.fill();

                            // Parallel transport along the latitude circle
                            // PT along latitude theta_0: vector rotates at rate cos(theta_0)
                            // After going phi radians, rotation = phi * cos(theta_0)
                            var phi_t = tParam * 2 * Math.PI;
                            var rotation = phi_t * Math.cos(loopSize);

                            var pPos = [Math.sin(loopSize) * Math.cos(phi_t), Math.cos(loopSize), Math.sin(loopSize) * Math.sin(phi_t)];
                            var pProj = project3D(pPos[0], pPos[1], pPos[2]);

                            // At point (theta_0, phi), the d/dphi direction (tangent to lat circle):
                            // (-sin(phi), 0, cos(phi))
                            // The d/dtheta direction at that point:
                            // (cos(theta)*cos(phi), -sin(theta), cos(theta)*sin(phi))
                            // The parallel-transported vector starts as d/dtheta direction (pointing "south")
                            // and rotates in the tangent plane
                            var tangentPhi = [-Math.sin(phi_t), 0, Math.cos(phi_t)];
                            var tangentTheta = [
                                Math.cos(loopSize) * Math.cos(phi_t),
                                -Math.sin(loopSize),
                                Math.cos(loopSize) * Math.sin(phi_t)
                            ];

                            // Transported vector: cos(rotation)*e_theta + sin(rotation)*sin(theta_0)*e_phi_normalized
                            // Actually in the tangent plane basis: V = cos(rot)*e_theta + sin(rot)*e_phi/|e_phi|
                            // |e_phi| at theta_0 is sin(theta_0) but we want unit vectors
                            var vecX = Math.cos(rotation) * tangentTheta[0] + Math.sin(rotation) * tangentPhi[0];
                            var vecY = Math.cos(rotation) * tangentTheta[1] + Math.sin(rotation) * tangentPhi[1];
                            var vecZ = Math.cos(rotation) * tangentTheta[2] + Math.sin(rotation) * tangentPhi[2];

                            var vecScale = 0.3;
                            var tipProj = project3D(
                                pPos[0] + vecX * vecScale,
                                pPos[1] + vecY * vecScale,
                                pPos[2] + vecZ * vecScale
                            );

                            viz.drawVector(pProj[0], pProj[1], tipProj[0], tipProj[1], viz.colors.teal, '', 3);
                            viz.drawPoint(pProj[0], pProj[1], viz.colors.white, '', 4);

                            // After full loop, total rotation = 2*pi*cos(theta_0)
                            // Holonomy angle = 2*pi*(1 - cos(theta_0)) = solid angle = area of cap
                            var capArea = 2 * Math.PI * (1 - Math.cos(loopSize));
                            var holAngle = 2 * Math.PI * (1 - Math.cos(loopSize));

                            viz.screenText('Latitude loop at \u03B8\u2080 = ' + (loopSize * 180 / Math.PI).toFixed(0) + '\u00B0', viz.width / 2, 20, viz.colors.orange, 13);
                            viz.screenText('Spherical cap area = 2\u03C0(1 \u2212 cos \u03B8\u2080) = ' + capArea.toFixed(3), viz.width / 2, 40, viz.colors.yellow, 12);
                            viz.screenText('Holonomy angle = ' + (holAngle * 180 / Math.PI).toFixed(1) + '\u00B0', viz.width / 2, viz.height - 20, viz.colors.teal, 14);
                            if (tParam > 0.98) {
                                viz.screenText('Holonomy = Enclosed Area (curvature integrated)', viz.width / 2, viz.height - 42, viz.colors.yellow, 13);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A vector is parallel-transported around a latitude circle at colatitude \\(\\theta_0\\) on the unit sphere. Show that the holonomy angle is \\(2\\pi(1 - \\cos\\theta_0)\\) and verify that this equals the area of the enclosed spherical cap.',
                    hint: 'The parallel transport ODE along the latitude circle gives a rotation rate of \\(\\cos\\theta_0\\) per radian of longitude. After \\(2\\pi\\) of longitude, the vector has rotated by \\(2\\pi\\cos\\theta_0\\), so the deficit from identity is...',
                    solution: 'The parallel transport equations (from the previous section) give the vector rotating at angular rate \\(\\cos\\theta_0\\) per unit of \\(\\phi\\). After one full loop (\\(\\phi = 2\\pi\\)), the vector has rotated by \\(2\\pi\\cos\\theta_0\\) relative to its frame. The frame itself has rotated by \\(2\\pi\\) (one full turn), so the holonomy (net rotation relative to the initial vector) is \\(2\\pi - 2\\pi\\cos\\theta_0 = 2\\pi(1-\\cos\\theta_0)\\). The area of a spherical cap of colatitude \\(\\theta_0\\) is \\(\\int_0^{2\\pi}\\int_0^{\\theta_0}\\sin\\theta\\,d\\theta\\,d\\phi = 2\\pi(1-\\cos\\theta_0)\\). So holonomy equals area, consistent with the Gauss-Bonnet theorem since \\(K=1\\) on the unit sphere.'
                },
                {
                    question: 'Explain why a flat connection (zero curvature) has trivial holonomy for all contractible loops, but may have nontrivial holonomy for non-contractible loops.',
                    hint: 'Think about what "flat" means locally versus globally. Consider a cylinder versus a plane.',
                    solution: 'For a flat connection, the curvature \\(R \\equiv 0\\). By the Ambrose-Singer theorem, the local holonomy (generated by curvature) is trivial. For a contractible loop, we can shrink it to a point through a family of loops, each with trivial infinitesimal holonomy, so the total holonomy is trivial. But for a non-contractible loop (one that wraps around a "hole"), there is no such family. Example: on a cone (intrinsically flat), a loop around the apex has holonomy equal to the deficit angle \\(2\\pi(1-\\sin\\alpha)\\), despite zero curvature everywhere away from the apex. The topological obstruction prevents the loop from being contracted.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: From Connections to Curvature',
            content: `
<h2>Bridge: From Connections to Curvature</h2>

<p>We have now built the essential machinery of connections and parallel transport. Let us take stock of the landscape.</p>

<h3>What We Have Established</h3>

<div class="env-block remark">
    <div class="env-title">The Chain of Ideas</div>
    <div class="env-body">
        <ol>
            <li><strong>The problem</strong>: Tangent vectors at different points live in different spaces. There is no canonical way to compare them.</li>
            <li><strong>Connection</strong>: An additional structure \\(\\nabla\\) that tells us how to differentiate vector fields. Many connections exist; each gives a different notion of "constant."</li>
            <li><strong>Levi-Civita</strong>: On a Riemannian manifold, the metric selects a unique connection (torsion-free + metric-compatible). This is the canonical choice.</li>
            <li><strong>Christoffel symbols</strong>: The coordinate expression of the connection. Computable from the metric via an explicit formula.</li>
            <li><strong>Parallel transport</strong>: The integral version of the connection: carry vectors along curves with zero covariant derivative. An ODE problem.</li>
            <li><strong>Holonomy</strong>: Parallel transport around a closed loop measures curvature. Flat = trivial holonomy (for contractible loops). Curved = nontrivial holonomy.</li>
        </ol>
    </div>
</div>

<h3>Looking Ahead</h3>

<p>The holonomy of an infinitesimal loop is encoded by the <strong>Riemann curvature tensor</strong>, which will be the subject of the next chapter. The key formula:</p>

\\[
R(X,Y)Z = \\nabla_X\\nabla_Y Z - \\nabla_Y\\nabla_X Z - \\nabla_{[X,Y]}Z
\\]

<p>measures the failure of covariant derivatives to commute. This is the infinitesimal version of holonomy: if you parallel-transport \\(Z\\) around the parallelogram spanned by \\(X\\) and \\(Y\\), the change is \\(R(X,Y)Z\\) (to leading order).</p>

<p>From the curvature tensor, we will extract:</p>
<ul>
    <li><strong>Sectional curvature</strong>: the Gaussian curvature of 2-planes</li>
    <li><strong>Ricci curvature</strong>: a trace, measuring volume distortion</li>
    <li><strong>Scalar curvature</strong>: a further trace, a single number at each point</li>
</ul>

<p>These objects control geodesic deviation, topology (via Gauss-Bonnet and its generalizations), and the geometry of the manifold at every scale.</p>

<div class="env-block remark">
    <div class="env-title">The Bigger Picture</div>
    <div class="env-body">
        <p>Connections live not just on tangent bundles but on <em>any</em> vector bundle (or principal bundle). This generalization is the mathematical foundation of gauge theory in physics. The electromagnetic potential is a connection on a \\(U(1)\\)-bundle; the electromagnetic field is its curvature. Yang-Mills theory uses connections on \\(SU(n)\\)-bundles. General relativity uses the Levi-Civita connection on the tangent bundle. The pattern is universal: connection = field, curvature = field strength, holonomy = observable effect.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-parallel-frame',
                    title: 'Parallel Frame vs. Frenet Frame Along a Geodesic',
                    description: 'Compare a parallel-transported frame (constant w.r.t. the connection) with the Frenet frame (adapted to the curve). Along a geodesic on a surface, the parallel frame stays fixed while the Frenet frame may twist.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 320, scale: 55
                        });

                        var tParam = 0.5;
                        var showParallel = true;
                        var showFrenet = true;

                        VizEngine.createSlider(controls, 'Position along curve', 0, 1, tParam, 0.02, function(v) {
                            tParam = v; draw();
                        });
                        VizEngine.createButton(controls, 'Toggle Parallel Frame', function() {
                            showParallel = !showParallel; draw();
                        });
                        VizEngine.createButton(controls, 'Toggle Frenet Frame', function() {
                            showFrenet = !showFrenet; draw();
                        });

                        // A curve on a wavy surface
                        function curveX(t) { return -3.5 + 7 * t; }
                        function curveY(t) { return 2 + 0.8 * Math.sin(2.5 * t * Math.PI); }

                        // Tangent
                        function tangent(t) {
                            var dt = 0.001;
                            var dx = curveX(t + dt) - curveX(t - dt);
                            var dy = curveY(t + dt) - curveY(t - dt);
                            var len = Math.sqrt(dx * dx + dy * dy);
                            return [dx / len, dy / len];
                        }

                        // Normal (rotate tangent 90 degrees)
                        function normal(t) {
                            var T = tangent(t);
                            return [-T[1], T[0]];
                        }

                        // Surface as a background
                        function surfaceY(x) { return 2 + 0.8 * Math.sin(0.7 * x + 0.5) + 0.3 * Math.cos(1.3 * x); }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw the "surface" as a filled region
                            ctx.fillStyle = viz.colors.purple + '15';
                            ctx.beginPath();
                            ctx.moveTo(0, viz.height);
                            for (var i = 0; i <= 100; i++) {
                                var x = -5 + 10 * i / 100;
                                var y = surfaceY(x);
                                var sx = viz.originX + x * viz.scale;
                                var sy = viz.originY - y * viz.scale;
                                ctx.lineTo(sx, sy);
                            }
                            ctx.lineTo(viz.width, viz.height);
                            ctx.closePath();
                            ctx.fill();

                            // Draw surface curve
                            ctx.strokeStyle = viz.colors.purple + '66';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            for (var j = 0; j <= 100; j++) {
                                var xj = -5 + 10 * j / 100;
                                var yj = surfaceY(xj);
                                var sxj = viz.originX + xj * viz.scale;
                                var syj = viz.originY - yj * viz.scale;
                                if (j === 0) ctx.moveTo(sxj, syj); else ctx.lineTo(sxj, syj);
                            }
                            ctx.stroke();

                            // Draw the geodesic curve
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var k = 0; k <= 80; k++) {
                                var tk = k / 80;
                                var cx = curveX(tk);
                                var cy = curveY(tk);
                                var scx = viz.originX + cx * viz.scale;
                                var scy = viz.originY - cy * viz.scale;
                                if (k === 0) ctx.moveTo(scx, scy); else ctx.lineTo(scx, scy);
                            }
                            ctx.stroke();

                            // Current point
                            var px = curveX(tParam);
                            var py = curveY(tParam);
                            viz.drawPoint(px, py, viz.colors.white, '', 5);

                            var T = tangent(tParam);
                            var N = normal(tParam);
                            var vecLen = 1.2;

                            // Frenet frame (tangent + normal to curve)
                            if (showFrenet) {
                                viz.drawVector(px, py, px + T[0] * vecLen, py + T[1] * vecLen, viz.colors.orange, 'T', 2);
                                viz.drawVector(px, py, px + N[0] * vecLen, py + N[1] * vecLen, viz.colors.red, 'N', 2);
                            }

                            // Parallel frame: constant angle relative to tangent at t=0
                            // In flat space, parallel transport keeps vectors constant.
                            // On a curved surface, the parallel frame doesn't twist with the curve.
                            // We approximate by keeping a fixed angle relative to some reference.
                            if (showParallel) {
                                // Accumulate the rotation of the tangent
                                var totalRot = 0;
                                var steps = 100;
                                for (var m = 0; m < steps; m++) {
                                    var t1 = tParam * m / steps;
                                    var t2 = tParam * (m + 1) / steps;
                                    var T1 = tangent(t1);
                                    var T2 = tangent(t2);
                                    var dAngle = Math.atan2(T2[1], T2[0]) - Math.atan2(T1[1], T1[0]);
                                    if (dAngle > Math.PI) dAngle -= 2 * Math.PI;
                                    if (dAngle < -Math.PI) dAngle += 2 * Math.PI;
                                    totalRot += dAngle;
                                }

                                // Parallel frame: initial tangent direction, not rotated by curve bending
                                // (In flat space, parallel = constant direction)
                                var T0 = tangent(0);
                                var initAngle = Math.atan2(T0[1], T0[0]);

                                // The parallel-transported e1 makes angle (initAngle) with x-axis
                                // (no additional rotation from curvature in this 2D view)
                                var pe1x = Math.cos(initAngle);
                                var pe1y = Math.sin(initAngle);
                                var pe2x = -pe1y;
                                var pe2y = pe1x;

                                viz.drawVector(px, py, px + pe1x * vecLen, py + pe1y * vecLen, viz.colors.teal, 'e\u2081', 2);
                                viz.drawVector(px, py, px + pe2x * vecLen, py + pe2y * vecLen, viz.colors.blue, 'e\u2082', 2);
                            }

                            // Legend
                            var ly = 20;
                            if (showFrenet) {
                                viz.screenText('Frenet frame: T (tangent), N (normal)', viz.width / 2, ly, viz.colors.orange, 12);
                                ly += 18;
                            }
                            if (showParallel) {
                                viz.screenText('Parallel frame: e\u2081, e\u2082 (no twisting)', viz.width / 2, ly, viz.colors.teal, 12);
                                ly += 18;
                            }
                            viz.screenText('The Frenet frame rotates with the curve; the parallel frame does not', viz.width / 2, viz.height - 15, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that on a surface of constant Gaussian curvature \\(K\\), the holonomy angle around a simple closed curve \\(\\gamma\\) bounding a region \\(\\Omega\\) is \\(K \\cdot \\text{Area}(\\Omega)\\).',
                    hint: 'Use the local Gauss-Bonnet theorem: \\(\\int_\\gamma \\kappa_g\\,ds + \\iint_\\Omega K\\,dA = 2\\pi\\). What is the holonomy in terms of \\(\\int \\kappa_g\\,ds\\)?',
                    solution: 'The holonomy angle for parallel transport around \\(\\gamma\\) is \\(\\Delta\\theta = 2\\pi - \\int_\\gamma \\kappa_g\\,ds\\) (the deficit from the total turning). By Gauss-Bonnet: \\(\\int_\\gamma \\kappa_g\\,ds = 2\\pi - \\iint_\\Omega K\\,dA\\). Thus \\(\\Delta\\theta = 2\\pi - (2\\pi - K \\cdot \\text{Area}(\\Omega)) = K \\cdot \\text{Area}(\\Omega)\\).'
                },
                {
                    question: 'The Riemann curvature endomorphism \\(R(X,Y)\\) appears as the infinitesimal holonomy around a parallelogram spanned by \\(X, Y\\). Explain why \\(R(X,Y) = -R(Y,X)\\) is geometrically obvious from the holonomy interpretation.',
                    hint: 'What happens when you traverse a loop in the opposite direction?',
                    solution: 'Traversing the parallelogram in the opposite order (first \\(Y\\) then \\(X\\), or equivalently, going around the same loop backwards) reverses the holonomy. If the forward holonomy is approximately \\(\\text{Id} + \\epsilon^2 R(X,Y)\\), the backward holonomy is approximately \\(\\text{Id} + \\epsilon^2 R(Y,X)\\). Since the backward transport is the inverse of the forward transport, to leading order \\(R(Y,X) = -R(X,Y)\\). Orientation reversal negates the enclosed area (and thus the curvature integral), which is the geometric content of antisymmetry.'
                }
            ]
        }
    ]
});
