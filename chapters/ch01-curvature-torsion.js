window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Curvature & Torsion',
    subtitle: 'How curves bend and twist',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Curvature and Torsion?</h2>

<div class="env-block intuition">
    <div class="env-title">A Tale of Two Roads</div>
    <div class="env-body">
        <p>Imagine driving along a straight highway versus navigating a mountain switchback. Your steering wheel tells you the difference: on the highway it stays still; on the switchback it turns constantly. <strong>Curvature</strong> is the mathematical measure of how sharply a curve deviates from straightness at each point.</p>
        <p>Now imagine a roller coaster. It not only bends left and right but also climbs and drops out of its current plane of motion. <strong>Torsion</strong> measures this twisting: how much a space curve departs from being a flat (planar) curve.</p>
    </div>
</div>

<p>In Chapter 0 we studied how to parametrize curves and compute tangent vectors. But the tangent vector alone tells us the direction of travel, not <em>how that direction changes</em>. Curvature and torsion capture precisely this: the rate at which the tangent vector rotates, and the rate at which the osculating plane twists.</p>

<p>These two scalar quantities, together with the arc-length parametrization, determine a space curve up to rigid motion. This is the content of the <strong>Fundamental Theorem of Curves</strong> (Chapter 2): given \\(\\kappa(s) > 0\\) and \\(\\tau(s)\\), there exists a unique curve (up to rotation and translation) with those curvature and torsion functions. Curvature and torsion are, in a precise sense, the complete set of local invariants of a space curve.</p>

<h3>What This Chapter Covers</h3>

<p>We develop curvature first for plane curves (where it has a natural sign), then for space curves (where it is always non-negative). We introduce torsion for space curves, explore the osculating circle and osculating plane, and derive practical computation formulas for curves given in arbitrary parametrizations.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The concept of curvature dates to the ancient Greeks: Apollonius studied osculating circles around 200 BC. The modern analytical treatment was developed by Euler (1736), who defined curvature as the reciprocal of the osculating circle's radius, and later refined by the French school, especially Frenet (1847) and Serret (1851), who formalized the moving frame approach we study in the next chapter.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Curvature of Plane Curves
        // ================================================================
        {
            id: 'sec-curvature-2d',
            title: 'Curvature of Plane Curves',
            content: `
<h2>Curvature of Plane Curves</h2>

<div class="env-block intuition">
    <div class="env-title">Curvature as Turning Rate</div>
    <div class="env-body">
        <p>Walk along a curve and keep track of the direction you face (the angle \\(\\theta\\) your tangent makes with the horizontal). On a straight line, \\(\\theta\\) stays constant. On a circle, \\(\\theta\\) changes at a steady rate. Curvature measures how fast \\(\\theta\\) changes per unit distance traveled.</p>
    </div>
</div>

<h3>Arc-Length Parametrization</h3>

<p>Let \\(\\alpha: I \\to \\mathbb{R}^2\\) be a regular curve parametrized by arc length \\(s\\). The unit tangent vector is \\(\\mathbf{T}(s) = \\alpha'(s)\\), and since \\(|\\mathbf{T}(s)| = 1\\), we can write \\(\\mathbf{T}(s) = (\\cos\\theta(s),\\, \\sin\\theta(s))\\) for a smooth angle function \\(\\theta(s)\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 1.1 (Signed Curvature)</div>
    <div class="env-body">
        <p>The <strong>signed curvature</strong> of a plane curve parametrized by arc length is</p>
        \\[\\kappa(s) = \\frac{d\\theta}{ds} = \\mathbf{T}'(s) \\cdot \\mathbf{n}(s),\\]
        <p>where \\(\\mathbf{n}(s) = (-\\sin\\theta(s),\\, \\cos\\theta(s))\\) is the unit normal obtained by rotating \\(\\mathbf{T}\\) by \\(+90^\\circ\\).</p>
    </div>
</div>

<p>The sign of \\(\\kappa\\) carries geometric meaning: \\(\\kappa > 0\\) means the curve bends toward the left of the direction of travel (toward \\(\\mathbf{n}\\)), while \\(\\kappa < 0\\) means it bends to the right. A straight line has \\(\\kappa = 0\\) everywhere.</p>

<div class="env-block theorem">
    <div class="env-title">Proposition 1.2</div>
    <div class="env-body">
        <p>For a plane curve parametrized by arc length,</p>
        \\[\\mathbf{T}'(s) = \\kappa(s)\\,\\mathbf{n}(s).\\]
        <p>In particular, \\(|\\kappa(s)| = |\\mathbf{T}'(s)|\\).</p>
    </div>
</div>

<p><em>Proof.</em> Differentiating \\(\\mathbf{T} = (\\cos\\theta, \\sin\\theta)\\) gives \\(\\mathbf{T}' = \\theta'(-\\sin\\theta, \\cos\\theta) = \\theta'\\,\\mathbf{n} = \\kappa\\,\\mathbf{n}\\). \\(\\square\\)</p>

<h3>The Osculating Circle</h3>

<p>At a point where \\(\\kappa(s) \\neq 0\\), the <strong>osculating circle</strong> is the circle that best approximates the curve. Its radius is \\(R = 1/|\\kappa|\\), and its center lies at</p>
\\[\\mathbf{c}(s) = \\alpha(s) + \\frac{1}{\\kappa(s)}\\,\\mathbf{n}(s).\\]

<p>The osculating circle shares the same tangent line and curvature as the curve at the point of contact. It is the unique circle achieving second-order contact.</p>

<div class="env-block example">
    <div class="env-title">Example: The Circle</div>
    <div class="env-body">
        <p>A circle of radius \\(r\\) parametrized by arc length: \\(\\alpha(s) = (r\\cos(s/r),\\, r\\sin(s/r))\\). Then \\(\\theta(s) = s/r + \\pi/2\\), so \\(\\kappa = d\\theta/ds = 1/r\\). Constant curvature, and the osculating circle is the circle itself. A smaller circle bends more sharply, hence has larger curvature.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-osculating-circle"></div>
<div class="viz-placeholder" data-viz="viz-signed-curvature"></div>
`,
            visualizations: [
                {
                    id: 'viz-osculating-circle',
                    title: 'Osculating Circle on a Plane Curve',
                    description: 'Drag the point along the curve to see the osculating circle move. The circle has radius \\(R = 1/|\\kappa|\\) and is tangent to the curve. Notice how it shrinks where the curve bends sharply.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 220, scale: 50
                        });

                        var tParam = 1.0;
                        var drag = viz.addDraggable('pt', 0, 0, viz.colors.orange, 8, function(wx, wy) {
                            // Find closest t on curve
                            var bestT = 0, bestDist = Infinity;
                            for (var t = -3; t <= 3; t += 0.01) {
                                var p = curveAt(t);
                                var d = Math.sqrt((wx - p[0]) * (wx - p[0]) + (wy - p[1]) * (wy - p[1]));
                                if (d < bestDist) { bestDist = d; bestT = t; }
                            }
                            tParam = bestT;
                        });

                        function curveAt(t) {
                            return [t, 0.3 * Math.sin(1.5 * t) + 0.15 * Math.cos(2.5 * t)];
                        }

                        function curveDeriv(t) {
                            return [1, 0.3 * 1.5 * Math.cos(1.5 * t) - 0.15 * 2.5 * Math.sin(2.5 * t)];
                        }

                        function curveDeriv2(t) {
                            return [0, -0.3 * 1.5 * 1.5 * Math.sin(1.5 * t) - 0.15 * 2.5 * 2.5 * Math.cos(2.5 * t)];
                        }

                        function computeCurvature(t) {
                            var d1 = curveDeriv(t);
                            var d2 = curveDeriv2(t);
                            var cross = d1[0] * d2[1] - d1[1] * d2[0];
                            var speed = Math.sqrt(d1[0] * d1[0] + d1[1] * d1[1]);
                            return cross / (speed * speed * speed);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw curve
                            viz.drawFunction(function(x) {
                                return 0.3 * Math.sin(1.5 * x) + 0.15 * Math.cos(2.5 * x);
                            }, -5, 5, viz.colors.blue, 2.5);

                            // Compute curvature at tParam
                            var p = curveAt(tParam);
                            var kappa = computeCurvature(tParam);
                            var d1 = curveDeriv(tParam);
                            var speed = Math.sqrt(d1[0] * d1[0] + d1[1] * d1[1]);
                            var tx = d1[0] / speed, ty = d1[1] / speed;
                            var nx = -ty, ny = tx;

                            drag.x = p[0];
                            drag.y = p[1];

                            if (Math.abs(kappa) > 0.01) {
                                var R = 1 / kappa;
                                var cx = p[0] + R * nx;
                                var cy = p[1] + R * ny;

                                // Osculating circle
                                viz.drawCircle(cx, cy, Math.abs(R), null, viz.colors.teal + '88', 2);

                                // Center
                                viz.drawPoint(cx, cy, viz.colors.teal, 'C', 4);

                                // Radius line
                                viz.drawSegment(p[0], p[1], cx, cy, viz.colors.teal + '66', 1, true);
                            }

                            // Tangent line segment
                            viz.drawSegment(p[0] - tx * 1.5, p[1] - ty * 1.5, p[0] + tx * 1.5, p[1] + ty * 1.5, viz.colors.purple + '88', 1.5, true);

                            // Normal arrow
                            viz.drawVector(p[0], p[1], p[0] + nx * 0.8, p[1] + ny * 0.8, viz.colors.green, 'n', 1.5);

                            // Tangent arrow
                            viz.drawVector(p[0], p[1], p[0] + tx * 0.8, p[1] + ty * 0.8, viz.colors.purple, 'T', 1.5);

                            viz.drawDraggables();

                            // Info
                            var ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('\u03BA = ' + kappa.toFixed(3), 12, 12);
                            ctx.fillText('R = 1/|\u03BA| = ' + (Math.abs(kappa) > 0.01 ? (1 / Math.abs(kappa)).toFixed(2) : '\u221E'), 12, 30);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-signed-curvature',
                    title: 'Signed Curvature: Bending Left vs. Right',
                    description: 'The curve is colored by its signed curvature: blue where \\(\\kappa > 0\\) (bending left) and red where \\(\\kappa < 0\\) (bending right). Inflection points (\\(\\kappa = 0\\)) are marked.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 50
                        });

                        function curveY(x) {
                            return 0.5 * Math.sin(x) + 0.2 * Math.sin(2.3 * x);
                        }

                        function curveDy(x) {
                            return 0.5 * Math.cos(x) + 0.2 * 2.3 * Math.cos(2.3 * x);
                        }

                        function curveDDy(x) {
                            return -0.5 * Math.sin(x) - 0.2 * 2.3 * 2.3 * Math.sin(2.3 * x);
                        }

                        function signedKappa(x) {
                            var dy = curveDy(x);
                            var ddy = curveDDy(x);
                            var denom = Math.pow(1 + dy * dy, 1.5);
                            return ddy / denom;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var steps = 600;
                            var xMin = -5, xMax = 5;
                            var inflections = [];

                            // Draw curve colored by sign of curvature
                            for (var i = 0; i < steps; i++) {
                                var x1 = xMin + (xMax - xMin) * i / steps;
                                var x2 = xMin + (xMax - xMin) * (i + 1) / steps;
                                var y1 = curveY(x1);
                                var y2 = curveY(x2);
                                var k = signedKappa((x1 + x2) / 2);

                                var color;
                                if (k > 0.02) color = viz.colors.blue;
                                else if (k < -0.02) color = viz.colors.red;
                                else color = viz.colors.yellow;

                                var s1 = viz.toScreen(x1, y1);
                                var s2 = viz.toScreen(x2, y2);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(s1[0], s1[1]);
                                ctx.lineTo(s2[0], s2[1]);
                                ctx.stroke();

                                // Detect inflection points
                                var k1 = signedKappa(x1);
                                var k2 = signedKappa(x2);
                                if (k1 * k2 < 0) {
                                    var xm = (x1 + x2) / 2;
                                    inflections.push([xm, curveY(xm)]);
                                }
                            }

                            // Mark inflection points
                            for (var j = 0; j < inflections.length; j++) {
                                viz.drawPoint(inflections[j][0], inflections[j][1], viz.colors.yellow, '\u03BA=0', 5);
                            }

                            // Legend
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('\u03BA > 0 (bends left)', 12, 16);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('\u03BA < 0 (bends right)', 12, 34);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('\u03BA = 0 (inflection)', 12, 52);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the signed curvature of the parabola \\(y = x^2\\) at the origin. What is the radius of the osculating circle there?',
                    hint: 'Use \\(\\kappa = y\'\'/(1 + (y\')^2)^{3/2}\\). At \\(x = 0\\), \\(y\' = 0\\) and \\(y\'\' = 2\\).',
                    solution: 'We have \\(y\' = 2x\\), \\(y\'\' = 2\\). At \\(x = 0\\): \\(\\kappa = 2/(1+0)^{3/2} = 2\\). The osculating circle has radius \\(R = 1/|\\kappa| = 1/2\\). The center is at \\((0, 1/2)\\).'
                },
                {
                    question: 'Show that a curve has constant curvature \\(\\kappa = c > 0\\) if and only if it is (part of) a circle of radius \\(1/c\\).',
                    hint: 'If \\(\\kappa = c\\), then \\(\\theta(s) = cs + \\theta_0\\). Integrate to find \\(\\alpha(s)\\).',
                    solution: 'If \\(\\kappa = c\\) is constant, then \\(\\theta(s) = cs + \\theta_0\\). Integrating \\(\\alpha\'(s) = (\\cos\\theta, \\sin\\theta)\\) gives \\(\\alpha(s) = (\\frac{1}{c}\\sin(cs + \\theta_0) + a,\\, -\\frac{1}{c}\\cos(cs + \\theta_0) + b)\\), which is a circle of radius \\(1/c\\) centered at \\((a, b)\\). Conversely, any circle of radius \\(r\\) has curvature \\(1/r\\).'
                },
                {
                    question: 'Find all inflection points of the curve \\(y = \\sin x\\) on \\([0, 2\\pi]\\).',
                    hint: 'Inflection points occur where \\(\\kappa = 0\\), equivalently where \\(y\'\' = 0\\).',
                    solution: '\\(y\'\' = -\\sin x = 0\\) at \\(x = 0, \\pi, 2\\pi\\). At these points the curvature changes sign. For \\(x \\in (0, \\pi)\\), \\(y\'\' < 0\\) so \\(\\kappa < 0\\); for \\(x \\in (\\pi, 2\\pi)\\), \\(y\'\' > 0\\) so \\(\\kappa > 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Curvature in 3D
        // ================================================================
        {
            id: 'sec-curvature-3d',
            title: 'Curvature in 3D',
            content: `
<h2>Curvature in 3D</h2>

<div class="env-block intuition">
    <div class="env-title">No Preferred Side</div>
    <div class="env-body">
        <p>In the plane, a curve can bend "left" or "right," giving curvature a natural sign. In three dimensions there is no canonical "left" or "right": the curve can bend in any direction perpendicular to its tangent. We therefore define curvature as a non-negative quantity measuring the <em>magnitude</em> of bending, without a sign.</p>
    </div>
</div>

<h3>Definition via Arc-Length Parametrization</h3>

<p>Let \\(\\alpha: I \\to \\mathbb{R}^3\\) be a curve parametrized by arc length. The unit tangent is \\(\\mathbf{T}(s) = \\alpha'(s)\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 1.3 (Curvature in 3D)</div>
    <div class="env-body">
        <p>The <strong>curvature</strong> of a space curve parametrized by arc length is</p>
        \\[\\kappa(s) = |\\mathbf{T}'(s)| = |\\alpha''(s)|.\\]
        <p>By definition, \\(\\kappa(s) \\geq 0\\).</p>
    </div>
</div>

<p>Since \\(|\\mathbf{T}| = 1\\), we have \\(\\mathbf{T} \\cdot \\mathbf{T} = 1\\), and differentiating gives \\(\\mathbf{T}' \\cdot \\mathbf{T} = 0\\). So \\(\\mathbf{T}'\\) is always perpendicular to \\(\\mathbf{T}\\). When \\(\\kappa > 0\\), the unit vector in the direction of \\(\\mathbf{T}'\\) is the <strong>principal normal</strong>:</p>

\\[\\mathbf{N}(s) = \\frac{\\mathbf{T}'(s)}{|\\mathbf{T}'(s)|} = \\frac{\\mathbf{T}'(s)}{\\kappa(s)}.\\]

<p>This gives the fundamental relation:</p>
\\[\\mathbf{T}'(s) = \\kappa(s)\\,\\mathbf{N}(s).\\]

<div class="env-block example">
    <div class="env-title">Example: Circular Helix</div>
    <div class="env-body">
        <p>The helix \\(\\alpha(t) = (a\\cos t, a\\sin t, bt)\\) has speed \\(|\\alpha'(t)| = \\sqrt{a^2 + b^2} = c\\). Reparametrizing by arc length \\(s = ct\\):</p>
        \\[\\alpha(s) = \\left(a\\cos\\frac{s}{c},\\, a\\sin\\frac{s}{c},\\, \\frac{bs}{c}\\right).\\]
        <p>Then \\(\\alpha''(s) = (-\\frac{a}{c^2}\\cos\\frac{s}{c},\\, -\\frac{a}{c^2}\\sin\\frac{s}{c},\\, 0)\\), so</p>
        \\[\\kappa = |\\alpha''(s)| = \\frac{a}{c^2} = \\frac{a}{a^2 + b^2}.\\]
        <p>The curvature is constant and depends on both the radius \\(a\\) and the pitch \\(b\\). When \\(b = 0\\) (a circle), \\(\\kappa = 1/a\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Proposition 1.4</div>
    <div class="env-body">
        <p>A regular curve has \\(\\kappa(s) = 0\\) for all \\(s\\) if and only if it is (part of) a straight line.</p>
    </div>
</div>

<p><em>Proof.</em> \\(\\kappa = 0\\) everywhere means \\(\\mathbf{T}'(s) = 0\\), so \\(\\mathbf{T}\\) is constant. Then \\(\\alpha(s) = \\alpha(0) + s\\mathbf{T}\\), a line. The converse is immediate. \\(\\square\\)</p>

<div class="viz-placeholder" data-viz="viz-curvature-3d"></div>
`,
            visualizations: [
                {
                    id: 'viz-curvature-3d',
                    title: '3D Curve with Curvature Display',
                    description: 'A 3D space curve (helix) with the curvature displayed at a draggable point. The tangent \\(\\mathbf{T}\\) and principal normal \\(\\mathbf{N}\\) are shown. Adjust the helix parameters to see how curvature changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 240, scale: 1
                        });

                        var helixA = 2.0;
                        var helixB = 1.0;
                        var tPt = 1.0;
                        var rotAngle = 0.4;

                        VizEngine.createSlider(controls, 'radius a', 0.5, 3, helixA, 0.1, function(v) { helixA = v; });
                        VizEngine.createSlider(controls, 'pitch b', 0, 3, helixB, 0.1, function(v) { helixB = v; });
                        VizEngine.createSlider(controls, 'point t', -3, 6, tPt, 0.1, function(v) { tPt = v; });

                        // Simple 3D projection (isometric-ish)
                        function project(x, y, z) {
                            var cosA = Math.cos(rotAngle), sinA = Math.sin(rotAngle);
                            var px = x * cosA - y * sinA;
                            var py = -x * sinA * 0.4 - y * cosA * 0.4 + z;
                            return [280 + px * 55, 280 - py * 55];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            rotAngle += 0.003;

                            var c = Math.sqrt(helixA * helixA + helixB * helixB);
                            var kappa = (c > 0.01) ? helixA / (c * c) : 0;

                            // Draw helix
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var t = -2; t <= 8; t += 0.02) {
                                var x = helixA * Math.cos(t);
                                var y = helixA * Math.sin(t);
                                var z = helixB * t;
                                var p = project(x, y, z);
                                if (!started) { ctx.moveTo(p[0], p[1]); started = true; }
                                else ctx.lineTo(p[0], p[1]);
                            }
                            ctx.stroke();

                            // Point on helix
                            var px = helixA * Math.cos(tPt);
                            var py = helixA * Math.sin(tPt);
                            var pz = helixB * tPt;
                            var pp = project(px, py, pz);

                            // Tangent vector T
                            var tx = -helixA * Math.sin(tPt) / c;
                            var ty = helixA * Math.cos(tPt) / c;
                            var tz = helixB / c;

                            // Second derivative (for N direction)
                            var nx = -Math.cos(tPt);
                            var ny = -Math.sin(tPt);
                            var nz = 0;

                            // Draw T vector
                            var tEnd = project(px + tx * 1.5, py + ty * 1.5, pz + tz * 1.5);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(pp[0], pp[1]);
                            ctx.lineTo(tEnd[0], tEnd[1]);
                            ctx.stroke();
                            // Arrowhead
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath();
                            ctx.arc(tEnd[0], tEnd[1], 4, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.purple;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('T', tEnd[0] + 6, tEnd[1] - 6);

                            // Draw N vector
                            var nEnd = project(px + nx * 1.2, py + ny * 1.2, pz + nz * 1.2);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(pp[0], pp[1]);
                            ctx.lineTo(nEnd[0], nEnd[1]);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.arc(nEnd[0], nEnd[1], 4, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('N', nEnd[0] + 6, nEnd[1] - 6);

                            // Point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(pp[0], pp[1], 6, 0, Math.PI * 2);
                            ctx.fill();

                            // Info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('\u03BA = a/(a\u00B2+b\u00B2) = ' + kappa.toFixed(3), 12, 12);
                            ctx.fillText('R = 1/\u03BA = ' + (kappa > 0.001 ? (1/kappa).toFixed(2) : '\u221E'), 12, 30);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('a = ' + helixA.toFixed(1) + ', b = ' + helixB.toFixed(1), 12, 52);

                            // Axis labels
                            var xAx = project(4, 0, 0);
                            var yAx = project(0, 4, 0);
                            var zAx = project(0, 0, 6);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 0.8;
                            var origin = project(0, 0, 0);
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(origin[0], origin[1]); ctx.lineTo(xAx[0], xAx[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(origin[0], origin[1]); ctx.lineTo(yAx[0], yAx[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(origin[0], origin[1]); ctx.lineTo(zAx[0], zAx[1]); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('x', xAx[0] + 4, xAx[1]);
                            ctx.fillText('y', yAx[0] + 4, yAx[1]);
                            ctx.fillText('z', zAx[0] + 4, zAx[1] - 8);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the curvature of the helix \\(\\alpha(t) = (2\\cos t, 2\\sin t, 3t)\\).',
                    hint: 'Find the speed \\(c = |\\alpha\'(t)|\\), then use \\(\\kappa = a/(a^2 + b^2)\\) where \\(a = 2, b = 3\\).',
                    solution: '\\(|\\alpha\'(t)| = \\sqrt{4 + 9} = \\sqrt{13}\\). The curvature is \\(\\kappa = 2/(4 + 9) = 2/13\\). The radius of curvature is \\(R = 13/2 = 6.5\\).'
                },
                {
                    question: 'Prove that \\(\\kappa(s) = 0\\) for all \\(s\\) implies the curve is a straight line.',
                    hint: 'What does \\(\\kappa = |\\mathbf{T}\'| = 0\\) imply about \\(\\mathbf{T}\\)?',
                    solution: 'If \\(\\kappa(s) = |\\mathbf{T}\'(s)| = 0\\) for all \\(s\\), then \\(\\mathbf{T}\'(s) = \\mathbf{0}\\), so \\(\\mathbf{T}(s) = \\mathbf{T}_0\\) is constant. Integrating, \\(\\alpha(s) = \\alpha(0) + s\\mathbf{T}_0\\), which is a straight line.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Torsion
        // ================================================================
        {
            id: 'sec-torsion',
            title: 'Torsion',
            content: `
<h2>Torsion</h2>

<div class="env-block intuition">
    <div class="env-title">Escaping the Plane</div>
    <div class="env-body">
        <p>Curvature tells us how much the curve bends, but not whether it stays flat. A circle has curvature but zero torsion: it lies in a plane. A helix has both curvature and torsion: it spirals out of any plane. Torsion measures the rate at which a curve "twists" out of its osculating plane.</p>
    </div>
</div>

<h3>The Binormal Vector</h3>

<p>When \\(\\kappa(s) > 0\\), we have the unit tangent \\(\\mathbf{T}\\) and unit principal normal \\(\\mathbf{N}\\). The <strong>binormal vector</strong> completes the right-handed orthonormal frame:</p>
\\[\\mathbf{B}(s) = \\mathbf{T}(s) \\times \\mathbf{N}(s).\\]

<p>The triple \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) is the <strong>Frenet-Serret frame</strong>, which we study in detail in Chapter 2.</p>

<div class="env-block definition">
    <div class="env-title">Definition 1.5 (Torsion)</div>
    <div class="env-body">
        <p>The <strong>torsion</strong> of a space curve (with \\(\\kappa > 0\\)) parametrized by arc length is</p>
        \\[\\tau(s) = -\\mathbf{B}'(s) \\cdot \\mathbf{N}(s).\\]
        <p>Equivalently, \\(\\mathbf{B}'(s) = -\\tau(s)\\,\\mathbf{N}(s)\\).</p>
    </div>
</div>

<p>Unlike curvature, <strong>torsion can be positive, negative, or zero</strong>:</p>
<ul>
    <li>\\(\\tau > 0\\): the curve twists in the direction of a right-handed screw along \\(\\mathbf{T}\\)</li>
    <li>\\(\\tau < 0\\): left-handed twist</li>
    <li>\\(\\tau = 0\\): the curve is locally planar</li>
</ul>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.6</div>
    <div class="env-body">
        <p>A regular curve with \\(\\kappa(s) > 0\\) has \\(\\tau(s) = 0\\) for all \\(s\\) if and only if the curve lies in a plane.</p>
    </div>
</div>

<p><em>Proof sketch.</em> If \\(\\tau = 0\\), then \\(\\mathbf{B}' = 0\\), so \\(\\mathbf{B}\\) is a constant vector \\(\\mathbf{B}_0\\). Then \\(\\frac{d}{ds}[\\alpha(s) \\cdot \\mathbf{B}_0] = \\mathbf{T}(s) \\cdot \\mathbf{B}_0 = 0\\), so \\(\\alpha(s) \\cdot \\mathbf{B}_0 = c\\) for some constant. This means the curve lies in the plane \\(\\mathbf{x} \\cdot \\mathbf{B}_0 = c\\). \\(\\square\\)</p>

<div class="env-block example">
    <div class="env-title">Example: Helix Torsion</div>
    <div class="env-body">
        <p>For the helix \\(\\alpha(t) = (a\\cos t, a\\sin t, bt)\\) with \\(c = \\sqrt{a^2 + b^2}\\), a computation gives</p>
        \\[\\tau = \\frac{b}{a^2 + b^2}.\\]
        <p>The torsion is constant and proportional to the pitch parameter \\(b\\). When \\(b = 0\\), \\(\\tau = 0\\) and the helix degenerates to a circle (a planar curve).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-torsion-helix"></div>
`,
            visualizations: [
                {
                    id: 'viz-torsion-helix',
                    title: 'Torsion of a Helix',
                    description: 'Adjust the pitch \\(b\\) of a helix \\((a\\cos t, a\\sin t, bt)\\) and watch the torsion change. When \\(b = 0\\) (circle), torsion is zero. The osculating plane is shown in teal.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 240, scale: 1
                        });

                        var aVal = 2.0;
                        var bVal = 1.5;
                        var rotAngle = 0.5;

                        VizEngine.createSlider(controls, 'pitch b', 0, 4, bVal, 0.1, function(v) { bVal = v; });
                        VizEngine.createSlider(controls, 'radius a', 0.5, 3, aVal, 0.1, function(v) { aVal = v; });

                        function project(x, y, z) {
                            var cosA = Math.cos(rotAngle), sinA = Math.sin(rotAngle);
                            var px = x * cosA - y * sinA;
                            var py = -x * sinA * 0.35 - y * cosA * 0.35 + z;
                            return [280 + px * 52, 300 - py * 52];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            rotAngle += 0.004;

                            var c2 = aVal * aVal + bVal * bVal;
                            var c = Math.sqrt(c2);
                            var kappa = (c > 0.01) ? aVal / c2 : 0;
                            var tau = (c > 0.01) ? bVal / c2 : 0;

                            // Draw helix
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var t = -1; t <= 8; t += 0.02) {
                                var x = aVal * Math.cos(t);
                                var y = aVal * Math.sin(t);
                                var z = bVal * t;
                                var p = project(x, y, z);
                                if (!started) { ctx.moveTo(p[0], p[1]); started = true; }
                                else ctx.lineTo(p[0], p[1]);
                            }
                            ctx.stroke();

                            // Show a point with its osculating plane
                            var tPt = 2.5;
                            var px = aVal * Math.cos(tPt);
                            var py = aVal * Math.sin(tPt);
                            var pz = bVal * tPt;
                            var pp = project(px, py, pz);

                            // T, N, B vectors at point
                            var Tx = -aVal * Math.sin(tPt) / c;
                            var Ty = aVal * Math.cos(tPt) / c;
                            var Tz = bVal / c;
                            var Nx = -Math.cos(tPt);
                            var Ny = -Math.sin(tPt);
                            var Nz = 0;
                            var Bx = bVal * Math.sin(tPt) / c;
                            var By = -bVal * Math.cos(tPt) / c;
                            var Bz = aVal / c;

                            // Draw osculating plane (T-N plane) as a small parallelogram
                            var scale = 1.5;
                            var corners = [
                                project(px + (Tx + Nx) * scale, py + (Ty + Ny) * scale, pz + (Tz + Nz) * scale),
                                project(px + (Tx - Nx) * scale, py + (Ty - Ny) * scale, pz + (Tz - Nz) * scale),
                                project(px + (-Tx - Nx) * scale, py + (-Ty - Ny) * scale, pz + (-Tz - Nz) * scale),
                                project(px + (-Tx + Nx) * scale, py + (-Ty + Ny) * scale, pz + (-Tz + Nz) * scale)
                            ];
                            ctx.fillStyle = viz.colors.teal + '22';
                            ctx.strokeStyle = viz.colors.teal + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(corners[0][0], corners[0][1]);
                            for (var i = 1; i < 4; i++) ctx.lineTo(corners[i][0], corners[i][1]);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Draw B vector
                            var bEnd = project(px + Bx * 1.5, py + By * 1.5, pz + Bz * 1.5);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(pp[0], pp[1]);
                            ctx.lineTo(bEnd[0], bEnd[1]);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(bEnd[0], bEnd[1], 4, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('B', bEnd[0] + 6, bEnd[1] - 6);

                            // Draw T and N
                            var tEnd = project(px + Tx * 1.3, py + Ty * 1.3, pz + Tz * 1.3);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(pp[0], pp[1]); ctx.lineTo(tEnd[0], tEnd[1]); ctx.stroke();
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath(); ctx.arc(tEnd[0], tEnd[1], 3, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('T', tEnd[0] + 5, tEnd[1] - 5);

                            var nEnd = project(px + Nx * 1.3, py + Ny * 1.3, pz + Nz * 1.3);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(pp[0], pp[1]); ctx.lineTo(nEnd[0], nEnd[1]); ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(nEnd[0], nEnd[1], 3, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('N', nEnd[0] + 5, nEnd[1] - 5);

                            // Point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(pp[0], pp[1], 6, 0, Math.PI * 2); ctx.fill();

                            // Info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('\u03BA = ' + kappa.toFixed(3), 12, 12);
                            ctx.fillText('\u03C4 = ' + tau.toFixed(3), 12, 32);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('\u03C4 = b/(a\u00B2+b\u00B2)', 12, 56);
                            if (bVal < 0.05) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText('b \u2248 0: planar curve (circle), \u03C4 = 0', 12, 76);
                            }
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the torsion of the helix \\(\\alpha(t) = (3\\cos t, 3\\sin t, 4t)\\).',
                    hint: 'Use the formula \\(\\tau = b/(a^2 + b^2)\\) with \\(a = 3, b = 4\\).',
                    solution: '\\(\\tau = 4/(9 + 16) = 4/25 = 0.16\\). The helix has constant positive torsion, so it twists like a right-handed screw.'
                },
                {
                    question: 'Explain geometrically why a plane curve has \\(\\tau = 0\\).',
                    hint: 'What is the binormal for a curve lying in a plane?',
                    solution: 'If the curve lies in a plane, then \\(\\mathbf{B} = \\mathbf{T} \\times \\mathbf{N}\\) is always the unit normal to that plane, which is constant. Since \\(\\mathbf{B}\' = 0\\), we get \\(\\tau = -\\mathbf{B}\' \\cdot \\mathbf{N} = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Osculating Circle & Plane
        // ================================================================
        {
            id: 'sec-osculating',
            title: 'Osculating Circle & Plane',
            content: `
<h2>Osculating Circle and Osculating Plane</h2>

<div class="env-block intuition">
    <div class="env-title">Best-Fit Circle and Plane</div>
    <div class="env-body">
        <p>At each point of a curve, the osculating circle is the circle that "kisses" the curve most closely (from Latin <em>osculari</em>, to kiss). Similarly, the osculating plane is the plane that contains this circle: it is the plane in which the curve is instantaneously turning.</p>
    </div>
</div>

<h3>The Osculating Circle</h3>

<p>At a point \\(\\alpha(s)\\) where \\(\\kappa(s) > 0\\), the <strong>osculating circle</strong> has:</p>
<ul>
    <li><strong>Radius of curvature:</strong> \\(R(s) = \\dfrac{1}{\\kappa(s)}\\)</li>
    <li><strong>Center of curvature:</strong> \\(\\mathbf{c}(s) = \\alpha(s) + R(s)\\,\\mathbf{N}(s) = \\alpha(s) + \\dfrac{1}{\\kappa(s)}\\,\\mathbf{N}(s)\\)</li>
</ul>

<p>The center of curvature always lies on the principal normal, at distance \\(R\\) from the curve. As the curvature increases, the osculating circle shrinks; at a point of inflection (\\(\\kappa = 0\\)), the "osculating circle" degenerates to a straight line (infinite radius).</p>

<div class="env-block definition">
    <div class="env-title">Definition 1.7 (Evolute)</div>
    <div class="env-body">
        <p>The <strong>evolute</strong> of a plane curve is the locus of its centers of curvature: \\(\\mathbf{c}(s) = \\alpha(s) + \\frac{1}{\\kappa(s)}\\mathbf{N}(s)\\). It traces out the "spine" around which the osculating circle rolls.</p>
    </div>
</div>

<h3>The Osculating Plane</h3>

<p>For a space curve with \\(\\kappa > 0\\), the <strong>osculating plane</strong> at \\(\\alpha(s)\\) is spanned by \\(\\mathbf{T}(s)\\) and \\(\\mathbf{N}(s)\\). Equivalently, it is the unique plane containing \\(\\alpha(s)\\) with normal \\(\\mathbf{B}(s)\\):</p>

\\[\\{\\mathbf{x} \\in \\mathbb{R}^3 : (\\mathbf{x} - \\alpha(s)) \\cdot \\mathbf{B}(s) = 0\\}.\\]

<p>The osculating plane has a beautiful limit characterization: it is the limit of the plane through three nearby points on the curve as they approach each other. It achieves second-order contact with the curve, meaning the curve stays closer to the osculating plane than to any other plane through the point.</p>

<div class="env-block theorem">
    <div class="env-title">Proposition 1.8</div>
    <div class="env-body">
        <p>The osculating plane at \\(\\alpha(s_0)\\) is the unique plane such that the distance from \\(\\alpha(s)\\) to the plane is \\(O((s - s_0)^3)\\) as \\(s \\to s_0\\).</p>
    </div>
</div>

<p><em>Proof sketch.</em> Taylor expansion: \\(\\alpha(s) = \\alpha(s_0) + (s-s_0)\\mathbf{T} + \\frac{(s-s_0)^2}{2}\\kappa\\mathbf{N} + O((s-s_0)^3)\\). The first two terms lie in the \\(\\mathbf{T}\\)-\\(\\mathbf{N}\\) plane, and the \\(\\mathbf{B}\\)-component appears only at third order. \\(\\square\\)</p>

<div class="viz-placeholder" data-viz="viz-osculating-plane"></div>
`,
            visualizations: [
                {
                    id: 'viz-osculating-plane',
                    title: 'Osculating Plane on a 3D Curve',
                    description: 'A 3D curve with the osculating plane (spanned by \\(\\mathbf{T}\\) and \\(\\mathbf{N}\\)) shown at a movable point. The plane "follows" the curve and tilts as the curve twists.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 240, scale: 1
                        });

                        var tPt = 2.0;
                        var rotAngle = 0.6;

                        VizEngine.createSlider(controls, 'point t', 0.5, 7, tPt, 0.1, function(v) { tPt = v; });

                        // A more interesting 3D curve: trefoil-like
                        function curveAt(t) {
                            return [
                                (2 + 0.8 * Math.cos(1.5 * t)) * Math.cos(t),
                                (2 + 0.8 * Math.cos(1.5 * t)) * Math.sin(t),
                                0.8 * Math.sin(1.5 * t)
                            ];
                        }

                        function curveDeriv(t) {
                            var h = 0.001;
                            var a = curveAt(t + h);
                            var b = curveAt(t - h);
                            return [(a[0]-b[0])/(2*h), (a[1]-b[1])/(2*h), (a[2]-b[2])/(2*h)];
                        }

                        function curveDeriv2(t) {
                            var h = 0.001;
                            var a = curveDeriv(t + h);
                            var b = curveDeriv(t - h);
                            return [(a[0]-b[0])/(2*h), (a[1]-b[1])/(2*h), (a[2]-b[2])/(2*h)];
                        }

                        function normalize3(v) {
                            var l = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
                            return l > 1e-10 ? [v[0]/l, v[1]/l, v[2]/l] : [0,0,0];
                        }

                        function cross3(a, b) {
                            return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
                        }

                        function project(x, y, z) {
                            var cosA = Math.cos(rotAngle), sinA = Math.sin(rotAngle);
                            var px = x * cosA - y * sinA;
                            var py = -x * sinA * 0.4 - y * cosA * 0.4 + z;
                            return [280 + px * 58, 230 - py * 58];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            rotAngle += 0.003;

                            // Draw curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var t = 0; t <= 2 * Math.PI + 0.1; t += 0.02) {
                                var c = curveAt(t);
                                var p = project(c[0], c[1], c[2]);
                                if (!started) { ctx.moveTo(p[0], p[1]); started = true; }
                                else ctx.lineTo(p[0], p[1]);
                            }
                            ctx.stroke();

                            // Frenet frame at tPt
                            var pos = curveAt(tPt);
                            var d1 = curveDeriv(tPt);
                            var d2 = curveDeriv2(tPt);
                            var T = normalize3(d1);
                            var d1xd2 = cross3(d1, d2);
                            var B = normalize3(d1xd2);
                            var N = cross3(B, T);

                            var pp = project(pos[0], pos[1], pos[2]);

                            // Draw osculating plane
                            var sc = 1.8;
                            var planeCorners = [
                                project(pos[0]+(T[0]+N[0])*sc, pos[1]+(T[1]+N[1])*sc, pos[2]+(T[2]+N[2])*sc),
                                project(pos[0]+(T[0]-N[0])*sc, pos[1]+(T[1]-N[1])*sc, pos[2]+(T[2]-N[2])*sc),
                                project(pos[0]+(-T[0]-N[0])*sc, pos[1]+(-T[1]-N[1])*sc, pos[2]+(-T[2]-N[2])*sc),
                                project(pos[0]+(-T[0]+N[0])*sc, pos[1]+(-T[1]+N[1])*sc, pos[2]+(-T[2]+N[2])*sc)
                            ];
                            ctx.fillStyle = viz.colors.teal + '1a';
                            ctx.strokeStyle = viz.colors.teal + '55';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(planeCorners[0][0], planeCorners[0][1]);
                            for (var i = 1; i < 4; i++) ctx.lineTo(planeCorners[i][0], planeCorners[i][1]);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Draw T, N, B vectors
                            var vecScale = 1.5;
                            var tEnd = project(pos[0]+T[0]*vecScale, pos[1]+T[1]*vecScale, pos[2]+T[2]*vecScale);
                            var nEnd = project(pos[0]+N[0]*vecScale, pos[1]+N[1]*vecScale, pos[2]+N[2]*vecScale);
                            var bEnd = project(pos[0]+B[0]*vecScale, pos[1]+B[1]*vecScale, pos[2]+B[2]*vecScale);

                            // T
                            ctx.strokeStyle = viz.colors.purple; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(pp[0], pp[1]); ctx.lineTo(tEnd[0], tEnd[1]); ctx.stroke();
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath(); ctx.arc(tEnd[0], tEnd[1], 3, 0, Math.PI * 2); ctx.fill();
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('T', tEnd[0] + 5, tEnd[1] - 5);

                            // N
                            ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(pp[0], pp[1]); ctx.lineTo(nEnd[0], nEnd[1]); ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(nEnd[0], nEnd[1], 3, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('N', nEnd[0] + 5, nEnd[1] - 5);

                            // B
                            ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(pp[0], pp[1]); ctx.lineTo(bEnd[0], bEnd[1]); ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(bEnd[0], bEnd[1], 3, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('B', bEnd[0] + 5, bEnd[1] - 5);

                            // Point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(pp[0], pp[1], 6, 0, Math.PI * 2); ctx.fill();

                            // Label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Osculating plane = span{T, N}', 12, 12);
                            ctx.fillText('Normal to plane = B', 12, 30);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('The teal surface is the osculating plane', 12, 52);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the center and radius of the osculating circle to \\(y = x^3\\) at the origin.',
                    hint: 'At the origin, \\(y\' = 0\\) and \\(y\'\' = 0\\). What does this tell you about the curvature there?',
                    solution: 'We have \\(y\' = 3x^2\\), \\(y\'\' = 6x\\). At \\(x = 0\\): \\(y\' = 0, y\'\' = 0\\), so \\(\\kappa = 0\\). The osculating circle degenerates: \\(R = \\infty\\). The origin is an inflection point of \\(y = x^3\\).'
                },
                {
                    question: 'For a helix \\(\\alpha(t) = (a\\cos t, a\\sin t, bt)\\), find the osculating plane at \\(t = 0\\).',
                    hint: 'Find \\(\\mathbf{T}\\) and \\(\\mathbf{N}\\) at \\(t = 0\\). The osculating plane passes through \\(\\alpha(0)\\) with normal \\(\\mathbf{B}\\).',
                    solution: 'At \\(t = 0\\): \\(\\alpha(0) = (a, 0, 0)\\). With \\(c = \\sqrt{a^2+b^2}\\), \\(\\mathbf{T} = (0, a/c, b/c)\\) and \\(\\mathbf{N} = (-1, 0, 0)\\), so \\(\\mathbf{B} = \\mathbf{T} \\times \\mathbf{N} = (0, -b/c, a/c)\\). The osculating plane is \\(\\{(x,y,z) : -\\frac{b}{c}y + \\frac{a}{c}z = 0\\}\\), i.e., \\(by = az\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Computation Formulas
        // ================================================================
        {
            id: 'sec-formulas',
            title: 'Computation Formulas',
            content: `
<h2>Computation Formulas</h2>

<div class="env-block intuition">
    <div class="env-title">Beyond Arc-Length Parametrization</div>
    <div class="env-body">
        <p>In practice, curves are rarely given in arc-length parametrization. We need formulas for \\(\\kappa\\) and \\(\\tau\\) that work for <em>any</em> regular parametrization \\(\\alpha(t)\\).</p>
    </div>
</div>

<h3>Curvature for Plane Curves \\(y = f(x)\\)</h3>

<div class="env-block theorem">
    <div class="env-title">Formula 1.9</div>
    <div class="env-body">
        <p>For a curve given as \\(y = f(x)\\):</p>
        \\[\\kappa = \\frac{|f''(x)|}{(1 + (f'(x))^2)^{3/2}}.\\]
        <p>The signed curvature (with the standard orientation) is \\(\\kappa_{\\text{signed}} = \\frac{f''(x)}{(1 + (f'(x))^2)^{3/2}}\\).</p>
    </div>
</div>

<h3>Curvature for Parametric Curves in \\(\\mathbb{R}^2\\)</h3>

<div class="env-block theorem">
    <div class="env-title">Formula 1.10</div>
    <div class="env-body">
        <p>For a plane curve \\(\\alpha(t) = (x(t), y(t))\\):</p>
        \\[\\kappa = \\frac{|x'y'' - x''y'|}{(x'^2 + y'^2)^{3/2}}.\\]
    </div>
</div>

<h3>Curvature for Space Curves</h3>

<div class="env-block theorem">
    <div class="env-title">Formula 1.11</div>
    <div class="env-body">
        <p>For a space curve \\(\\alpha(t) = (x(t), y(t), z(t))\\) with arbitrary parametrization:</p>
        \\[\\kappa(t) = \\frac{|\\alpha'(t) \\times \\alpha''(t)|}{|\\alpha'(t)|^3}.\\]
    </div>
</div>

<p><em>Proof.</em> Write \\(\\alpha' = v\\mathbf{T}\\) where \\(v = |\\alpha'|\\) is the speed. Then \\(\\alpha'' = v'\\mathbf{T} + v^2\\kappa\\mathbf{N}\\), so \\(\\alpha' \\times \\alpha'' = v^3\\kappa(\\mathbf{T} \\times \\mathbf{N}) = v^3\\kappa\\mathbf{B}\\). Taking magnitudes gives the result. \\(\\square\\)</p>

<h3>Torsion for Space Curves</h3>

<div class="env-block theorem">
    <div class="env-title">Formula 1.12</div>
    <div class="env-body">
        <p>For a space curve with \\(\\kappa > 0\\):</p>
        \\[\\tau(t) = \\frac{(\\alpha' \\times \\alpha'') \\cdot \\alpha'''}{|\\alpha' \\times \\alpha''|^2}.\\]
    </div>
</div>

<p>This formula requires the third derivative and is the scalar triple product of \\(\\alpha', \\alpha'', \\alpha'''\\) divided by \\(|\\alpha' \\times \\alpha''|^2\\). In coordinates:</p>

\\[\\tau = \\frac{\\begin{vmatrix} x' & y' & z' \\\\ x'' & y'' & z'' \\\\ x''' & y''' & z''' \\end{vmatrix}}{|\\alpha' \\times \\alpha''|^2}.\\]

<div class="env-block example">
    <div class="env-title">Example: Helix Verification</div>
    <div class="env-body">
        <p>For \\(\\alpha(t) = (a\\cos t, a\\sin t, bt)\\):</p>
        <ul>
            <li>\\(\\alpha' = (-a\\sin t, a\\cos t, b)\\)</li>
            <li>\\(\\alpha'' = (-a\\cos t, -a\\sin t, 0)\\)</li>
            <li>\\(\\alpha''' = (a\\sin t, -a\\cos t, 0)\\)</li>
        </ul>
        <p>Cross product: \\(\\alpha' \\times \\alpha'' = (ab\\sin t, -ab\\cos t, a^2)\\), with \\(|\\alpha' \\times \\alpha''| = a\\sqrt{a^2 + b^2}\\).</p>
        <p>\\(\\kappa = \\frac{a\\sqrt{a^2+b^2}}{(a^2+b^2)^{3/2}} = \\frac{a}{a^2+b^2}\\). \\(\\checkmark\\)</p>
        <p>Triple product: \\((\\alpha' \\times \\alpha'') \\cdot \\alpha''' = a^2 b\\), so \\(\\tau = \\frac{a^2 b}{a^2(a^2+b^2)} = \\frac{b}{a^2+b^2}\\). \\(\\checkmark\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-curvature-computation"></div>
<div class="viz-placeholder" data-viz="viz-curvature-plot"></div>
`,
            visualizations: [
                {
                    id: 'viz-curvature-computation',
                    title: 'Step-by-Step Curvature Computation',
                    description: 'Choose a curve and see the curvature formula applied step by step at each point. The derivatives and cross products are computed and displayed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 280, scale: 45
                        });

                        var curveType = 0;
                        var tVal = 1.0;

                        var curves = [
                            { name: 'Parabola y=x\u00B2', fn: function(t) { return [t, t*t]; }, d1: function(t) { return [1, 2*t]; }, d2: function(t) { return [0, 2]; } },
                            { name: 'Ellipse', fn: function(t) { return [3*Math.cos(t), 2*Math.sin(t)]; }, d1: function(t) { return [-3*Math.sin(t), 2*Math.cos(t)]; }, d2: function(t) { return [-3*Math.cos(t), -2*Math.sin(t)]; } },
                            { name: 'Lemniscate', fn: function(t) { var c = Math.cos(t), s = Math.sin(t); var r = 3*Math.sqrt(Math.abs(Math.cos(2*t))); return [r*c, r*s]; }, d1: function(t) { var h = 0.0005; var a = this.fn(t+h), b = this.fn(t-h); return [(a[0]-b[0])/(2*h), (a[1]-b[1])/(2*h)]; }, d2: function(t) { var h = 0.0005; var a = this.d1(t+h), b = this.d1(t-h); return [(a[0]-b[0])/(2*h), (a[1]-b[1])/(2*h)]; } }
                        ];

                        VizEngine.createButton(controls, 'Parabola', function() { curveType = 0; });
                        VizEngine.createButton(controls, 'Ellipse', function() { curveType = 1; });
                        VizEngine.createButton(controls, 'Lemniscate', function() { curveType = 2; });
                        VizEngine.createSlider(controls, 't', -3, 3, tVal, 0.05, function(v) { tVal = v; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var c = curves[curveType];
                            var ctx = viz.ctx;

                            // Draw curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            var tMin = curveType === 0 ? -3.5 : -Math.PI;
                            var tMax = curveType === 0 ? 3.5 : Math.PI;
                            for (var t = tMin; t <= tMax; t += 0.02) {
                                var pt = c.fn(t);
                                if (!isFinite(pt[0]) || !isFinite(pt[1])) { started = false; continue; }
                                var sp = viz.toScreen(pt[0], pt[1]);
                                if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; }
                                else ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.stroke();

                            // Compute at tVal
                            var pt = c.fn(tVal);
                            var d1 = c.d1(tVal);
                            var d2 = c.d2(tVal);

                            if (!isFinite(pt[0]) || !isFinite(pt[1])) return;

                            var cross = d1[0] * d2[1] - d1[1] * d2[0];
                            var speed = Math.sqrt(d1[0]*d1[0] + d1[1]*d1[1]);
                            var kappa = Math.abs(cross) / (speed * speed * speed);

                            // Draw point
                            viz.drawPoint(pt[0], pt[1], viz.colors.orange, null, 6);

                            // Draw tangent
                            var tLen = 1.5;
                            var tx = d1[0] / speed, ty = d1[1] / speed;
                            viz.drawVector(pt[0], pt[1], pt[0] + tx * tLen, pt[1] + ty * tLen, viz.colors.purple, "T'", 1.5);

                            // Osculating circle
                            if (kappa > 0.01) {
                                var R = 1 / kappa;
                                var signK = cross / Math.abs(cross);
                                var nx = -ty * signK, ny = tx * signK;
                                var cx = pt[0] + R * nx;
                                var cy = pt[1] + R * ny;
                                if (R < 15) {
                                    viz.drawCircle(cx, cy, R, null, viz.colors.teal + '66', 1.5);
                                }
                            }

                            // Computation display
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            var y0 = 10;
                            ctx.fillText(c.name + ' at t = ' + tVal.toFixed(2), 10, y0);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText("\u03B1'(t) = (" + d1[0].toFixed(2) + ', ' + d1[1].toFixed(2) + ')', 10, y0 + 18);
                            ctx.fillText("\u03B1''(t) = (" + d2[0].toFixed(2) + ', ' + d2[1].toFixed(2) + ')', 10, y0 + 36);
                            ctx.fillText("x'y''-x''y' = " + cross.toFixed(3), 10, y0 + 54);
                            ctx.fillText('|\u03B1\'| = ' + speed.toFixed(3), 10, y0 + 72);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('\u03BA = ' + kappa.toFixed(4), 10, y0 + 94);
                            if (kappa > 0.01) {
                                ctx.fillText('R = 1/\u03BA = ' + (1/kappa).toFixed(3), 10, y0 + 112);
                            }
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-curvature-plot',
                    title: 'Curve and Curvature Plot',
                    description: 'The curve is shown above, and its curvature \\(\\kappa(t)\\) is plotted below. A synchronized marker shows the correspondence. Drag the marker along either panel.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 440,
                            originX: 280, originY: 130, scale: 45
                        });

                        var tVal = 1.0;

                        var drag = viz.addDraggable('pt', 0, 0, viz.colors.orange, 8, function(wx, wy) {
                            // Map screen x back to t
                            tVal = (wx * viz.scale + viz.originX - 280) / 45 * (Math.PI / 4);
                            tVal = Math.max(-Math.PI, Math.min(Math.PI, tVal));
                        });

                        function curveAt(t) {
                            return [2.5 * Math.cos(t) + 0.5 * Math.cos(3*t), 2 * Math.sin(t) + 0.3 * Math.sin(2*t)];
                        }

                        function curveDeriv(t) {
                            var h = 0.0005;
                            var a = curveAt(t + h), b = curveAt(t - h);
                            return [(a[0]-b[0])/(2*h), (a[1]-b[1])/(2*h)];
                        }

                        function curveDeriv2(t) {
                            var h = 0.0005;
                            var a = curveDeriv(t + h), b = curveDeriv(t - h);
                            return [(a[0]-b[0])/(2*h), (a[1]-b[1])/(2*h)];
                        }

                        function kappaAt(t) {
                            var d1 = curveDeriv(t);
                            var d2 = curveDeriv2(t);
                            var cross = Math.abs(d1[0]*d2[1] - d1[1]*d2[0]);
                            var speed = Math.sqrt(d1[0]*d1[0] + d1[1]*d1[1]);
                            return cross / (speed * speed * speed);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // --- Top panel: curve ---
                            var topH = 200;
                            var topCenterY = 110;

                            // Grid and axes for top
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = -6; gx <= 6; gx++) {
                                var sx = 280 + gx * 45;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, topH); ctx.stroke();
                            }
                            for (var gy = -3; gy <= 3; gy++) {
                                var sy = topCenterY - gy * 45;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(560, sy); ctx.stroke();
                            }

                            // Draw curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var t = -Math.PI; t <= Math.PI; t += 0.01) {
                                var pt = curveAt(t);
                                var sx = 280 + pt[0] * 45;
                                var sy = topCenterY - pt[1] * 45;
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Point on curve
                            var ptC = curveAt(tVal);
                            var sx1 = 280 + ptC[0] * 45;
                            var sy1 = topCenterY - ptC[1] * 45;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(sx1, sy1, 7, 0, Math.PI * 2); ctx.fill();

                            drag.x = ptC[0];
                            drag.y = ptC[1];

                            // --- Bottom panel: kappa plot ---
                            var botTop = topH + 30;
                            var botH = 180;
                            var botCenterY = botTop + botH - 30;
                            var kappaScale = 80;

                            // Separator
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath(); ctx.moveTo(0, botTop - 10); ctx.lineTo(560, botTop - 10); ctx.stroke();

                            // Label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u03BA(t)', 30, botTop + 5);

                            // t axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(40, botCenterY); ctx.lineTo(540, botCenterY); ctx.stroke();

                            // Kappa curve
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            started = false;
                            for (var t2 = -Math.PI; t2 <= Math.PI; t2 += 0.01) {
                                var k = kappaAt(t2);
                                var sx2 = 290 + (t2 / Math.PI) * 230;
                                var sy2 = botCenterY - k * kappaScale;
                                if (!started) { ctx.moveTo(sx2, sy2); started = true; }
                                else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Synchronized marker
                            var kVal = kappaAt(tVal);
                            var mx = 290 + (tVal / Math.PI) * 230;
                            var my = botCenterY - kVal * kappaScale;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2); ctx.fill();

                            // Vertical dashed line connecting
                            ctx.strokeStyle = viz.colors.orange + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx1, botTop - 10); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(mx, botTop - 10); ctx.lineTo(mx, my); ctx.stroke();
                            ctx.setLineDash([]);

                            // t-axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('-\u03C0', 290 - 230, botCenterY + 14);
                            ctx.fillText('0', 290, botCenterY + 14);
                            ctx.fillText('\u03C0', 290 + 230, botCenterY + 14);
                            ctx.fillText('t', 545, botCenterY + 14);

                            // Kappa value
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u03BA(t=' + tVal.toFixed(2) + ') = ' + kVal.toFixed(3), 400, botTop + 5);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the formula \\(\\kappa = |f\'\'|/(1+(f\')^2)^{3/2}\\) to find the maximum curvature of \\(y = \\sin x\\) and the point(s) where it occurs.',
                    hint: 'We have \\(f\' = \\cos x\\), \\(f\'\' = -\\sin x\\). At what \\(x\\) is \\(|\\sin x|\\) maximized while \\(\\cos x = 0\\)?',
                    solution: '\\(\\kappa = |{-}\\sin x|/(1+\\cos^2 x)^{3/2}\\). At \\(x = \\pi/2\\): \\(\\kappa = 1/(1+0)^{3/2} = 1\\). At \\(x = 0\\): \\(\\kappa = 0\\). Maximum curvature is \\(\\kappa = 1\\) at \\(x = \\pi/2 + n\\pi\\).'
                },
                {
                    question: 'Compute \\(\\kappa\\) and \\(\\tau\\) for the curve \\(\\alpha(t) = (t, t^2, t^3)\\) at \\(t = 0\\).',
                    hint: 'Compute \\(\\alpha\', \\alpha\'\', \\alpha\'\'\'\\) at \\(t = 0\\), then use the cross-product formulas.',
                    solution: '\\(\\alpha\' = (1, 2t, 3t^2)\\), \\(\\alpha\'\' = (0, 2, 6t)\\), \\(\\alpha\'\'\' = (0, 0, 6)\\). At \\(t=0\\): \\(\\alpha\' = (1,0,0)\\), \\(\\alpha\'\' = (0,2,0)\\), \\(\\alpha\'\'\' = (0,0,6)\\). Then \\(\\alpha\' \\times \\alpha\'\' = (0,0,2)\\), \\(|\\alpha\' \\times \\alpha\'\'| = 2\\), \\(|\\alpha\'| = 1\\). So \\(\\kappa = 2/1 = 2\\). For torsion: \\((\\alpha\' \\times \\alpha\'\') \\cdot \\alpha\'\'\' = 12\\), \\(|\\alpha\' \\times \\alpha\'\'|^2 = 4\\), so \\(\\tau = 12/4 = 3\\).'
                },
                {
                    question: 'Show that for a curve \\(\\alpha(t) = (x(t), y(t))\\) in the plane, the signed curvature formula \\(\\kappa = (x\'y\'\' - x\'\'y\')/(x\'^2 + y\'^2)^{3/2}\\) reduces to \\(\\kappa = f\'\'/(1+(f\')^2)^{3/2}\\) when \\(x(t) = t\\) and \\(y(t) = f(t)\\).',
                    hint: 'Substitute \\(x = t\\), so \\(x\' = 1, x\'\' = 0\\).',
                    solution: 'With \\(x = t\\): \\(x\' = 1, x\'\' = 0, y\' = f\', y\'\' = f\'\'\\). Then \\(x\'y\'\' - x\'\'y\' = 1 \\cdot f\'\' - 0 \\cdot f\' = f\'\'\\), and \\((x\'^2 + y\'^2)^{3/2} = (1 + (f\')^2)^{3/2}\\). So \\(\\kappa = f\'\'/(1+(f\')^2)^{3/2}\\). \\(\\square\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to the Frenet-Serret Frame
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: The Frenet-Serret Frame</h2>

<p>We have now introduced the two fundamental scalar invariants of a space curve: the curvature \\(\\kappa(s) \\geq 0\\) and the torsion \\(\\tau(s)\\). Together with the three vectors \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\), they form the <strong>Frenet-Serret apparatus</strong>.</p>

<p>In the next chapter, we organize these into a single elegant system of ODEs, the <strong>Frenet-Serret formulas</strong>:</p>

\\[
\\begin{pmatrix} \\mathbf{T}' \\\\ \\mathbf{N}' \\\\ \\mathbf{B}' \\end{pmatrix}
=
\\begin{pmatrix} 0 & \\kappa & 0 \\\\ -\\kappa & 0 & \\tau \\\\ 0 & -\\tau & 0 \\end{pmatrix}
\\begin{pmatrix} \\mathbf{T} \\\\ \\mathbf{N} \\\\ \\mathbf{B} \\end{pmatrix}.
\\]

<p>This antisymmetric matrix encodes everything about how the frame rotates along the curve. We have already established two of the three equations:</p>
<ul>
    <li>\\(\\mathbf{T}' = \\kappa\\mathbf{N}\\) (Definition 1.3, Proposition 1.2)</li>
    <li>\\(\\mathbf{B}' = -\\tau\\mathbf{N}\\) (Definition 1.5)</li>
</ul>
<p>The third, \\(\\mathbf{N}' = -\\kappa\\mathbf{T} + \\tau\\mathbf{B}\\), will be derived in Chapter 2.</p>

<h3>The Fundamental Theorem of Curves</h3>

<p>The Frenet-Serret formulas lead to a remarkable existence and uniqueness result: given smooth functions \\(\\kappa(s) > 0\\) and \\(\\tau(s)\\), there is a unique curve (up to rigid motion) having these as its curvature and torsion. In other words, \\(\\kappa\\) and \\(\\tau\\) are a <em>complete</em> set of invariants: two curves with the same curvature and torsion functions differ only by a rotation and translation.</p>

<div class="env-block remark">
    <div class="env-title">Summary of This Chapter</div>
    <div class="env-body">
        <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #30363d;">
                <th style="text-align:left;padding:6px;">Quantity</th>
                <th style="text-align:left;padding:6px;">Symbol</th>
                <th style="text-align:left;padding:6px;">What it Measures</th>
                <th style="text-align:left;padding:6px;">Sign</th>
            </tr>
            <tr style="border-bottom:1px solid #30363d;">
                <td style="padding:6px;">Curvature (2D)</td>
                <td style="padding:6px;">\\(\\kappa\\)</td>
                <td style="padding:6px;">Rate of turning of tangent</td>
                <td style="padding:6px;">Signed (left/right)</td>
            </tr>
            <tr style="border-bottom:1px solid #30363d;">
                <td style="padding:6px;">Curvature (3D)</td>
                <td style="padding:6px;">\\(\\kappa\\)</td>
                <td style="padding:6px;">Rate of turning of tangent</td>
                <td style="padding:6px;">Always \\(\\geq 0\\)</td>
            </tr>
            <tr>
                <td style="padding:6px;">Torsion</td>
                <td style="padding:6px;">\\(\\tau\\)</td>
                <td style="padding:6px;">Rate of twisting out of osculating plane</td>
                <td style="padding:6px;">Signed (right/left screw)</td>
            </tr>
        </table>
    </div>
</div>

<p>With curvature and torsion in hand, we are ready to study the full Frenet-Serret frame and its applications in Chapter 2.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify that the Frenet-Serret matrix is antisymmetric (skew-symmetric). Why must it be?',
                    hint: 'The Frenet frame \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) is orthonormal. What constraint does differentiating \\(\\mathbf{T} \\cdot \\mathbf{N} = 0\\), etc., impose?',
                    solution: 'Since \\(\\{\\mathbf{T}, \\mathbf{N}, \\mathbf{B}\\}\\) is orthonormal, the matrix \\(Q(s) = [\\mathbf{T}|\\mathbf{N}|\\mathbf{B}]\\) satisfies \\(Q^T Q = I\\). Differentiating: \\(Q\'^T Q + Q^T Q\' = 0\\), so \\(A = Q^{-1}Q\' = Q^T Q\'\\) satisfies \\(A^T + A = 0\\), i.e., \\(A\\) is antisymmetric. An antisymmetric \\(3 \\times 3\\) matrix has exactly 3 free entries, matching our 3 parameters: \\(\\kappa, \\tau\\), and the zero entry \\((\\mathbf{T}\' \\cdot \\mathbf{B} = 0)\\).'
                },
                {
                    question: 'A catenary is given by \\(y = \\cosh x\\). Find its curvature as a function of \\(x\\) and determine the point of maximum curvature.',
                    hint: 'Use \\(\\kappa = |y\'\'|/(1+(y\')^2)^{3/2}\\). Note that \\(1 + \\sinh^2 x = \\cosh^2 x\\).',
                    solution: '\\(y\' = \\sinh x\\), \\(y\'\' = \\cosh x\\). Then \\(\\kappa = \\cosh x/(1+\\sinh^2 x)^{3/2} = \\cosh x/\\cosh^3 x = 1/\\cosh^2 x = \\operatorname{sech}^2 x\\). This is maximized at \\(x = 0\\) where \\(\\kappa = 1\\). The osculating circle at the vertex has radius \\(R = 1\\).'
                }
            ]
        }
    ]
});
