export const math_curriculum = [
  {
    subject: "Mathematics",

    sections: [

    {
      title: "Number and Numeration",

      topics: [

        {
          title: "Number Bases",

          material: {
            title: "Number Bases",
            content: `
<h2>Number Bases</h2>
<p>A number base determines how numbers are represented using digits.</p>

<h3>Common Number Systems</h3>
<ul>
<li>Base 10 – Decimal</li>
<li>Base 2 – Binary</li>
<li>Base 8 – Octal</li>
<li>Base 16 – Hexadecimal</li>
</ul>

<h3>Example</h3>
<p>1011₂ = (1×2³)+(0×2²)+(1×2¹)+(1×2⁰)=11</p>
`
          }
        },

        {
          title: "Fractions, Decimals and Percentages",

          material: {
            title: "Fractions",
            content: `
<h2>Fractions</h2>

<p>A fraction represents part of a whole.</p>

<ul>
<li>Numerator – top number</li>
<li>Denominator – bottom number</li>
</ul>

<h3>Example</h3>

<p>3/4 means three parts out of four equal parts.</p>

<h3>Decimal Conversion</h3>

<p>1/2 = 0.5</p>
<p>3/4 = 0.75</p>

<h3>Percentage</h3>

<p>50% = 1/2</p>
`
          }
        },

        {
          title: "Indices and Logarithms",

          material: {
            title: "Indices and Logarithms",
            content: `
<h2>Indices</h2>

<p>Indices show repeated multiplication.</p>

<p>Example:</p>

<p>2³ = 2 × 2 × 2 = 8</p>

<h3>Laws of Indices</h3>

<ul>
<li>aᵐ × aⁿ = aᵐ⁺ⁿ</li>
<li>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</li>
<li>(aᵐ)ⁿ = aᵐⁿ</li>
</ul>

<h2>Logarithms</h2>

<p>Logarithms are the inverse of exponents.</p>

<p>Example:</p>

<p>log₂(8) = 3</p>
`
          }
        },

        {
          title: "Surds",

          material: {
            title: "Surds",
            content: `
<h2>Surds</h2>

<p>A surd is a root that cannot be simplified into a whole number.</p>

<h3>Example</h3>

<p>√12 = √(4×3)</p>

<p>= √4 × √3</p>

<p>= 2√3</p>
`
          }
        },

        {
          title: "Sets",

          material: {
            title: "Sets",
            content: `
<h2>Sets</h2>

<p>A set is a collection of distinct objects.</p>

<p>Example:</p>

<p>A = {1,2,3,4}</p>

<h3>Operations</h3>

<ul>
<li>Union</li>
<li>Intersection</li>
<li>Complement</li>
</ul>
`
          }
        },

        {
          title: "Sequence and Series",

          material: {
            title: "Sequences and Series",
            content: `
<h2>Sequence</h2>

<p>A sequence is an ordered list of numbers.</p>

<p>Example:</p>

<p>2,4,6,8,10</p>

<h2>Series</h2>

<p>A series is the sum of numbers in a sequence.</p>

<p>2+4+6+8+10</p>
`
          }
        }

      ]
    },

    {
      title: "Algebraic Processes",

      topics: [

        {
          title: "Polynomials",

          material: {
            title: "Polynomials",
            content: `
<h2>Polynomials</h2>

<p>A polynomial is an expression containing variables and coefficients.</p>

<h3>Examples</h3>

<ul>
<li>3x</li>
<li>x² + 5x</li>
<li>x³ + 2x² + 4</li>
</ul>

<h3>Types</h3>

<ul>
<li>Monomial</li>
<li>Binomial</li>
<li>Trinomial</li>
</ul>
`
          }
        },

        {
          title: "Equations",

          material: {
            title: "Equations",
            content: `
<h2>Equations</h2>

<p>An equation shows that two expressions are equal.</p>

<p>Example:</p>

<p>x + 3 = 7</p>

<h3>Solution</h3>

<p>x = 4</p>
`
          }
        },

        {
          title: "Inequalities",

          material: {
            title: "Inequalities",
            content: `
<h2>Inequalities</h2>

<p>Inequalities compare values that are not equal.</p>

<ul>
<li>></li>
<li><</li>
<li>≥</li>
<li>≤</li>
</ul>

<p>Example:</p>

<p>x + 2 > 5</p>

<p>x > 3</p>
`
          }
        },

        {
          title: "Variation",

          material: {
            title: "Variation",
            content: `
<h2>Variation</h2>

<p>Variation describes how one quantity changes with another.</p>

<h3>Direct Variation</h3>

<p>y = kx</p>

<h3>Inverse Variation</h3>

<p>y = k/x</p>
`
          }
        },

        {
          title: "Matrices and Determinants",

          material: {
            title: "Matrices",
            content: `
<h2>Matrices</h2>

<p>A matrix is an arrangement of numbers in rows and columns.</p>

<h3>Example</h3>

<p>|1 2|</p>
<p>|3 4|</p>

<h3>Determinant</h3>

<p>(1×4) − (2×3) = -2</p>
`
          }
        }

      ]
    },

    {
      title: "Geometry and Trigonometry",

      topics: [

        {
          title: "Euclidean Geometry",

          material: {
            title: "Euclidean Geometry",
            content: `
<h2>Euclidean Geometry</h2>

<p>Euclidean geometry studies shapes, angles, and lines.</p>

<ul>
<li>Triangles</li>
<li>Angles</li>
<li>Lines</li>
</ul>
`
          }
        },

        {
          title: "Mensuration",

          material: {
            title: "Mensuration",
            content: `
<h2>Mensuration</h2>

<p>Mensuration deals with measurement of shapes.</p>

<h3>Area of Rectangle</h3>

<p>Area = length × width</p>

<h3>Area of Circle</h3>

<p>Area = πr²</p>
`
          }
        },

        {
          title: "Trigonometry",

          material: {
            title: "Trigonometry",
            content: `
<h2>Trigonometry</h2>

<p>Trigonometry studies the relationship between angles and sides.</p>

<ul>
<li>sin θ = opposite / hypotenuse</li>
<li>cos θ = adjacent / hypotenuse</li>
<li>tan θ = opposite / adjacent</li>
</ul>
`
          }
        }

      ]
    }

  ]
  }
]