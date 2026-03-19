window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'Smooth Manifolds & Charts',
    subtitle: 'The abstract framework: spaces that locally look like R\u207F',
    sections: [
        // ================================================================
        // SECTION 1: Why Abstract Manifolds?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Abstract Manifolds?',
            content: `
<h2>Why Abstract Manifolds?</h2>

<div class="env-block intuition">
    <div class="env-title">The Motivation</div>
    <div class="env-body">
        <p>In the previous chapters, we studied curves and surfaces sitting inside \\(\\mathbb{R}^3\\). We measured curvature, geodesics, and area using the ambient space. But Gauss's Theorema Egregium revealed something remarkable: Gaussian curvature is <em>intrinsic</em>, determined entirely by measurements made within the surface itself.</p>
        <p>This raises a profound question: can we do geometry on a space <strong>without</strong> any ambient \\(\\mathbb{R}^n\\) at all? Can we define "smoothness," "calculus," and "curvature" for spaces that exist in their own right?</p>
    </div>
</div>

<p>Consider several spaces that arise naturally in mathematics and physics:</p>
<ul>
    <li>The <strong>configuration space</strong> of a rigid body in 3D has 6 degrees of freedom (3 for position, 3 for orientation). It is a 6-dimensional space that is not naturally embedded in any Euclidean space.</li>
    <li>The <strong>phase space</strong> of a mechanical system with \\(n\\) particles has \\(6n\\) dimensions (position and momentum for each particle).</li>
    <li>The <strong>projective plane</strong> \\(\\mathbb{R}P^2\\), formed by identifying antipodal points on \\(S^2\\), cannot be embedded in \\(\\mathbb{R}^3\\) without self-intersections.</li>
    <li>In general relativity, <strong>spacetime</strong> is a 4-dimensional manifold. There is no higher-dimensional space in which it "sits."</li>
</ul>

<p>The theory of <em>smooth manifolds</em> provides the framework: a manifold is a space that <strong>locally looks like \\(\\mathbb{R}^n\\)</strong>, equipped with enough structure to do calculus. The key idea is to use <em>coordinate charts</em> to transfer questions about the manifold to questions about open sets in \\(\\mathbb{R}^n\\), where we already know how to do calculus.</p>

<h3>From Surfaces to Manifolds</h3>

<p>Recall that a regular surface \\(S \\subset \\mathbb{R}^3\\) is covered by coordinate patches \\(\\varphi: U \\to S\\), where \\(U \\subset \\mathbb{R}^2\\) is open. On the overlap of two patches, the <em>transition map</em> \\(\\varphi_2^{-1} \\circ \\varphi_1\\) is a smooth map between open sets of \\(\\mathbb{R}^2\\). This is the pattern we will abstract:</p>

<div class="env-block remark">
    <div class="env-title">The Key Abstraction</div>
    <div class="env-body">
        <p>A manifold is a topological space with a collection of "charts" (homeomorphisms to open sets of \\(\\mathbb{R}^n\\)) such that the transition maps between overlapping charts are smooth. We do not need any ambient space; the transition maps carry all the information about smoothness.</p>
    </div>
</div>

<p>This chapter develops this framework carefully. We will define topological manifolds, smooth structures, and smooth maps. We will see many examples, from spheres and tori to projective spaces and Lie groups. We will also develop key technical tools: submanifolds via the regular value theorem, and partitions of unity that let us paste local constructions into global ones.</p>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Topological & Smooth Manifolds
        // ================================================================
        {
            id: 'sec-definition',
            title: 'Topological & Smooth Manifolds',
            content: `
<h2>Topological and Smooth Manifolds</h2>

<h3>Topological Manifolds</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Topological Manifold)</div>
    <div class="env-body">
        <p>A <strong>topological manifold of dimension \\(n\\)</strong> is a topological space \\(M\\) satisfying:</p>
        <ol>
            <li><strong>Hausdorff:</strong> For any two distinct points \\(p, q \\in M\\), there exist disjoint open neighborhoods of \\(p\\) and \\(q\\).</li>
            <li><strong>Second countable:</strong> \\(M\\) has a countable basis for its topology.</li>
            <li><strong>Locally Euclidean:</strong> Every point \\(p \\in M\\) has a neighborhood \\(U\\) homeomorphic to an open subset of \\(\\mathbb{R}^n\\).</li>
        </ol>
    </div>
</div>

<p>The Hausdorff condition excludes pathological spaces like the "line with two origins." Second countability ensures the space is not "too large" (e.g., it rules out uncountable discrete spaces) and is essential for partitions of unity. The locally Euclidean condition is the heart of the definition: near each point, the manifold "looks like" \\(\\mathbb{R}^n\\).</p>

<h3>Charts and Atlases</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Chart)</div>
    <div class="env-body">
        <p>A <strong>coordinate chart</strong> (or simply <strong>chart</strong>) on a topological manifold \\(M\\) is a pair \\((U, \\varphi)\\) where:</p>
        <ul>
            <li>\\(U \\subseteq M\\) is open, and</li>
            <li>\\(\\varphi: U \\to \\hat{U} \\subseteq \\mathbb{R}^n\\) is a homeomorphism onto an open set \\(\\hat{U}\\) of \\(\\mathbb{R}^n\\).</li>
        </ul>
        <p>We call \\(U\\) a <strong>coordinate neighborhood</strong> and write \\(\\varphi(p) = (x^1(p), \\ldots, x^n(p))\\) for the <strong>local coordinates</strong> of \\(p\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Transition Map)</div>
    <div class="env-body">
        <p>Given two charts \\((U_\\alpha, \\varphi_\\alpha)\\) and \\((U_\\beta, \\varphi_\\beta)\\) with \\(U_\\alpha \\cap U_\\beta \\neq \\emptyset\\), the <strong>transition map</strong> (or <strong>change of coordinates</strong>) is</p>
        \\[\\tau_{\\alpha\\beta} = \\varphi_\\beta \\circ \\varphi_\\alpha^{-1}: \\varphi_\\alpha(U_\\alpha \\cap U_\\beta) \\to \\varphi_\\beta(U_\\alpha \\cap U_\\beta).\\]
        <p>This is a map between open subsets of \\(\\mathbb{R}^n\\), so it makes sense to ask whether it is smooth.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-chart-transition"></div>

<div class="env-block definition">
    <div class="env-title">Definition (Smooth Compatibility and Atlas)</div>
    <div class="env-body">
        <p>Two charts \\((U_\\alpha, \\varphi_\\alpha)\\) and \\((U_\\beta, \\varphi_\\beta)\\) are <strong>smoothly compatible</strong> if either \\(U_\\alpha \\cap U_\\beta = \\emptyset\\) or the transition map \\(\\tau_{\\alpha\\beta}\\) (and its inverse \\(\\tau_{\\beta\\alpha}\\)) are smooth (\\(C^\\infty\\)) maps.</p>
        <p>A <strong>smooth atlas</strong> on \\(M\\) is a collection \\(\\mathcal{A} = \\{(U_\\alpha, \\varphi_\\alpha)\\}\\) of pairwise smoothly compatible charts whose domains cover \\(M\\): \\(\\bigcup_\\alpha U_\\alpha = M\\).</p>
    </div>
</div>

<h3>Smooth Manifolds</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Smooth Structure and Smooth Manifold)</div>
    <div class="env-body">
        <p>A smooth atlas \\(\\mathcal{A}\\) on \\(M\\) is <strong>maximal</strong> if it contains every chart that is smoothly compatible with all charts in \\(\\mathcal{A}\\). A <strong>smooth structure</strong> on \\(M\\) is a maximal smooth atlas.</p>
        <p>A <strong>smooth manifold</strong> is a topological manifold \\(M\\) together with a smooth structure. In practice, we specify a smooth manifold by giving any smooth atlas; the maximal atlas it generates is unique.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Proposition 11.1</div>
    <div class="env-body">
        <p>Every smooth atlas \\(\\mathcal{A}\\) on \\(M\\) is contained in a unique maximal smooth atlas \\(\\overline{\\mathcal{A}}\\), consisting of all charts on \\(M\\) that are smoothly compatible with every chart in \\(\\mathcal{A}\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Remark: The Dimension is Well-Defined</div>
    <div class="env-body">
        <p>If \\(M\\) is connected, the dimension \\(n\\) is the same for every chart, by invariance of domain (a deep topological theorem). A connected manifold has a single, well-defined dimension.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-atlas"></div>
`,
            visualizations: [
                {
                    id: 'viz-chart-transition',
                    title: 'Charts and Transition Maps',
                    description: 'Two overlapping charts on a circle. The left panel shows the circle with two coordinate neighborhoods (arcs). The right panel shows the transition map between the two local coordinate systems. Drag the point on the circle to see its coordinates in each chart.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 360,
                            originX: 160, originY: 180, scale: 80
                        });

                        var theta = 0.7;
                        var dragging = false;

                        viz.canvas.addEventListener('mousedown', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            var cx = 160, cy = 180, R = 80;
                            if (Math.sqrt((mx - cx) * (mx - cx) + (my - cy) * (my - cy)) < R + 20) {
                                dragging = true;
                            }
                        });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            theta = Math.atan2(-(my - 180), mx - 160);
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = false; });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = 160, cy = 180, R = 80;

                            // Title
                            viz.screenText('Charts on S\u00B9', cx, 25, viz.colors.white, 14);

                            // Draw circle
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, R, 0, Math.PI * 2);
                            ctx.stroke();

                            // Chart U_alpha: covers S^1 minus south pole (angle range (-pi, pi))
                            // Chart U_beta: covers S^1 minus north pole (angle range (0, 2pi))
                            // Draw arcs for chart domains
                            // U_alpha (blue): the arc excluding south pole
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.arc(cx, cy, R + 6, -Math.PI + 0.15, Math.PI - 0.15);
                            ctx.stroke();

                            // U_beta (teal): the arc excluding north pole
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.arc(cx, cy, R + 12, 0.15, 2 * Math.PI - 0.15);
                            ctx.stroke();

                            // Labels
                            viz.screenText('U\u2081', cx + R + 24, cy - 30, viz.colors.blue, 12);
                            viz.screenText('U\u2082', cx + R + 24, cy + 30, viz.colors.teal, 12);

                            // Poles
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(cx, cy - R, 4, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('N', cx + 10, cy - R - 8, viz.colors.red, 10);
                            ctx.beginPath(); ctx.arc(cx, cy + R, 4, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('S', cx + 10, cy + R + 12, viz.colors.red, 10);

                            // Draw point p on circle
                            var px = cx + R * Math.cos(theta);
                            var py = cy - R * Math.sin(theta);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('p', px + 10, py - 10, viz.colors.orange, 12);

                            // Coordinate values
                            // phi_1: angle in (-pi, pi)
                            var coord1 = theta;
                            if (coord1 > Math.PI) coord1 -= 2 * Math.PI;
                            // phi_2: angle in (0, 2pi)
                            var coord2 = theta;
                            if (coord2 < 0) coord2 += 2 * Math.PI;

                            // Right side: coordinate lines
                            var rxBase = 340;
                            var lineLen = 200;

                            // Line 1: phi_1 coordinate
                            var ly1 = 120;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(rxBase, ly1);
                            ctx.lineTo(rxBase + lineLen, ly1);
                            ctx.stroke();

                            // Endpoints labels
                            viz.screenText('-\u03C0', rxBase - 10, ly1 + 14, viz.colors.text, 10);
                            viz.screenText('\u03C0', rxBase + lineLen + 8, ly1 + 14, viz.colors.text, 10);
                            viz.screenText('\u03C6\u2081(p) = ' + coord1.toFixed(2), rxBase + lineLen / 2, ly1 - 20, viz.colors.blue, 12);

                            // Point on line 1
                            var t1 = (coord1 + Math.PI) / (2 * Math.PI);
                            var p1x = rxBase + t1 * lineLen;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(p1x, ly1, 5, 0, Math.PI * 2); ctx.fill();

                            // Line 2: phi_2 coordinate
                            var ly2 = 230;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(rxBase, ly2);
                            ctx.lineTo(rxBase + lineLen, ly2);
                            ctx.stroke();

                            viz.screenText('0', rxBase - 6, ly2 + 14, viz.colors.text, 10);
                            viz.screenText('2\u03C0', rxBase + lineLen + 8, ly2 + 14, viz.colors.text, 10);
                            viz.screenText('\u03C6\u2082(p) = ' + coord2.toFixed(2), rxBase + lineLen / 2, ly2 - 20, viz.colors.teal, 12);

                            // Point on line 2
                            var t2 = coord2 / (2 * Math.PI);
                            var p2x = rxBase + t2 * lineLen;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(p2x, ly2, 5, 0, Math.PI * 2); ctx.fill();

                            // Transition map arrow
                            ctx.strokeStyle = viz.colors.purple + '88';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(p1x, ly1 + 10);
                            ctx.lineTo(p2x, ly2 - 10);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Transition formula
                            var inOverlap = (Math.abs(theta) < Math.PI - 0.15) && (theta > 0.15 || theta < -0.15 + 2 * Math.PI);
                            viz.screenText('Transition: \u03C6\u2082 = \u03C6\u2081 (mod 2\u03C0)', rxBase + lineLen / 2, 310, viz.colors.purple, 11);

                            viz.screenText('Drag the orange point around the circle', viz.width / 2, viz.height - 12, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-atlas',
                    title: 'An Atlas: Multiple Charts Covering a Manifold',
                    description: 'A manifold covered by several charts. Each colored region is one chart domain. The overlaps (shown brighter) are where transition maps are defined. Use the slider to add or remove charts.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 0, originY: 0, scale: 1
                        });

                        var nCharts = 4;
                        VizEngine.createSlider(controls, 'Charts', 2, 6, nCharts, 1, function(v) {
                            nCharts = Math.round(v);
                            draw();
                        });

                        var chartColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.pink];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = 200, cy = 185, R = 120;

                            viz.screenText('Atlas on a torus-like shape', cx, 25, viz.colors.white, 14);

                            // Draw a stylized closed curve (ellipse as manifold stand-in)
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.ellipse(cx, cy, R, R * 0.65, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw chart arcs
                            var arcLen = (2 * Math.PI) / nCharts + 0.5;
                            for (var i = 0; i < nCharts; i++) {
                                var startAngle = (2 * Math.PI * i) / nCharts - 0.25;
                                var endAngle = startAngle + arcLen;
                                var col = chartColors[i % chartColors.length];

                                // Fill arc region
                                ctx.fillStyle = col + '22';
                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                for (var t = startAngle; t <= endAngle; t += 0.02) {
                                    ctx.lineTo(cx + R * Math.cos(t), cy + R * 0.65 * Math.sin(t));
                                }
                                ctx.closePath();
                                ctx.fill();

                                // Arc on the curve
                                ctx.strokeStyle = col;
                                ctx.lineWidth = 5;
                                ctx.beginPath();
                                ctx.ellipse(cx, cy, R + 3 + i * 4, R * 0.65 + 3 + i * 4, 0, startAngle, endAngle);
                                ctx.stroke();

                                // Label
                                var midAngle = (startAngle + endAngle) / 2;
                                var lx = cx + (R + 20 + i * 4) * Math.cos(midAngle);
                                var ly = cy + (R * 0.65 + 20 + i * 4) * Math.sin(midAngle);
                                viz.screenText('U' + (i + 1), lx, ly, col, 12);
                            }

                            // Right panel: chart images in R^n
                            var rpx = 420;
                            viz.screenText('Chart images in \u211D\u207F', rpx + 60, 25, viz.colors.white, 12);

                            for (var j = 0; j < nCharts; j++) {
                                var ry = 60 + j * (280 / nCharts);
                                var col2 = chartColors[j % chartColors.length];
                                ctx.strokeStyle = col2;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(rpx, ry, 100, 24);
                                ctx.fillStyle = col2 + '22';
                                ctx.fillRect(rpx, ry, 100, 24);
                                viz.screenText('\u03C6' + (j + 1) + '(U' + (j + 1) + ')', rpx + 50, ry + 12, col2, 11);

                                // Arrow from chart arc to image
                                ctx.strokeStyle = col2 + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                var midAngle2 = (2 * Math.PI * j) / nCharts + arcLen / 2 - 0.25;
                                var ax = cx + R * Math.cos(midAngle2);
                                var ay = cy + R * 0.65 * Math.sin(midAngle2);
                                ctx.beginPath();
                                ctx.moveTo(ax, ay);
                                ctx.lineTo(rpx, ry + 12);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            viz.screenText('Overlaps define transition maps', viz.width / 2, viz.height - 15, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the "line with two origins" (two copies of \\(\\mathbb{R}\\) glued along \\(\\mathbb{R} \\setminus \\{0\\}\\)) is locally Euclidean and second countable, but fails to be Hausdorff.',
                    hint: 'Show that every point has a neighborhood homeomorphic to an open interval in \\(\\mathbb{R}\\). Then show that the two "origins" cannot be separated by disjoint open sets.',
                    solution: 'Every point other than the two origins has a neighborhood homeomorphic to an open interval. Each origin also has such a neighborhood (one in each copy of \\(\\mathbb{R}\\)). For second countability, a countable basis for each copy restricts to give a countable basis for the glued space. But any open set containing one origin must contain an interval \\((-\\varepsilon, \\varepsilon)\\) in that copy, which overlaps with any interval around the other origin (since they are identified away from 0). So the two origins cannot be separated.'
                },
                {
                    question: 'Let \\(M = \\mathbb{R}\\) with the atlas \\(\\{(\\mathbb{R}, \\varphi)\\}\\) where \\(\\varphi(x) = x^3\\). Show this defines a valid smooth structure, but one that is <em>different</em> from the standard smooth structure (where \\(\\psi(x) = x\\)). Then show the two smooth manifolds are diffeomorphic.',
                    hint: 'The transition map \\(\\psi \\circ \\varphi^{-1}(t) = t^{1/3}\\) is not smooth at \\(t = 0\\), so the charts are not compatible. But the map \\(f(x) = x^{1/3}\\) is a diffeomorphism from \\((\\mathbb{R}, \\varphi)\\) to \\((\\mathbb{R}, \\psi)\\).',
                    solution: 'The single chart \\(\\varphi(x) = x^3\\) trivially defines a smooth atlas (there are no transition maps to check). The transition map \\(\\psi \\circ \\varphi^{-1}(t) = t^{1/3}\\) is not differentiable at \\(t = 0\\), so the two atlases are incompatible; they define different smooth structures. The map \\(f: (\\mathbb{R}, \\varphi) \\to (\\mathbb{R}, \\psi)\\) defined by \\(f(x) = x^{1/3}\\) satisfies \\(\\psi \\circ f \\circ \\varphi^{-1}(t) = (t^{1/3})^{1} = t^{1/3}\\); wait, we need \\(\\psi \\circ f \\circ \\varphi^{-1}(t) = f(t^{1/3}) = (t^{1/3})^{1/3} = t^{1/9}\\), which is not smooth. Instead: define \\(f(x) = x\\) as a map from \\((\\mathbb{R}, \\varphi)\\) to \\((\\mathbb{R}, \\psi)\\). Then \\(\\psi \\circ f \\circ \\varphi^{-1}(t) = t^{1/3}\\), not smooth. Define \\(g(x) = x^3\\). Then \\(\\psi \\circ g \\circ \\varphi^{-1}(t) = (t^{1/3})^3 = t\\), which is smooth. And \\(\\varphi \\circ g^{-1} \\circ \\psi^{-1}(s) = (s^{1/3})^3 = s\\), also smooth. So \\(g\\) is a diffeomorphism.'
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
<h2>Examples of Smooth Manifolds</h2>

<p>Smooth manifolds appear throughout mathematics. Here are the essential examples.</p>

<h3>Euclidean Space \\(\\mathbb{R}^n\\)</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(\\mathbb{R}^n\\)</div>
    <div class="env-body">
        <p>\\(\\mathbb{R}^n\\) is a smooth \\(n\\)-manifold with the single chart \\((\\mathbb{R}^n, \\mathrm{id})\\). Any open subset \\(U \\subseteq \\mathbb{R}^n\\) is also a smooth \\(n\\)-manifold (with the inclusion as its chart).</p>
    </div>
</div>

<h3>Spheres \\(S^n\\)</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(S^n\\)</div>
    <div class="env-body">
        <p>The \\(n\\)-sphere \\(S^n = \\{x \\in \\mathbb{R}^{n+1} : |x| = 1\\}\\) is an \\(n\\)-manifold. One natural atlas uses <strong>stereographic projection</strong>:</p>
        <ul>
            <li>\\(U_N = S^n \\setminus \\{N\\}\\), where \\(N = (0, \\ldots, 0, 1)\\) is the north pole,<br>
            \\(\\sigma_N(x^1, \\ldots, x^{n+1}) = \\frac{1}{1 - x^{n+1}}(x^1, \\ldots, x^n)\\).</li>
            <li>\\(U_S = S^n \\setminus \\{S\\}\\), where \\(S = (0, \\ldots, 0, -1)\\) is the south pole,<br>
            \\(\\sigma_S(x^1, \\ldots, x^{n+1}) = \\frac{1}{1 + x^{n+1}}(x^1, \\ldots, x^n)\\).</li>
        </ul>
        <p>The transition map on \\(U_N \\cap U_S = S^n \\setminus \\{N, S\\}\\) is the <strong>inversion</strong>:</p>
        \\[\\sigma_S \\circ \\sigma_N^{-1}(u) = \\frac{u}{|u|^2},\\]
        <p>which is smooth on \\(\\mathbb{R}^n \\setminus \\{0\\}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-stereographic-charts"></div>

<h3>Real Projective Space \\(\\mathbb{R}P^n\\)</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(\\mathbb{R}P^n\\)</div>
    <div class="env-body">
        <p>\\(\\mathbb{R}P^n\\) is the set of lines through the origin in \\(\\mathbb{R}^{n+1}\\). A point is an equivalence class \\([x^0 : x^1 : \\cdots : x^n]\\) where \\((x^0, \\ldots, x^n) \\sim \\lambda(x^0, \\ldots, x^n)\\) for \\(\\lambda \\neq 0\\).</p>
        <p>For each \\(i = 0, 1, \\ldots, n\\), define \\(U_i = \\{[x] : x^i \\neq 0\\}\\) and</p>
        \\[\\varphi_i([x^0 : \\cdots : x^n]) = \\left(\\frac{x^0}{x^i}, \\ldots, \\widehat{\\frac{x^i}{x^i}}, \\ldots, \\frac{x^n}{x^i}\\right) \\in \\mathbb{R}^n.\\]
        <p>The \\(n+1\\) charts \\(\\{(U_i, \\varphi_i)\\}\\) form a smooth atlas. Transition maps are rational functions (smooth on their domains).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-quotient-manifold"></div>

<h3>The Torus \\(T^n\\)</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(T^n = (S^1)^n\\)</div>
    <div class="env-body">
        <p>The \\(n\\)-torus \\(T^n\\) is the product of \\(n\\) circles. Equivalently, \\(T^n = \\mathbb{R}^n / \\mathbb{Z}^n\\). For the 2-torus \\(T^2\\), we can take 4 charts using angle coordinates on each factor, with the standard \\(S^1\\) atlas on each.</p>
    </div>
</div>

<h3>Lie Groups</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(\\mathrm{GL}(n, \\mathbb{R})\\) and other Lie groups</div>
    <div class="env-body">
        <p>The <strong>general linear group</strong> \\(\\mathrm{GL}(n, \\mathbb{R}) = \\{A \\in M_{n \\times n}(\\mathbb{R}) : \\det A \\neq 0\\}\\) is an open subset of \\(\\mathbb{R}^{n^2}\\), hence a smooth manifold of dimension \\(n^2\\).</p>
        <p>Other classical groups: \\(O(n)\\), \\(SO(n)\\), \\(SL(n,\\mathbb{R})\\), \\(U(n)\\), \\(SU(n)\\) are all smooth manifolds (and Lie groups); they arise as regular level sets of smooth maps.</p>
    </div>
</div>

<h3>Grassmannians</h3>

<div class="env-block example">
    <div class="env-title">Example: Grassmannians \\(\\mathrm{Gr}(k, n)\\)</div>
    <div class="env-body">
        <p>The <strong>Grassmannian</strong> \\(\\mathrm{Gr}(k, n)\\) is the set of all \\(k\\)-dimensional linear subspaces of \\(\\mathbb{R}^n\\). It is a smooth manifold of dimension \\(k(n-k)\\). Note \\(\\mathrm{Gr}(1, n+1) = \\mathbb{R}P^n\\), so projective space is a special case.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-manifold-gallery"></div>
`,
            visualizations: [
                {
                    id: 'viz-stereographic-charts',
                    title: 'Stereographic Projection on S\u00B2',
                    description: 'The sphere \\(S^2\\) with two stereographic charts. The north-pole chart projects from the north pole onto the equatorial plane, and similarly for the south pole. Drag the slider to move a point and see both projections.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var phi = 1.0;
                        VizEngine.createSlider(controls, '\u03B8 (colatitude)', 0.1, 3.0, phi, 0.05, function(v) {
                            phi = v;
                            draw();
                        });

                        var azimuth = 0.8;
                        VizEngine.createSlider(controls, '\u03C6 (azimuth)', 0, 6.2, azimuth, 0.1, function(v) {
                            azimuth = v;
                            draw();
                        });

                        function project3D(x, y, z, cx, cy, scale) {
                            // Simple oblique projection
                            var px = cx + scale * (x - 0.35 * z);
                            var py = cy - scale * (y - 0.25 * z);
                            return [px, py];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Sphere center and scale
                            var scx = 160, scy = 200, sR = 100;

                            viz.screenText('Stereographic Projection on S\u00B2', viz.width / 2, 20, viz.colors.white, 14);

                            // Draw sphere wireframe
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.8;

                            // Latitude circles
                            for (var lat = -60; lat <= 60; lat += 30) {
                                var r = Math.cos(lat * Math.PI / 180);
                                var h = Math.sin(lat * Math.PI / 180);
                                ctx.beginPath();
                                for (var a = 0; a <= 360; a += 3) {
                                    var ar = a * Math.PI / 180;
                                    var pp = project3D(r * Math.cos(ar), h, r * Math.sin(ar), scx, scy, sR);
                                    a === 0 ? ctx.moveTo(pp[0], pp[1]) : ctx.lineTo(pp[0], pp[1]);
                                }
                                ctx.stroke();
                            }

                            // Longitude circles
                            for (var lon = 0; lon < 180; lon += 30) {
                                var lr = lon * Math.PI / 180;
                                ctx.beginPath();
                                for (var b = 0; b <= 360; b += 3) {
                                    var br = b * Math.PI / 180;
                                    var pp = project3D(
                                        Math.sin(br) * Math.cos(lr),
                                        Math.cos(br),
                                        Math.sin(br) * Math.sin(lr),
                                        scx, scy, sR
                                    );
                                    b === 0 ? ctx.moveTo(pp[0], pp[1]) : ctx.lineTo(pp[0], pp[1]);
                                }
                                ctx.stroke();
                            }

                            // North and south poles
                            var nPole = project3D(0, 1, 0, scx, scy, sR);
                            var sPole = project3D(0, -1, 0, scx, scy, sR);
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(nPole[0], nPole[1], 4, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(sPole[0], sPole[1], 4, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('N', nPole[0] + 8, nPole[1] - 4, viz.colors.red, 10);
                            viz.screenText('S', sPole[0] + 8, sPole[1] + 4, viz.colors.red, 10);

                            // Point on sphere
                            var sx = Math.sin(phi) * Math.cos(azimuth);
                            var sy = Math.cos(phi);
                            var sz = Math.sin(phi) * Math.sin(azimuth);
                            var pProj = project3D(sx, sy, sz, scx, scy, sR);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(pProj[0], pProj[1], 6, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('p', pProj[0] + 10, pProj[1] - 8, viz.colors.orange, 12);

                            // Stereographic projections
                            // sigma_N: project from N=(0,1,0) to y=0 plane
                            var sigmaN_x = sx / (1 - sy);
                            var sigmaN_z = sz / (1 - sy);

                            // sigma_S: project from S=(0,-1,0) to y=0 plane
                            var sigmaS_x = sx / (1 + sy);
                            var sigmaS_z = sz / (1 + sy);

                            // Right panels: the two chart images
                            var rpx = 370, rpWidth = 180;

                            // North chart image
                            var ny0 = 110;
                            viz.screenText('\u03C3_N(p)', rpx + rpWidth / 2, ny0 - 30, viz.colors.blue, 12);
                            ctx.strokeStyle = viz.colors.blue + '66';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(rpx, ny0 - 20, rpWidth, 90);

                            // Draw axes in chart
                            var ncx = rpx + rpWidth / 2, ncy = ny0 + 25;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.beginPath(); ctx.moveTo(rpx + 5, ncy); ctx.lineTo(rpx + rpWidth - 5, ncy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ncx, ny0 - 15); ctx.lineTo(ncx, ny0 + 65); ctx.stroke();

                            // Point in north chart
                            var nScale = 20;
                            if (Math.abs(1 - sy) > 0.01) {
                                var npx = ncx + sigmaN_x * nScale;
                                var npy = ncy - sigmaN_z * nScale;
                                if (npx > rpx + 5 && npx < rpx + rpWidth - 5 && npy > ny0 - 15 && npy < ny0 + 65) {
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath(); ctx.arc(npx, npy, 4, 0, Math.PI * 2); ctx.fill();
                                }
                                viz.screenText('(' + sigmaN_x.toFixed(2) + ', ' + sigmaN_z.toFixed(2) + ')', rpx + rpWidth / 2, ny0 + 80, viz.colors.blue, 10);
                            } else {
                                viz.screenText('undefined (at N)', rpx + rpWidth / 2, ny0 + 80, viz.colors.red, 10);
                            }

                            // South chart image
                            var sy0 = 260;
                            viz.screenText('\u03C3_S(p)', rpx + rpWidth / 2, sy0 - 30, viz.colors.teal, 12);
                            ctx.strokeStyle = viz.colors.teal + '66';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(rpx, sy0 - 20, rpWidth, 90);

                            var scx2 = rpx + rpWidth / 2, scy2 = sy0 + 25;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.beginPath(); ctx.moveTo(rpx + 5, scy2); ctx.lineTo(rpx + rpWidth - 5, scy2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(scx2, sy0 - 15); ctx.lineTo(scx2, sy0 + 65); ctx.stroke();

                            if (Math.abs(1 + sy) > 0.01) {
                                var spx = scx2 + sigmaS_x * nScale;
                                var spy = scy2 - sigmaS_z * nScale;
                                if (spx > rpx + 5 && spx < rpx + rpWidth - 5 && spy > sy0 - 15 && spy < sy0 + 65) {
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath(); ctx.arc(spx, spy, 4, 0, Math.PI * 2); ctx.fill();
                                }
                                viz.screenText('(' + sigmaS_x.toFixed(2) + ', ' + sigmaS_z.toFixed(2) + ')', rpx + rpWidth / 2, sy0 + 80, viz.colors.teal, 10);
                            } else {
                                viz.screenText('undefined (at S)', rpx + rpWidth / 2, sy0 + 80, viz.colors.red, 10);
                            }

                            // Transition formula
                            viz.screenText('Transition: \u03C3_S \u2218 \u03C3_N\u207B\u00B9(u) = u/|u|\u00B2', viz.width / 2, viz.height - 12, viz.colors.purple, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-quotient-manifold',
                    title: '\u211DPn as a Quotient: Antipodal Identification on S\u00B2',
                    description: 'The real projective plane \\(\\mathbb{R}P^2\\) is obtained from \\(S^2\\) by identifying each point with its antipode. The animation shows pairs of antipodal points being "glued" together.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 0, originY: 0, scale: 1
                        });

                        var animT = 0;
                        var playing = true;

                        VizEngine.createButton(controls, 'Play/Pause', function() {
                            playing = !playing;
                        });

                        function project3D(x, y, z, cx, cy, scale) {
                            var px = cx + scale * (x - 0.3 * z);
                            var py = cy - scale * (y - 0.2 * z);
                            return [px, py];
                        }

                        function drawFrame(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = 180, cy = 190, R = 110;

                            if (playing) animT += 0.008;
                            var phase = (Math.sin(animT) + 1) / 2; // 0 to 1

                            viz.screenText('\u211DPn = Sn / (x ~ -x)', viz.width / 2, 20, viz.colors.white, 14);

                            // Draw sphere wireframe
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.6;
                            for (var lon = 0; lon < 180; lon += 20) {
                                var lr = lon * Math.PI / 180;
                                ctx.beginPath();
                                for (var b = 0; b <= 360; b += 4) {
                                    var br = b * Math.PI / 180;
                                    var pp = project3D(
                                        Math.sin(br) * Math.cos(lr),
                                        Math.cos(br),
                                        Math.sin(br) * Math.sin(lr),
                                        cx, cy, R
                                    );
                                    b === 0 ? ctx.moveTo(pp[0], pp[1]) : ctx.lineTo(pp[0], pp[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw several antipodal pairs
                            var pairs = [
                                [0.5, 0.7, 0.5],
                                [-0.3, 0.8, 0.5],
                                [0.9, 0.2, 0.4],
                                [0.1, 0.5, -0.85],
                                [-0.7, -0.3, 0.65],
                                [0.4, -0.6, 0.7]
                            ];

                            var pairColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.pink];

                            for (var i = 0; i < pairs.length; i++) {
                                var p = pairs[i];
                                var len = Math.sqrt(p[0] * p[0] + p[1] * p[1] + p[2] * p[2]);
                                var nx = p[0] / len, ny = p[1] / len, nz = p[2] / len;

                                // Interpolate toward midpoint (identification)
                                var mx = nx * (1 - phase * 0.5);
                                var my = ny * (1 - phase * 0.5);
                                var mz = nz * (1 - phase * 0.5);

                                var amx = -nx * (1 - phase * 0.5);
                                var amy = -ny * (1 - phase * 0.5);
                                var amz = -nz * (1 - phase * 0.5);

                                // Blend toward the "upper hemisphere representative"
                                var drawX = nx + phase * 0 ;
                                var drawY = ny;
                                var drawZ = nz;
                                var aDrawX = -nx + phase * (2 * nx);
                                var aDrawY = -ny + phase * (2 * ny);
                                var aDrawZ = -nz + phase * (2 * nz);

                                var pp1 = project3D(nx, ny, nz, cx, cy, R);
                                var pp2 = project3D(-nx, -ny, -nz, cx, cy, R);
                                var ppA = project3D(aDrawX, aDrawY, aDrawZ, cx, cy, R);

                                var col = pairColors[i % pairColors.length];

                                // Draw point
                                ctx.fillStyle = col;
                                ctx.beginPath(); ctx.arc(pp1[0], pp1[1], 5, 0, Math.PI * 2); ctx.fill();

                                // Draw antipodal point (moving toward identified position)
                                var ax = pp2[0] + phase * (pp1[0] - pp2[0]);
                                var ay = pp2[1] + phase * (pp1[1] - pp2[1]);
                                ctx.fillStyle = col + '88';
                                ctx.beginPath(); ctx.arc(ax, ay, 5, 0, Math.PI * 2); ctx.fill();

                                // Connecting line
                                if (phase < 0.9) {
                                    ctx.strokeStyle = col + '44';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath();
                                    ctx.moveTo(pp1[0], pp1[1]);
                                    ctx.lineTo(ax, ay);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }
                            }

                            // Right side: explanation
                            var rx = 370;
                            viz.screenText('Identification:', rx + 70, 70, viz.colors.white, 13);
                            viz.screenText('x ~ -x', rx + 70, 92, viz.colors.teal, 14);

                            viz.screenText('Each line through', rx + 70, 140, viz.colors.text, 11);
                            viz.screenText('the origin is one', rx + 70, 156, viz.colors.text, 11);
                            viz.screenText('point of \u211DPn', rx + 70, 172, viz.colors.text, 11);

                            viz.screenText('dim(\u211DPn) = n', rx + 70, 220, viz.colors.orange, 12);
                            viz.screenText('\u211DPn = Sn/(x~-x)', rx + 70, 244, viz.colors.purple, 11);

                            var phaseLabel = phase < 0.3 ? 'S\u00B2 with antipodal pairs' : (phase > 0.7 ? 'Pairs identified \u2192 \u211DPn' : 'Identifying...');
                            viz.screenText(phaseLabel, viz.width / 2, viz.height - 15, viz.colors.white, 11);
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                },
                {
                    id: 'viz-manifold-gallery',
                    title: 'Gallery of Smooth Manifolds',
                    description: 'A visual gallery of common smooth manifolds: \\(S^1\\), \\(S^2\\), \\(T^2\\), \\(\\mathbb{R}P^2\\), and the Klein bottle. Click through to see each one.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 0, originY: 0, scale: 1
                        });

                        var manifoldIdx = 0;
                        var manifolds = ['S\u00B9', 'S\u00B2', 'T\u00B2', '\u211DPn', 'Klein'];
                        var animT = 0;

                        VizEngine.createButton(controls, '\u2190 Prev', function() {
                            manifoldIdx = (manifoldIdx - 1 + manifolds.length) % manifolds.length;
                        });
                        VizEngine.createButton(controls, 'Next \u2192', function() {
                            manifoldIdx = (manifoldIdx + 1) % manifolds.length;
                        });

                        function project3D(x, y, z, cx, cy, scale) {
                            return [cx + scale * (x - 0.3 * z), cy - scale * (y - 0.2 * z)];
                        }

                        function drawFrame(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            animT += 0.01;
                            var rot = animT;

                            var cx = 230, cy = 200, R = 110;
                            var name = manifolds[manifoldIdx];

                            // Info panel on right
                            var rx = 400;

                            if (name === 'S\u00B9') {
                                viz.screenText('S\u00B9: The Circle', viz.width / 2, 25, viz.colors.white, 15);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(cx, cy, R, 0, Math.PI * 2);
                                ctx.stroke();

                                // Moving point
                                var px = cx + R * Math.cos(rot);
                                var py = cy - R * Math.sin(rot);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('dim = 1', rx + 50, 100, viz.colors.teal, 13);
                                viz.screenText('Compact', rx + 50, 125, viz.colors.text, 11);
                                viz.screenText('Connected', rx + 50, 145, viz.colors.text, 11);
                                viz.screenText('\u03C0\u2081 = \u2124', rx + 50, 170, viz.colors.purple, 11);
                                viz.screenText('2 charts suffice', rx + 50, 195, viz.colors.text, 11);
                            }
                            else if (name === 'S\u00B2') {
                                viz.screenText('S\u00B2: The 2-Sphere', viz.width / 2, 25, viz.colors.white, 15);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 0.8;
                                for (var lat = -60; lat <= 60; lat += 20) {
                                    var r = Math.cos(lat * Math.PI / 180);
                                    var h = Math.sin(lat * Math.PI / 180);
                                    ctx.beginPath();
                                    for (var a = 0; a <= 360; a += 3) {
                                        var ar = a * Math.PI / 180;
                                        var ca = Math.cos(ar + rot * 0.3);
                                        var sa = Math.sin(ar + rot * 0.3);
                                        var pp = project3D(r * ca, h, r * sa, cx, cy, R);
                                        a === 0 ? ctx.moveTo(pp[0], pp[1]) : ctx.lineTo(pp[0], pp[1]);
                                    }
                                    ctx.stroke();
                                }
                                for (var lon = 0; lon < 180; lon += 20) {
                                    var lr = lon * Math.PI / 180 + rot * 0.3;
                                    ctx.beginPath();
                                    for (var b = 0; b <= 360; b += 3) {
                                        var br = b * Math.PI / 180;
                                        var pp = project3D(Math.sin(br) * Math.cos(lr), Math.cos(br), Math.sin(br) * Math.sin(lr), cx, cy, R);
                                        b === 0 ? ctx.moveTo(pp[0], pp[1]) : ctx.lineTo(pp[0], pp[1]);
                                    }
                                    ctx.stroke();
                                }
                                viz.screenText('dim = 2', rx + 50, 100, viz.colors.teal, 13);
                                viz.screenText('Simply connected', rx + 50, 125, viz.colors.text, 11);
                                viz.screenText('\u03C7 = 2', rx + 50, 150, viz.colors.purple, 11);
                                viz.screenText('2 charts (stereo.)', rx + 50, 175, viz.colors.text, 11);
                            }
                            else if (name === 'T\u00B2') {
                                viz.screenText('T\u00B2: The 2-Torus', viz.width / 2, 25, viz.colors.white, 15);
                                var RR = 80, rr = 35;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 0.8;
                                for (var u = 0; u < 360; u += 20) {
                                    var ur = u * Math.PI / 180;
                                    ctx.beginPath();
                                    for (var v = 0; v <= 360; v += 3) {
                                        var vr = v * Math.PI / 180;
                                        var tx = (RR + rr * Math.cos(vr)) * Math.cos(ur + rot * 0.2);
                                        var ty = rr * Math.sin(vr);
                                        var tz = (RR + rr * Math.cos(vr)) * Math.sin(ur + rot * 0.2);
                                        var pp = project3D(tx / 100, ty / 100, tz / 100, cx, cy, 100);
                                        v === 0 ? ctx.moveTo(pp[0], pp[1]) : ctx.lineTo(pp[0], pp[1]);
                                    }
                                    ctx.stroke();
                                }
                                for (var v2 = 0; v2 < 360; v2 += 30) {
                                    var vr2 = v2 * Math.PI / 180;
                                    ctx.beginPath();
                                    for (var u2 = 0; u2 <= 360; u2 += 3) {
                                        var ur2 = u2 * Math.PI / 180 + rot * 0.2;
                                        var tx2 = (RR + rr * Math.cos(vr2)) * Math.cos(ur2);
                                        var ty2 = rr * Math.sin(vr2);
                                        var tz2 = (RR + rr * Math.cos(vr2)) * Math.sin(ur2);
                                        var pp2 = project3D(tx2 / 100, ty2 / 100, tz2 / 100, cx, cy, 100);
                                        u2 === 0 ? ctx.moveTo(pp2[0], pp2[1]) : ctx.lineTo(pp2[0], pp2[1]);
                                    }
                                    ctx.stroke();
                                }
                                viz.screenText('dim = 2', rx + 50, 100, viz.colors.teal, 13);
                                viz.screenText('T\u00B2 = S\u00B9 \u00D7 S\u00B9', rx + 50, 125, viz.colors.text, 11);
                                viz.screenText('\u03C7 = 0', rx + 50, 150, viz.colors.purple, 11);
                                viz.screenText('\u03C0\u2081 = \u2124\u00B2', rx + 50, 175, viz.colors.text, 11);
                                viz.screenText('Flat metric exists', rx + 50, 200, viz.colors.text, 11);
                            }
                            else if (name === '\u211DPn') {
                                viz.screenText('\u211DPn: Real Projective Plane', viz.width / 2, 25, viz.colors.white, 15);
                                // Draw as hemisphere with boundary identified
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(cx, cy, R, 0, Math.PI * 2);
                                ctx.stroke();

                                // Draw identification arrows on boundary
                                for (var k = 0; k < 8; k++) {
                                    var angle1 = k * Math.PI / 4;
                                    var angle2 = angle1 + Math.PI;
                                    var x1 = cx + R * Math.cos(angle1);
                                    var y1 = cy - R * Math.sin(angle1);
                                    var x2 = cx + R * Math.cos(angle2);
                                    var y2 = cy - R * Math.sin(angle2);

                                    ctx.fillStyle = viz.colors.orange;
                                    // Small arrows at boundary
                                    var arrowSize = 6;
                                    var tangentAngle = angle1 + Math.PI / 2;
                                    ctx.beginPath();
                                    ctx.moveTo(x1, y1);
                                    ctx.lineTo(x1 + arrowSize * Math.cos(tangentAngle + 0.5), y1 - arrowSize * Math.sin(tangentAngle + 0.5));
                                    ctx.lineTo(x1 + arrowSize * Math.cos(tangentAngle - 0.5), y1 - arrowSize * Math.sin(tangentAngle - 0.5));
                                    ctx.fill();
                                }

                                // Crosscap hint
                                ctx.strokeStyle = viz.colors.purple + '44';
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(cx - R, cy);
                                ctx.quadraticCurveTo(cx, cy + 40, cx + R, cy);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                viz.screenText('dim = 2', rx + 50, 100, viz.colors.teal, 13);
                                viz.screenText('Non-orientable', rx + 50, 125, viz.colors.red, 11);
                                viz.screenText('\u03C7 = 1', rx + 50, 150, viz.colors.purple, 11);
                                viz.screenText('\u03C0\u2081 = \u2124/2\u2124', rx + 50, 175, viz.colors.text, 11);
                                viz.screenText('Cannot embed', rx + 50, 200, viz.colors.text, 11);
                                viz.screenText('in \u211D\u00B3', rx + 50, 218, viz.colors.text, 11);
                            }
                            else if (name === 'Klein') {
                                viz.screenText('Klein Bottle', viz.width / 2, 25, viz.colors.white, 15);
                                // Parametric "figure-8" Klein bottle
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 0.8;
                                var KR = 70, kr = 25;

                                for (var ku = 0; ku < 360; ku += 15) {
                                    var kur = ku * Math.PI / 180;
                                    ctx.beginPath();
                                    for (var kv = 0; kv <= 360; kv += 3) {
                                        var kvr = kv * Math.PI / 180;
                                        // Figure-8 Klein bottle parametrization
                                        var kx = (KR + kr * Math.cos(kvr) * Math.cos(kur / 2) + kr * Math.sin(kvr) * Math.sin(kur / 2)) * Math.cos(kur + rot * 0.15);
                                        var ky = kr * Math.cos(kvr) * Math.sin(kur / 2) - kr * Math.sin(kvr) * Math.cos(kur / 2);
                                        var kz = (KR + kr * Math.cos(kvr) * Math.cos(kur / 2) + kr * Math.sin(kvr) * Math.sin(kur / 2)) * Math.sin(kur + rot * 0.15);
                                        var pp = project3D(kx / 100, ky / 100, kz / 100, cx, cy, 100);
                                        kv === 0 ? ctx.moveTo(pp[0], pp[1]) : ctx.lineTo(pp[0], pp[1]);
                                    }
                                    ctx.stroke();
                                }

                                viz.screenText('dim = 2', rx + 50, 100, viz.colors.teal, 13);
                                viz.screenText('Non-orientable', rx + 50, 125, viz.colors.red, 11);
                                viz.screenText('\u03C7 = 0', rx + 50, 150, viz.colors.purple, 11);
                                viz.screenText('No embedding', rx + 50, 175, viz.colors.text, 11);
                                viz.screenText('in \u211D\u00B3', rx + 50, 193, viz.colors.text, 11);
                                viz.screenText('Immersion shown', rx + 50, 218, viz.colors.text, 11);
                            }

                            // Navigation indicator
                            viz.screenText((manifoldIdx + 1) + ' / ' + manifolds.length, viz.width / 2, viz.height - 12, viz.colors.text, 10);
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(S^1\\) cannot be covered by a single chart. (A single chart would make \\(S^1\\) homeomorphic to an open subset of \\(\\mathbb{R}\\).)',
                    hint: 'Use the fact that \\(S^1\\) is compact, while every open subset of \\(\\mathbb{R}\\) that is connected is an open interval, which is not compact.',
                    solution: 'If \\(S^1 = U\\) with \\(\\varphi: U \\to V \\subseteq \\mathbb{R}\\) a homeomorphism, then \\(V\\) is an open connected subset of \\(\\mathbb{R}\\), hence an open interval. But \\(S^1\\) is compact and an open interval is not, contradicting the homeomorphism. Thus at least two charts are needed.'
                },
                {
                    question: 'Write down explicitly the transition map for the stereographic atlas on \\(S^2\\) and verify it is smooth on its domain.',
                    hint: 'Compute \\(\\sigma_S \\circ \\sigma_N^{-1}(u_1, u_2)\\) using the formula for \\(\\sigma_N^{-1}\\). The result should be inversion: \\(u / |u|^2\\).',
                    solution: 'Given \\(u = (u_1, u_2) \\in \\mathbb{R}^2 \\setminus \\{0\\}\\), the inverse of \\(\\sigma_N\\) is \\(\\sigma_N^{-1}(u) = \\frac{1}{|u|^2 + 1}(2u_1, 2u_2, |u|^2 - 1)\\). Applying \\(\\sigma_S\\): \\(\\sigma_S(x) = (x_1, x_2)/(1 + x_3)\\). With \\(x_3 = (|u|^2 - 1)/(|u|^2 + 1)\\), we get \\(1 + x_3 = 2|u|^2/(|u|^2+1)\\), so \\(\\sigma_S \\circ \\sigma_N^{-1}(u) = (u_1, u_2)/|u|^2\\). This is a smooth map on \\(\\mathbb{R}^2 \\setminus \\{0\\}\\), with smooth inverse (itself). \\(\\checkmark\\)'
                },
                {
                    question: 'Show that \\(\\mathbb{R}P^1\\) is diffeomorphic to \\(S^1\\).',
                    hint: 'Consider the map \\(S^1 \\to \\mathbb{R}P^1\\) sending \\((\\cos\\theta, \\sin\\theta)\\) to the line through \\((\\cos\\theta, \\sin\\theta)\\) and the origin. This is two-to-one; alternatively, \\(e^{i\\theta} \\mapsto e^{2i\\theta}\\) descends to a map on the quotient.',
                    solution: 'The map \\(f: S^1 \\to \\mathbb{R}P^1\\) given by \\(f(e^{i\\theta}) = [\\cos\\theta : \\sin\\theta]\\) is well-defined (since \\([\\cos\\theta : \\sin\\theta] = [\\cos(\\theta+\\pi) : \\sin(\\theta+\\pi)]\\) and the quotient map is \\(e^{i\\theta} \\sim e^{i(\\theta+\\pi)}\\)) and descends to a bijection \\(\\tilde{f}: S^1/\\sim \\to \\mathbb{R}P^1\\). Alternatively, the map \\(g: [0, \\pi) \\to S^1\\) given by \\(\\alpha \\mapsto e^{2i\\alpha}\\) and the identification of endpoints of \\([0, \\pi]\\) on both sides shows the spaces are homeomorphic. Checking in charts shows this is a diffeomorphism.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Smooth Maps
        // ================================================================
        {
            id: 'sec-smooth-maps',
            title: 'Smooth Maps',
            content: `
<h2>Smooth Maps Between Manifolds</h2>

<p>Having defined smooth manifolds, we need to say what it means for a map between them to be smooth. The idea is natural: a map is smooth if it "looks smooth in every chart."</p>

<div class="env-block definition">
    <div class="env-title">Definition (Smooth Map)</div>
    <div class="env-body">
        <p>Let \\(M^m\\) and \\(N^n\\) be smooth manifolds. A continuous map \\(F: M \\to N\\) is <strong>smooth</strong> if for every \\(p \\in M\\), there exist charts \\((U, \\varphi)\\) at \\(p\\) and \\((V, \\psi)\\) at \\(F(p)\\) with \\(F(U) \\subseteq V\\), such that the <strong>coordinate representation</strong></p>
        \\[\\hat{F} = \\psi \\circ F \\circ \\varphi^{-1}: \\varphi(U) \\to \\psi(V)\\]
        <p>is smooth (as a map between open subsets of Euclidean spaces).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Remark: Chart-Independence</div>
    <div class="env-body">
        <p>The definition does not depend on the choice of charts. If \\(\\hat{F}\\) is smooth in one pair of charts, it is smooth in any other pair, because the transition maps (which appear in the change of charts) are smooth by the definition of a smooth manifold.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Diffeomorphism)</div>
    <div class="env-body">
        <p>A smooth map \\(F: M \\to N\\) is a <strong>diffeomorphism</strong> if it is bijective and its inverse \\(F^{-1}: N \\to M\\) is also smooth. In this case, \\(M\\) and \\(N\\) are <strong>diffeomorphic</strong>, written \\(M \\cong N\\).</p>
    </div>
</div>

<p>Diffeomorphism is the natural notion of "same" for smooth manifolds. Two diffeomorphic manifolds are indistinguishable from the standpoint of differential geometry.</p>

<h3>Smooth Functions and Smooth Curves</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Smooth Function / Smooth Curve)</div>
    <div class="env-body">
        <p>A <strong>smooth function</strong> on \\(M\\) is a smooth map \\(f: M \\to \\mathbb{R}\\). We write \\(C^\\infty(M)\\) for the set (actually, a ring) of all smooth functions on \\(M\\).</p>
        <p>A <strong>smooth curve</strong> in \\(M\\) is a smooth map \\(\\gamma: I \\to M\\), where \\(I \\subseteq \\mathbb{R}\\) is an interval.</p>
    </div>
</div>

<h3>Properties of Smooth Maps</h3>

<div class="env-block theorem">
    <div class="env-title">Proposition 11.2</div>
    <div class="env-body">
        <ol>
            <li>The composition of smooth maps is smooth: if \\(F: M \\to N\\) and \\(G: N \\to P\\) are smooth, then \\(G \\circ F: M \\to P\\) is smooth.</li>
            <li>The identity map \\(\\mathrm{id}_M: M \\to M\\) is smooth.</li>
            <li>Every coordinate chart \\(\\varphi: U \\to \\hat{U}\\) is a diffeomorphism.</li>
            <li>If \\(F: M \\to N\\) is smooth and \\(U \\subseteq M\\) is open, then \\(F|_U\\) is smooth.</li>
        </ol>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Inclusion \\(S^n \\hookrightarrow \\mathbb{R}^{n+1}\\)</div>
    <div class="env-body">
        <p>The inclusion map \\(\\iota: S^n \\hookrightarrow \\mathbb{R}^{n+1}\\) is smooth. In the stereographic chart \\((U_N, \\sigma_N)\\) on \\(S^n\\) and the standard chart on \\(\\mathbb{R}^{n+1}\\), the coordinate representation is</p>
        \\[\\hat{\\iota}(u) = \\iota \\circ \\sigma_N^{-1}(u) = \\frac{1}{|u|^2 + 1}(2u_1, \\ldots, 2u_n, |u|^2 - 1),\\]
        <p>which is clearly smooth.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(f: \\mathbb{R} \\to S^1\\) be defined by \\(f(t) = (\\cos t, \\sin t)\\). Show that \\(f\\) is a smooth map (viewing \\(S^1\\) as a smooth manifold with the stereographic atlas).',
                    hint: 'Compute the coordinate representation \\(\\sigma_N \\circ f\\) on the domain where it is defined.',
                    solution: 'In the chart \\((U_N, \\sigma_N)\\) with \\(\\sigma_N(\\cos t, \\sin t) = \\cos t / (1 - \\sin t)\\) (for the standard \\(S^1 \\subset \\mathbb{R}^2\\) parametrization, adjusting to \\(S^1\\) conventions), the coordinate representation is a smooth function of \\(t\\) wherever \\(f(t) \\neq N\\). Similarly in the other chart. Since every point of \\(\\mathbb{R}\\) has a chart in which \\(f\\) is smooth, \\(f\\) is smooth.'
                },
                {
                    question: 'Prove that a composition of diffeomorphisms is a diffeomorphism.',
                    hint: 'Show that \\((G \\circ F)^{-1} = F^{-1} \\circ G^{-1}\\) and apply Proposition 11.2.',
                    solution: 'If \\(F: M \\to N\\) and \\(G: N \\to P\\) are diffeomorphisms, then \\(G \\circ F\\) is smooth (composition of smooth maps). Its inverse is \\(F^{-1} \\circ G^{-1}\\), which is also a composition of smooth maps, hence smooth. So \\(G \\circ F\\) is a diffeomorphism.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Submanifolds
        // ================================================================
        {
            id: 'sec-submanifolds',
            title: 'Submanifolds',
            content: `
<h2>Submanifolds</h2>

<p>Many important manifolds arise as "subsets carved out by equations." The regular value theorem gives a powerful and clean criterion for when the solution set of an equation is a manifold.</p>

<h3>Immersions and Submersions</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Rank, Immersion, Submersion)</div>
    <div class="env-body">
        <p>Let \\(F: M^m \\to N^n\\) be a smooth map. The <strong>rank</strong> of \\(F\\) at \\(p\\) is the rank of the Jacobian matrix of \\(\\hat{F} = \\psi \\circ F \\circ \\varphi^{-1}\\) at \\(\\varphi(p)\\). This is independent of the choice of charts.</p>
        <ul>
            <li>\\(F\\) is an <strong>immersion</strong> if the rank equals \\(m\\) at every point (the differential is injective).</li>
            <li>\\(F\\) is a <strong>submersion</strong> if the rank equals \\(n\\) at every point (the differential is surjective).</li>
        </ul>
    </div>
</div>

<h3>Regular Values</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Regular Value)</div>
    <div class="env-body">
        <p>Let \\(F: M^m \\to N^n\\) be smooth. A point \\(c \\in N\\) is a <strong>regular value</strong> of \\(F\\) if for every \\(p \\in F^{-1}(c)\\), the differential \\(dF_p: T_pM \\to T_cN\\) is surjective. Equivalently, the Jacobian of \\(\\hat{F}\\) has rank \\(n\\) at every preimage point. (If \\(F^{-1}(c) = \\emptyset\\), then \\(c\\) is automatically a regular value.)</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.3 (Regular Value Theorem / Submersion Theorem)</div>
    <div class="env-body">
        <p>Let \\(F: M^m \\to N^n\\) be smooth and let \\(c \\in N\\) be a regular value with \\(F^{-1}(c) \\neq \\emptyset\\). Then \\(F^{-1}(c)\\) is a smooth submanifold of \\(M\\) of dimension \\(m - n\\).</p>
    </div>
</div>

<p>This is the manifold version of the <strong>implicit function theorem</strong>. It tells us that the solution set of \\(F(x) = c\\) is a manifold whenever \\(c\\) is a regular value.</p>

<div class="viz-placeholder" data-viz="viz-regular-value"></div>

<div class="env-block example">
    <div class="env-title">Example: \\(S^n\\) as a Regular Level Set</div>
    <div class="env-body">
        <p>Define \\(F: \\mathbb{R}^{n+1} \\to \\mathbb{R}\\) by \\(F(x) = |x|^2 = (x^1)^2 + \\cdots + (x^{n+1})^2\\). The gradient is \\(\\nabla F(x) = 2x\\), which is nonzero whenever \\(x \\neq 0\\). In particular, for \\(c = 1\\), every point of \\(F^{-1}(1) = S^n\\) satisfies \\(\\nabla F \\neq 0\\). So \\(1\\) is a regular value, and \\(S^n\\) is a smooth \\(n\\)-manifold.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(O(n)\\) as a Submanifold</div>
    <div class="env-body">
        <p>The orthogonal group \\(O(n) = \\{A \\in M_{n \\times n} : A^T A = I\\}\\) is a level set of the map \\(F(A) = A^T A\\) from \\(M_{n \\times n}\\) to the space of symmetric matrices \\(\\mathrm{Sym}(n)\\). One can show that \\(I\\) is a regular value, so \\(O(n)\\) is a smooth manifold of dimension \\(n^2 - \\frac{n(n+1)}{2} = \\frac{n(n-1)}{2}\\).</p>
    </div>
</div>

<h3>Embedded and Immersed Submanifolds</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Embedded Submanifold)</div>
    <div class="env-body">
        <p>A subset \\(S \\subseteq M\\) is an <strong>embedded submanifold</strong> of dimension \\(k\\) if for every \\(p \\in S\\), there exists a chart \\((U, \\varphi)\\) of \\(M\\) at \\(p\\) such that</p>
        \\[\\varphi(U \\cap S) = \\varphi(U) \\cap (\\mathbb{R}^k \\times \\{0\\}).\\]
        <p>Such a chart is called a <strong>slice chart</strong> or <strong>adapted chart</strong> for \\(S\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-regular-value',
                    title: 'Regular Value Theorem: Level Sets as Manifolds',
                    description: 'A function \\(f: \\mathbb{R}^2 \\to \\mathbb{R}\\). The level set \\(f^{-1}(c)\\) is a smooth 1-manifold (curve) whenever \\(c\\) is a regular value. Drag the slider to change the level \\(c\\) and watch the level curve evolve. At critical values, the level set may develop singularities.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 60
                        });

                        var cVal = 0.5;
                        VizEngine.createSlider(controls, 'c', -2.0, 3.0, cVal, 0.05, function(v) {
                            cVal = v;
                            draw();
                        });

                        // f(x,y) = x^2 - y^2 (saddle: critical point at origin with critical value 0)
                        // Or use: f(x,y) = x^2 + y^2 (no critical values except min=0)
                        // Let's use f(x,y) = x^3 - 3x + y^2 for interesting topology changes
                        function f(x, y) {
                            return x * x * x - 3 * x + y * y;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('f(x,y) = x\u00B3 - 3x + y\u00B2', viz.width / 2, 20, viz.colors.white, 14);

                            // Draw heatmap of f
                            var w = viz.width, h = viz.height;
                            for (var py = 0; py < h; py += 3) {
                                for (var px = 0; px < w; px += 3) {
                                    var coords = viz.toMath(px, py);
                                    var val = f(coords[0], coords[1]);
                                    var diff = val - cVal;
                                    var intensity = Math.exp(-diff * diff * 2);
                                    ctx.fillStyle = 'rgba(88, 166, 255, ' + (intensity * 0.3) + ')';
                                    ctx.fillRect(px, py, 3, 3);
                                }
                            }

                            // Draw level set by marching
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            var step = 0.02;
                            var xMin = -4, xMax = 4, yMin = -3, yMax = 3;
                            // Simple contour: scan rows
                            for (var gy = yMin; gy < yMax; gy += step) {
                                for (var gx = xMin; gx < xMax; gx += step) {
                                    var v00 = f(gx, gy) - cVal;
                                    var v10 = f(gx + step, gy) - cVal;
                                    var v01 = f(gx, gy + step) - cVal;
                                    var v11 = f(gx + step, gy + step) - cVal;

                                    // Check sign changes on edges
                                    var edges = [];
                                    if (v00 * v10 < 0) edges.push([gx + step * (-v00) / (v10 - v00), gy]);
                                    if (v10 * v11 < 0) edges.push([gx + step, gy + step * (-v10) / (v11 - v10)]);
                                    if (v01 * v11 < 0) edges.push([gx + step * (-v01) / (v11 - v01), gy + step]);
                                    if (v00 * v01 < 0) edges.push([gx, gy + step * (-v00) / (v01 - v00)]);

                                    if (edges.length >= 2) {
                                        var s1 = viz.toScreen(edges[0][0], edges[0][1]);
                                        var s2 = viz.toScreen(edges[1][0], edges[1][1]);
                                        ctx.beginPath();
                                        ctx.moveTo(s1[0], s1[1]);
                                        ctx.lineTo(s2[0], s2[1]);
                                        ctx.stroke();
                                        if (edges.length === 4) {
                                            var s3 = viz.toScreen(edges[2][0], edges[2][1]);
                                            var s4 = viz.toScreen(edges[3][0], edges[3][1]);
                                            ctx.beginPath();
                                            ctx.moveTo(s3[0], s3[1]);
                                            ctx.lineTo(s4[0], s4[1]);
                                            ctx.stroke();
                                        }
                                    }
                                }
                            }

                            // Mark critical points: df = (3x^2 - 3, 2y) = 0 => x=+-1, y=0
                            // f(1,0) = 1-3 = -2, f(-1,0) = -1+3 = 2
                            var cp1 = viz.toScreen(1, 0);
                            var cp2 = viz.toScreen(-1, 0);
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(cp1[0], cp1[1], 4, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(cp2[0], cp2[1], 4, 0, Math.PI * 2); ctx.fill();

                            viz.screenText('Critical pts: (1,0) [c=-2], (-1,0) [c=2]', viz.width / 2, viz.height - 30, viz.colors.red, 10);

                            // Status
                            var isCritical = (Math.abs(cVal - (-2)) < 0.1) || (Math.abs(cVal - 2) < 0.1);
                            var status = isCritical ? 'NEAR CRITICAL VALUE: level set singular!' : 'Regular value: level set is a smooth manifold';
                            var statusColor = isCritical ? viz.colors.red : viz.colors.green;
                            viz.screenText('c = ' + cVal.toFixed(2) + '  \u2014  ' + status, viz.width / 2, viz.height - 10, statusColor, 11);

                            viz.drawAxes();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the regular value theorem to show that \\(SL(n, \\mathbb{R}) = \\{A \\in M_{n \\times n} : \\det A = 1\\}\\) is a smooth manifold of dimension \\(n^2 - 1\\).',
                    hint: 'Consider \\(F: M_{n \\times n} \\to \\mathbb{R}\\) defined by \\(F(A) = \\det A\\). Show that the differential of \\(F\\) at any \\(A\\) with \\(\\det A = 1\\) is surjective.',
                    solution: 'Define \\(F(A) = \\det A\\). We need \\(dF_A \\neq 0\\) for all \\(A \\in SL(n)\\). The differential is \\(dF_A(H) = \\det(A) \\cdot \\mathrm{tr}(A^{-1}H) = \\mathrm{tr}(A^{-1}H)\\) (since \\(\\det A = 1\\)). Taking \\(H = A\\) gives \\(dF_A(A) = \\mathrm{tr}(I) = n \\neq 0\\). So \\(dF_A\\) is surjective, \\(1\\) is a regular value, and \\(SL(n) = F^{-1}(1)\\) is a manifold of dimension \\(n^2 - 1\\).'
                },
                {
                    question: 'Consider \\(F: \\mathbb{R}^3 \\to \\mathbb{R}\\) defined by \\(F(x,y,z) = x^2 + y^2 - z^2\\). For which values of \\(c\\) is \\(c\\) a regular value? Describe the topology of \\(F^{-1}(c)\\) for \\(c > 0\\), \\(c = 0\\), and \\(c < 0\\).',
                    hint: 'Compute \\(\\nabla F\\) and find where it vanishes. The critical point is the origin.',
                    solution: '\\(\\nabla F = (2x, 2y, -2z)\\), which vanishes only at the origin \\((0,0,0)\\). Since \\(F(0,0,0) = 0\\), the only critical value is \\(c = 0\\). For \\(c \\neq 0\\), \\(c\\) is a regular value and \\(F^{-1}(c)\\) is a smooth 2-manifold. For \\(c > 0\\): \\(x^2 + y^2 = z^2 + c\\), a one-sheeted hyperboloid (diffeomorphic to \\(S^1 \\times \\mathbb{R}\\)). For \\(c < 0\\): a two-sheeted hyperboloid (two copies of \\(\\mathbb{R}^2\\)). For \\(c = 0\\): the cone \\(x^2 + y^2 = z^2\\), which has a singularity at the origin (not a manifold).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Partitions of Unity
        // ================================================================
        {
            id: 'sec-partition',
            title: 'Partitions of Unity',
            content: `
<h2>Partitions of Unity</h2>

<p>Partitions of unity are a fundamental technical tool. They allow us to pass from local constructions (defined in individual charts) to global constructions on the entire manifold. Without them, much of global differential geometry would be impossible.</p>

<h3>Bump Functions</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Bump Function)</div>
    <div class="env-body">
        <p>A <strong>bump function</strong> for a closed set \\(A\\) supported in an open set \\(U \\supseteq A\\) is a smooth function \\(\\psi: M \\to [0,1]\\) with \\(\\psi \\equiv 1\\) on \\(A\\) and \\(\\mathrm{supp}(\\psi) \\subseteq U\\).</p>
    </div>
</div>

<p>The existence of smooth bump functions relies on the existence of smooth functions that are "flat" (all derivatives zero) at a point. The key building block is:</p>

<div class="env-block example">
    <div class="env-title">Example: The Standard Smooth Bump</div>
    <div class="env-body">
        <p>The function \\(f: \\mathbb{R} \\to \\mathbb{R}\\) defined by</p>
        \\[f(t) = \\begin{cases} e^{-1/t} & t > 0 \\\\ 0 & t \\leq 0 \\end{cases}\\]
        <p>is smooth (all derivatives at \\(t = 0\\) are zero). From this, one constructs smooth bump functions supported on any prescribed open set.</p>
    </div>
</div>

<h3>Partition of Unity</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Partition of Unity)</div>
    <div class="env-body">
        <p>Let \\(\\{U_\\alpha\\}\\) be an open cover of a smooth manifold \\(M\\). A <strong>smooth partition of unity subordinate to</strong> \\(\\{U_\\alpha\\}\\) is a collection of smooth functions \\(\\{\\rho_\\alpha: M \\to [0,1]\\}\\) such that:</p>
        <ol>
            <li>\\(\\mathrm{supp}(\\rho_\\alpha) \\subseteq U_\\alpha\\) for each \\(\\alpha\\).</li>
            <li>The collection \\(\\{\\mathrm{supp}(\\rho_\\alpha)\\}\\) is <strong>locally finite</strong>: every point has a neighborhood meeting only finitely many supports.</li>
            <li>\\(\\sum_\\alpha \\rho_\\alpha(p) = 1\\) for every \\(p \\in M\\).</li>
        </ol>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.4 (Existence of Partitions of Unity)</div>
    <div class="env-body">
        <p>Let \\(M\\) be a smooth manifold and \\(\\{U_\\alpha\\}\\) be any open cover of \\(M\\). Then there exists a smooth partition of unity subordinate to \\(\\{U_\\alpha\\}\\).</p>
    </div>
</div>

<p>This theorem is why we require manifolds to be second countable and Hausdorff. The proof uses these topological conditions to construct an exhaustion by compact sets.</p>

<h3>Applications</h3>

<p>Partitions of unity are used throughout differential geometry:</p>
<ul>
    <li><strong>Riemannian metrics:</strong> Every smooth manifold admits a Riemannian metric. Start with the Euclidean metric in each chart, then paste them together: \\(g = \\sum_\\alpha \\rho_\\alpha \\, g_\\alpha\\).</li>
    <li><strong>Integration:</strong> To integrate a differential form \\(\\omega\\) on \\(M\\), write \\(\\omega = \\sum_\\alpha \\rho_\\alpha \\omega\\) and integrate each piece in a single chart.</li>
    <li><strong>Extension of local objects:</strong> A smooth function defined on a closed subset can be extended to the whole manifold using bump functions.</li>
    <li><strong>Embedding theorems:</strong> Whitney's embedding theorem (every smooth \\(n\\)-manifold embeds in \\(\\mathbb{R}^{2n+1}\\)) uses partitions of unity.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Remark: What Cannot Be Patched</div>
    <div class="env-body">
        <p>Partitions of unity work for "convex" constructions (metrics, connections, integrations) but not for "rigid" ones. For instance, you cannot paste together local complex structures or symplectic structures using partitions of unity; these require topological obstructions to be absent.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Construct an explicit smooth bump function \\(\\psi: \\mathbb{R} \\to [0,1]\\) that equals 1 on \\([-1,1]\\) and vanishes outside \\((-2, 2)\\).',
                    hint: 'Use \\(f(t) = e^{-1/t}\\) for \\(t > 0\\) and 0 for \\(t \\leq 0\\), then build a "step" function \\(g(t) = f(t)/(f(t) + f(1-t))\\) that smoothly transitions from 0 to 1 on \\([0,1]\\).',
                    solution: 'Let \\(f(t) = e^{-1/t}\\) for \\(t > 0\\), \\(f(t) = 0\\) for \\(t \\leq 0\\). Define \\(g(t) = f(t)/(f(t) + f(1-t))\\), which smoothly transitions from 0 to 1 on \\([0,1]\\). Then \\(\\psi(x) = g(2 - |x|)\\) equals 1 for \\(|x| \\leq 1\\) (since \\(2 - |x| \\geq 1\\)), transitions smoothly on \\(1 < |x| < 2\\), and equals 0 for \\(|x| \\geq 2\\).'
                },
                {
                    question: 'Use a partition of unity to prove: every smooth manifold admits a Riemannian metric.',
                    hint: 'In each chart \\((U_\\alpha, \\varphi_\\alpha)\\), pull back the standard Euclidean metric on \\(\\mathbb{R}^n\\) to get a Riemannian metric \\(g_\\alpha\\) on \\(U_\\alpha\\). Then use a partition of unity to combine them.',
                    solution: 'Let \\(\\{(U_\\alpha, \\varphi_\\alpha)\\}\\) be a smooth atlas and \\(\\{\\rho_\\alpha\\}\\) a partition of unity subordinate to \\(\\{U_\\alpha\\}\\). In each chart, define \\(g_\\alpha = \\varphi_\\alpha^*(\\text{Euclidean metric})\\), which is a positive-definite inner product on each tangent space in \\(U_\\alpha\\). Define \\(g = \\sum_\\alpha \\rho_\\alpha \\, g_\\alpha\\). Since each \\(\\rho_\\alpha \\geq 0\\), \\(\\sum \\rho_\\alpha = 1\\), and each \\(g_\\alpha\\) is positive-definite, the sum \\(g\\) is positive-definite (a convex combination of positive-definite forms with at least one \\(\\rho_\\alpha > 0\\) at each point). Smoothness follows from the smoothness of each \\(\\rho_\\alpha\\) and \\(g_\\alpha\\).'
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
<h2>Looking Ahead: Tangent Spaces, Vector Fields, and Beyond</h2>

<p>We have built the foundation: smooth manifolds are spaces that locally resemble \\(\\mathbb{R}^n\\), with smooth transition maps ensuring that calculus is well-defined. But so far, we have only talked about <em>points</em> and <em>maps</em>. To do differential geometry, we need <em>vectors</em>.</p>

<h3>The Next Step: Tangent Spaces</h3>

<p>On a surface \\(S \\subset \\mathbb{R}^3\\), the tangent plane \\(T_pS\\) is the plane of all velocity vectors of curves passing through \\(p\\). On an abstract manifold, there is no ambient space, so we cannot define tangent vectors as "arrows in \\(\\mathbb{R}^3\\)." Instead, we will define the <strong>tangent space</strong> \\(T_pM\\) intrinsically, using one of three equivalent approaches:</p>

<div class="env-block intuition">
    <div class="env-title">Three Ways to Think About Tangent Vectors</div>
    <div class="env-body">
        <ol>
            <li><strong>Velocities of curves:</strong> A tangent vector at \\(p\\) is an equivalence class of curves \\(\\gamma\\) with \\(\\gamma(0) = p\\), where two curves are equivalent if they have the same velocity in every chart.</li>
            <li><strong>Derivations:</strong> A tangent vector at \\(p\\) is a linear map \\(v: C^\\infty(M) \\to \\mathbb{R}\\) satisfying the Leibniz rule \\(v(fg) = f(p)v(g) + g(p)v(f)\\). This is the most algebraic and intrinsic definition.</li>
            <li><strong>Coordinate vectors:</strong> In a chart \\((U, \\varphi)\\), the tangent vectors \\(\\partial/\\partial x^i|_p\\) form a basis. A tangent vector is a linear combination \\(v = v^i \\partial/\\partial x^i\\).</li>
        </ol>
    </div>
</div>

<h3>The Roadmap</h3>

<p>With tangent spaces in hand, we will build:</p>
<ul>
    <li><strong>Chapter 12:</strong> Tangent bundles and vector fields; the differential \\(dF_p: T_pM \\to T_{F(p)}N\\) of a smooth map, generalizing the Jacobian.</li>
    <li><strong>Chapter 13:</strong> Differential forms and integration on manifolds; Stokes' theorem as a vast generalization of the fundamental theorem of calculus.</li>
    <li><strong>Chapter 14 onward:</strong> Riemannian metrics, connections, curvature; the full apparatus of Riemannian geometry, generalizing everything we did for surfaces in Part B.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">A Unifying Theme</div>
    <div class="env-body">
        <p>The entire theory of smooth manifolds can be summarized in one principle: <em>define things locally using charts, and show they are independent of the chart chosen</em>. Every construction we have seen (smooth maps, submanifolds, partitions of unity) and will see (tangent vectors, forms, metrics, curvature) follows this pattern. The transition maps do the heavy lifting, ensuring that our local definitions assemble into well-defined global objects.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: '(Preview) On \\(S^2\\), consider two curves through the north pole \\(N = (0,0,1)\\): \\(\\gamma_1(t) = (\\sin t, 0, \\cos t)\\) and \\(\\gamma_2(t) = (0, \\sin t, \\cos t)\\). Compute their velocity vectors at \\(t = 0\\) (as vectors in \\(\\mathbb{R}^3\\)). These will be elements of \\(T_NS^2\\). What is \\(T_NS^2\\) as a subspace of \\(\\mathbb{R}^3\\)?',
                    hint: 'Differentiate and evaluate at \\(t = 0\\). The tangent plane at \\(N\\) to the sphere \\(x^2 + y^2 + z^2 = 1\\) is the set of vectors perpendicular to \\(N = (0,0,1)\\).',
                    solution: '\\(\\gamma_1\'(0) = (1, 0, 0)\\) and \\(\\gamma_2\'(0) = (0, 1, 0)\\). The tangent plane \\(T_NS^2\\) is the plane perpendicular to \\(N = (0,0,1)\\), i.e., the \\(xy\\)-plane \\(\\{(a, b, 0) : a, b \\in \\mathbb{R}\\}\\). The two velocity vectors form a basis for this 2-dimensional space.'
                },
                {
                    question: '(Dimension count) List the dimensions of the following manifolds: \\(S^n\\), \\(T^n\\), \\(\\mathbb{R}P^n\\), \\(O(n)\\), \\(SO(n)\\), \\(U(n)\\), \\(SU(n)\\), \\(\\mathrm{Gr}(k,n)\\), \\(GL(n,\\mathbb{R})\\).',
                    hint: 'Use the regular value theorem where applicable. For \\(U(n)\\), it is a real manifold of real dimension \\(n^2\\) (not \\(2n^2\\)).',
                    solution: '\\(\\dim S^n = n\\). \\(\\dim T^n = n\\). \\(\\dim \\mathbb{R}P^n = n\\). \\(\\dim O(n) = n(n-1)/2\\) (from \\(n^2 - n(n+1)/2\\) constraints). \\(\\dim SO(n) = n(n-1)/2\\) (same, as a connected component). \\(\\dim U(n) = n^2\\) (\\(2n^2\\) real dimensions in \\(M_{n \\times n}(\\mathbb{C})\\) minus \\(n^2\\) real constraints from \\(A^*A = I\\), where \\(A^*A\\) is Hermitian). \\(\\dim SU(n) = n^2 - 1\\) (one additional constraint \\(\\det = 1\\)). \\(\\dim \\mathrm{Gr}(k,n) = k(n-k)\\). \\(\\dim GL(n,\\mathbb{R}) = n^2\\) (open in \\(M_{n \\times n}\\)).'
                }
            ]
        }
    ]
});
