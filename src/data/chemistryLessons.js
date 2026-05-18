const CHEMISTRY_LESSONS = {
  "class-10": [
    {
      id: "tn10-1",
      title: "Periodic Classification of Elements",
      duration: "45 mins",
      difficulty: "Beginner",
      content: {
        overview: "The classification of elements into a periodic table is a fundamental step in systematic chemistry. It allows scientists to predict the properties of elements based on their position. This chapter explores early attempts at classification and the development of the Modern Periodic Table.",
        keyPoints: [
          "Dobereiner's Triads: Groups of three elements with similar properties.",
          "Newlands' Law of Octaves: Every eighth element repeats properties like a musical scale.",
          "Mendeleev's Periodic Law: Physical and chemical properties are periodic functions of atomic masses.",
          "Modern Periodic Law: Properties are periodic functions of atomic numbers.",
          "Groups and Periods: The table consists of 18 vertical groups and 7 horizontal periods.",
          "Metallic Character: Decreases across a period and increases down a group.",
          "Valency: Remains constant down a group but varies across a period.",
          "Atomic Radius: Decreases from left to right across a period."
        ],
        sections: [
          {
            id: "dobereiner",
            title: "Dobereiner's Triads",
            body: "Johann Wolfgang Dobereiner, a German chemist, observed that certain groups of three elements (triads) had similar properties. When arranged in increasing order of atomic mass, the atomic mass of the middle element was roughly the average of the other two.",
            formula: "Average Mass = (Mass of Element 1 + Mass of Element 3) / 2",
            note: "Limitations: Only three triads were identified at that time."
          },
          {
            id: "mendeleev",
            title: "Mendeleev's Periodic Table",
            body: "Dmitri Mendeleev formulated the Periodic Law, stating that the properties of elements are periodic functions of their atomic masses. He left gaps for undiscovered elements like Gallium and Germanium, predicting their properties accurately.",
            formula: null,
            note: "Achievement: Systematic study of elements became possible for the first time."
          },
          {
            id: "modern-periodic",
            title: "Modern Periodic Table",
            body: "In 1913, Henry Moseley showed that atomic number is a more fundamental property than atomic mass. The modern table arranges elements in increasing order of atomic number, resolving anomalies like the position of Isotopes and Cobalt-Nickel order.",
            formula: "z = atomic number",
            note: "Noble gases occupy the 18th group as they are chemically inert."
          }
        ],
        examples: [
          {
            title: "Triad Example",
            description: "Lithium (6.9), Sodium (23.0), and Potassium (39.1) form a triad. Average of 6.9 and 39.1 is approx 23."
          },
          {
            title: "Trend Example",
            description: "In Period 2, Fluorine has a smaller atomic radius than Lithium due to higher nuclear charge pulling electrons closer."
          }
        ],
        summary: "Periodic classification organizes elements based on atomic number trends. The Modern Periodic Table is the standard tool for understanding chemical behavior across 118 elements.",
        quickFacts: [
          "Dmitri Mendeleev is known as the Father of the Periodic Table.",
          "Francium is the most metallic element in the table.",
          "The longest period in the table is Period 6 with 32 elements."
        ]
      }
    },
    {
      id: "tn10-2",
      title: "Acids, Bases and Salts",
      duration: "50 mins",
      difficulty: "Beginner",
      content: {
        overview: "Acids, bases, and salts are common chemical substances found in our daily lives, from lemons (citric acid) to soap (sodium hydroxide). This chapter defines their properties, the pH scale, and how they react to form neutral salts.",
        keyPoints: [
          "Acids: Substances that release H+ ions in aqueous solutions.",
          "Bases: Substances that release OH- ions in aqueous solutions.",
          "Indicators: Substances like litmus or phenolphthalein that change color in acids/bases.",
          "pH Scale: A measure of hydrogen ion concentration from 0 (acidic) to 14 (basic).",
          "Neutralization: Reaction between an acid and a base to form salt and water.",
          "Common Salts: Sodium chloride, Bleaching powder, and Baking soda.",
          "Water of Crystallization: Fixed number of water molecules in a salt crystal.",
          "Universal Indicator: Shows different colors at different pH values."
        ],
        sections: [
          {
            id: "acid-base-def",
            title: "Defining Acids and Bases",
            body: "According to Arrhenius, an acid is a substance that produces hydrogen ions (H+) in water, while a base produces hydroxide ions (OH-). Acids taste sour and turn blue litmus red. Bases taste bitter and turn red litmus blue.",
            formula: "HCl → H+ + Cl- | NaOH → Na+ + OH-",
            note: "Strong acids like H2SO4 ionize completely, while weak acids like Acetic acid ionize partially."
          },
          {
            id: "ph-scale",
            title: "The pH Scale",
            body: "The pH scale ranges from 0 to 14. A pH of 7 is neutral (pure water). Below 7 is acidic, and above 7 is basic. It is a logarithmic scale, meaning each unit represents a tenfold change in acidity.",
            formula: "pH = -log10[H+]",
            note: "The human body maintains a pH of 7.35 to 7.45 for survival."
          },
          {
            id: "neutralization",
            title: "Neutralization Reactions",
            body: "When an acid reacts with a base, they cancel each other out to form a salt and water. This is an exothermic reaction. The salt formed depends on the specific acid and base used.",
            formula: "Acid + Base → Salt + Water + Heat",
            note: "Antacids used for acidity in the stomach contain mild bases like Magnesium Hydroxide."
          }
        ],
        examples: [
          {
            title: "Salt Formation",
            description: "Hydrochloric acid (HCl) + Sodium hydroxide (NaOH) → Sodium chloride (NaCl) + Water (H2O)."
          },
          {
            title: "Real Life Acid",
            description: "Citric acid in citrus fruits gives them a sharp, sour taste."
          }
        ],
        summary: "Acids and bases are chemical opposites that react to form salts. The pH scale helps quantify their strength and is vital in biology and industry.",
        quickFacts: [
          "The pH of our stomach acid is around 2.0.",
          "Bases that dissolve in water are called Alkalis.",
          "Litmus paper is a natural indicator obtained from Lichens."
        ]
      }
    },
    {
      id: "tn10-3",
      title: "Types of Chemical Reactions",
      duration: "55 mins",
      difficulty: "Beginner",
      content: {
        overview: "Chemical reactions involve the breaking and making of bonds to transform substances into new products. Understanding these types—combination, decomposition, and displacement—is crucial for mastering chemical equations.",
        keyPoints: [
          "Combination Reaction: Two or more reactants form a single product.",
          "Decomposition Reaction: A single reactant breaks down into multiple products.",
          "Displacement Reaction: A more reactive element replaces a less reactive one.",
          "Double Displacement: Exchange of ions between two compounds.",
          "Redox Reactions: Simultaneous oxidation (gain of oxygen) and reduction (loss of oxygen).",
          "Exothermic: Reactions that release heat energy.",
          "Endothermic: Reactions that absorb heat energy.",
          "Precipitation: Double displacement reactions that form an insoluble solid."
        ],
        sections: [
          {
            id: "combination-decomp",
            title: "Combination and Decomposition",
            body: "In combination reactions, elements or compounds unite to form a new substance. In decomposition, energy in the form of heat, light, or electricity is used to split a complex molecule into simpler parts.",
            formula: "A + B → AB | AB → A + B",
            note: "Heating Calcium Carbonate to produce Lime is a thermal decomposition reaction."
          },
          {
            id: "redox",
            title: "Oxidation and Reduction (Redox)",
            body: "Oxidation is the addition of oxygen or removal of hydrogen. Reduction is the addition of hydrogen or removal of oxygen. In modern terms, oxidation is loss of electrons (OIL) and reduction is gain of electrons (RIG).",
            formula: "CuO + H2 → Cu + H2O",
            note: "Corrosion and rancidity are everyday examples of oxidation."
          },
          {
            id: "balancing",
            title: "Balanced Chemical Equations",
            body: "According to the Law of Conservation of Mass, the total mass of reactants must equal the total mass of products. Therefore, we must ensure the number of atoms of each element is the same on both sides.",
            formula: "2H2 + O2 → 2H2O",
            note: "Never change the chemical formula (subscripts) to balance an equation; only use coefficients."
          }
        ],
        examples: [
          {
            title: "Displacement",
            description: "Zinc (Zn) + Copper Sulphate (CuSO4) → Zinc Sulphate (ZnSO4) + Copper (Cu). Zinc is more reactive than Copper."
          },
          {
            title: "Decomposition",
            description: "Electrolysis of water splits H2O into Hydrogen (H2) and Oxygen (O2) gases."
          }
        ],
        summary: "Chemical reactions are categorized by how atoms rearrange. Mastering these patterns allows us to predict products and energy changes in any chemical process.",
        quickFacts: [
          "Photosynthesis is an endothermic reaction driven by sunlight.",
          "Respiration is an exothermic reaction providing energy to cells.",
          "Rusting of iron is a slow redox reaction."
        ]
      }
    },
    {
      id: "tn10-4",
      title: "Carbon and its Compounds",
      duration: "60 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Carbon is a versatile element that forms the basis of all life on Earth. Its unique ability to form long chains (catenation) and multiple bonds leads to millions of organic compounds.",
        keyPoints: [
          "Catenation: Carbon's unique ability to bond with other carbon atoms.",
          "Tetravalency: Carbon has four valence electrons, allowing four covalent bonds.",
          "Allotropes: Different physical forms like Diamond, Graphite, and Fullerenes.",
          "Hydrocarbons: Compounds consisting only of carbon and hydrogen.",
          "Functional Groups: Specific groups of atoms that determine chemical properties.",
          "Homologous Series: A group of compounds with the same functional group and similar properties.",
          "Saturated vs Unsaturated: Single bonds (Alkanes) vs double/triple bonds (Alkenes/Alkynes).",
          "Ethanol and Ethanoic Acid: Two commercially important carbon compounds."
        ],
        sections: [
          {
            id: "bonding",
            title: "Covalent Bonding in Carbon",
            body: "Carbon cannot easily gain or lose four electrons to achieve stability. Instead, it shares electrons with other atoms, forming covalent bonds. This sharing is the secret to the diversity of organic chemistry.",
            formula: "C (6) = 2, 4",
            note: "Methane (CH4) is the simplest covalent compound of carbon."
          },
          {
            id: "hydrocarbons",
            title: "Saturated and Unsaturated Hydrocarbons",
            body: "Saturated hydrocarbons (alkanes) contain only single C-C bonds and are relatively unreactive. Unsaturated hydrocarbons (alkenes and alkynes) contain double or triple bonds and are more chemically active.",
            formula: "Alkanes: CnH2n+2 | Alkenes: CnH2n",
            note: "The addition of hydrogen to vegetable oils (unsat) makes them fats (sat) like vanaspati."
          },
          {
            id: "functional-groups",
            title: "Functional Groups and Nomenclature",
            body: "Functional groups like -OH (Alcohols), -CHO (Aldehydes), and -COOH (Carboxylic acids) replace hydrogen in carbon chains. The IUPAC system provides a systematic way to name these complex structures.",
            formula: "R-OH, R-CHO, R-COOH",
            note: "Acetic acid, the main component of vinegar, contains the carboxyl group."
          }
        ],
        examples: [
          {
            title: "Allotropes",
            description: "Diamond is the hardest natural substance, while Graphite is a soft conductor of electricity."
          },
          {
            title: "Common Compound",
            description: "Ethanol (C2H5OH) is used as a solvent, medicine, and fuel additive."
          }
        ],
        summary: "Carbon's catenation and tetravalency allow it to form a vast array of compounds. Organic chemistry is essentially the study of these carbon-based structures.",
        quickFacts: [
          "Buckminsterfullerene (C60) is shaped like a soccer ball.",
          "Graphite is used as a lubricant due to its layered structure.",
          "Methane is the primary component of CNG and Biogas."
        ]
      }
    },
    {
      id: "tn10-5",
      title: "Atoms and Molecules",
      duration: "55 mins",
      difficulty: "Beginner",
      content: {
        overview: "This chapter bridges the gap between atomic theory and chemical calculations. It introduces the concept of the mole, atomic mass, and how these particles interact in fixed ratios.",
        keyPoints: [
          "Dalton's Atomic Theory: Atoms are indivisible building blocks of matter.",
          "Atomic Mass Unit (amu): Defined as 1/12th the mass of a Carbon-12 atom.",
          "Molecular Mass: The sum of atomic masses of all atoms in a molecule.",
          "Avogadro's Number: 6.022 x 10^23 particles per mole.",
          "Mole Concept: A mole represents a specific quantity of matter.",
          "Molar Mass: Mass of one mole of a substance in grams.",
          "Percentage Composition: Percentage of each element by mass in a compound.",
          "Empirical vs Molecular Formula: Simplest ratio vs actual number of atoms."
        ],
        sections: [
          {
            id: "dalton",
            title: "Dalton's Atomic Theory",
            body: "John Dalton proposed that all matter is composed of small, indivisible particles called atoms. He stated that atoms of the same element are identical, and chemical reactions involve the rearrangement of these atoms.",
            formula: null,
            note: "Modern science has shown that atoms are actually composed of subatomic particles."
          },
          {
            id: "mole-concept",
            title: "The Mole Concept",
            body: "The mole is the SI unit for the amount of substance. Just as a dozen means 12, a mole means 6.022 x 10^23 particles. This number allows us to convert between the micro-world of atoms and the macro-world of grams.",
            formula: "Number of Moles = Given Mass / Molar Mass",
            note: "One mole of any gas at STP occupies 22.4 Liters."
          },
          {
            id: "avogadro",
            title: "Avogadro's Law",
            body: "Equal volumes of all gases under the same conditions of temperature and pressure contain an equal number of molecules. This helped determine the atomicity of elements and the relationship between molecular mass and vapor density.",
            formula: "V ∝ n",
            note: "Avogadro's number is so large that a mole of marbles would cover the entire Earth."
          }
        ],
        examples: [
          {
            title: "Mass Calculation",
            description: "Calculate the mass of 0.5 moles of Water (H2O). Molar mass = 18g. Mass = 0.5 * 18 = 9g."
          },
          {
            title: "Molecular Mass",
            description: "Molecular mass of CO2 = (12 * 1) + (16 * 2) = 44 amu."
          }
        ],
        summary: "The mole concept is the central pillar of chemical calculations. Understanding atoms and molecules allows us to quantify chemical reactions precisely.",
        quickFacts: [
          "The term 'Mole' was introduced by Wilhelm Ostwald in 1896.",
          "1 mole of Hydrogen gas has the same number of molecules as 1 mole of Oxygen gas.",
          "Atomicity of Oxygen is 2 (O2), while Ozone is 3 (O3)."
        ]
      }
    }
  ],
  "class-11": [
    {
      id: "tn11-1",
      title: "Basic Concepts of Chemistry",
      duration: "50 mins",
      difficulty: "Beginner",
      content: {
        overview: "Chemistry is the study of matter and its changes. This chapter establishes the fundamental units of measurement, laws of chemical combination, and the mathematical framework for chemical calculations.",
        keyPoints: [
          "Classification of Matter: Pure substances vs Mixtures.",
          "Laws of Chemical Combination: Conservation of mass, constant proportions.",
          "Dalton's Atomic Theory: Historical foundation of atomic structure.",
          "Atomic and Molecular Masses: Relative scales based on C-12.",
          "Mole Concept and Molar Mass: The bridge between mass and particle count.",
          "Stoichiometry: Quantitative relationships in chemical reactions.",
          "Limiting Reactant: The reactant that is consumed first in a reaction.",
          "Concentration Terms: Molarity, Molality, and Mole Fraction."
        ],
        sections: [
          {
            id: "laws",
            title: "Laws of Chemical Combination",
            body: "Five basic laws govern chemical reactions: Law of Conservation of Mass, Law of Definite Proportions, Law of Multiple Proportions, Gay Lussac’s Law of Gaseous Volumes, and Avogadro's Law.",
            formula: "Reactant Mass = Product Mass",
            note: "These laws were established before the detailed structure of the atom was known."
          },
          {
            id: "stoichiometry",
            title: "Stoichiometry and Calculations",
            body: "Stoichiometry is the calculation of reactants and products in chemical reactions. It requires a balanced chemical equation and uses the coefficients to determine the molar ratios of substances involved.",
            formula: "n = w / M",
            note: "Always check for the limiting reactant in problems where multiple reactant amounts are given."
          },
          {
            id: "concentration",
            title: "Concentration of Solutions",
            body: "Solutions are described by the amount of solute in a solvent. Molarity (M) is moles per liter of solution, while Molality (m) is moles per kilogram of solvent. Mole fraction is the ratio of moles of a component to total moles.",
            formula: "M = n / V (liters) | m = n / mass (kg)",
            note: "Molarity changes with temperature, but molality does not."
          }
        ],
        examples: [
          {
            title: "Molarity Calculation",
            description: "Dissolving 40g of NaOH (1 mole) in 1L of water gives a 1.0 M solution."
          },
          {
            title: "Stoichiometry Example",
            description: "Burning 1 mole of Methane (CH4) requires 2 moles of Oxygen (O2) and produces 1 mole of CO2."
          }
        ],
        summary: "Fundamental concepts like the mole and concentration are the vocabulary of chemistry. Mastering these allows for accurate laboratory and industrial work.",
        quickFacts: [
          "Chemistry is often called the 'Central Science'.",
          "One mole of water is only about 18 milliliters.",
          "Standard temperature and pressure (STP) is 0°C and 1 bar."
        ]
      }
    },
    {
      id: "tn11-2",
      title: "Quantum Mechanical Model of Atom",
      duration: "65 mins",
      difficulty: "Advanced",
      content: {
        overview: "The classical model of the atom failed to explain atomic spectra and wave-particle duality. This chapter introduces the quantum mechanical model, describing electrons as wave functions in specific orbitals.",
        keyPoints: [
          "Dual Nature of Matter: De Broglie's hypothesis that matter has wave properties.",
          "Heisenberg's Uncertainty Principle: Impossible to know position and momentum simultaneously.",
          "Schrödinger Wave Equation: Foundation of quantum mechanics (Hψ = Eψ).",
          "Quantum Numbers: Principal (n), Azimuthal (l), Magnetic (ml), and Spin (ms).",
          "Orbitals: s, p, d, and f orbitals with distinct shapes (spherical, dumbbell).",
          "Aufbau Principle: Electrons fill lower energy orbitals first.",
          "Pauli's Exclusion Principle: No two electrons can have the same four quantum numbers.",
          "Hund's Rule: Orbitals are singly occupied before pairing occurs."
        ],
        sections: [
          {
            id: "wave-particle",
            title: "De Broglie and Uncertainty",
            body: "Louis de Broglie suggested that like light, matter also exhibits wave-particle duality. Werner Heisenberg then showed that measuring an electron's position with high precision inevitably makes its momentum uncertain.",
            formula: "λ = h / mv | Δx.Δp ≥ h / 4π",
            note: "These principles apply only to microscopic particles like electrons."
          },
          {
            id: "quantum-numbers",
            title: "Quantum Numbers and Orbitals",
            body: "Four quantum numbers uniquely describe the location and spin of an electron. The principal quantum number (n) determines size and energy, azimuthal (l) determines shape, magnetic (ml) determines orientation, and spin (ms) determines direction of spin.",
            formula: "l = 0 to (n-1)",
            note: "The 's' orbital is spherical, while 'p' orbitals are dumbbell-shaped along X, Y, and Z axes."
          },
          {
            id: "electronic-config",
            title: "Electronic Configuration",
            body: "Electrons occupy orbitals according to energy levels. The order is 1s, 2s, 2p, 3s, 3p, 4s, 3d, etc. Extra stability is associated with half-filled and fully-filled configurations (e.g., Chromium and Copper).",
            formula: "2n^2 (max electrons in shell)",
            note: "Potassium fills 4s before 3d because 4s has lower energy."
          }
        ],
        examples: [
          {
            title: "Configuration of Oxygen",
            description: "Oxygen (Z=8): 1s2 2s2 2p4."
          },
          {
            title: "Uncertainty Principle",
            description: "Trying to see an electron requires a high-energy photon, which kicks the electron and changes its velocity."
          }
        ],
        summary: "Quantum mechanics replaces definite orbits with probability clouds called orbitals. This model explains the periodic table's structure and chemical bonding.",
        quickFacts: [
          "The Schrödinger equation is the 'F=ma' of the quantum world.",
          "Electrons don't 'orbit' like planets; they exist as probability waves.",
          "An orbital can hold a maximum of 2 electrons with opposite spins."
        ]
      }
    },
    {
      id: "tn11-3",
      title: "Periodic Classification",
      duration: "45 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Expanding on Class 10 concepts, this chapter explores the deep connection between electronic configuration and periodic properties. It focuses on effective nuclear charge and its impact on atomic trends.",
        keyPoints: [
          "Modern Periodic Table: Based on the electronic configuration of elements.",
          "s, p, d, and f block elements: Classified by the orbital being filled.",
          "Effective Nuclear Charge (Zeff): The net positive charge experienced by an electron.",
          "Shielding Effect: Inner electrons repelling outer ones, reducing nuclear pull.",
          "Atomic and Ionic Radii: Trends across periods and groups.",
          "Ionization Enthalpy: Energy required to remove the outermost electron.",
          "Electron Gain Enthalpy: Energy change when an electron is added.",
          "Electronegativity: Ability of an atom in a molecule to attract shared electrons."
        ],
        sections: [
          {
            id: "blocks",
            title: "Blocks of the Periodic Table",
            body: "The table is divided into four blocks. s-block (Groups 1-2) are active metals. p-block (Groups 13-18) include metals, metalloids, and non-metals. d-block (Groups 3-12) are transition metals. f-block are inner transition metals.",
            formula: null,
            note: "Helium is an s-block element but placed in p-block due to its inert nature."
          },
          {
            id: "zeff-shielding",
            title: "Shielding and Effective Nuclear Charge",
            body: "The attractive force of the nucleus on valence electrons is decreased by the repulsion of inner-shell electrons. This is called the shielding or screening effect. The actual charge felt by the electron is Zeff.",
            formula: "Zeff = Z - σ (where σ is screening constant)",
            note: "Zeff increases across a period, causing the atomic size to shrink."
          },
          {
            id: "trends",
            title: "Periodic Trends in Properties",
            body: "Ionization enthalpy increases across a period as the atom gets smaller and nucleus holds electrons tighter. Electronegativity (Pauling scale) also increases across a period, with Fluorine being the most electronegative.",
            formula: "Ionization: X(g) + IE → X+(g) + e-",
            note: "Noble gases have zero or positive electron gain enthalpy because they are already stable."
          }
        ],
        examples: [
          {
            title: "Size Trend",
            description: "Sodium (Na) is larger than Chlorine (Cl) even though it has a smaller atomic number, because Cl has a higher Zeff."
          },
          {
            title: "Isoelectronic Species",
            description: "O2-, F-, Ne, Na+, Mg2+ all have 10 electrons. Mg2+ is the smallest because it has the most protons."
          }
        ],
        summary: "The periodic table is a map of electronic structure. Trends in size and energy determine how elements react and bond with each other.",
        quickFacts: [
          "Fluorine is the most electronegative element (4.0).",
          "Cesium is the least electronegative element (0.7).",
          "The first ionization energy of Nitrogen is higher than Oxygen due to half-filled p-orbitals."
        ]
      }
    },
    {
      id: "tn11-4",
      title: "Hydrogen",
      duration: "40 mins",
      difficulty: "Beginner",
      content: {
        overview: "Hydrogen is the most abundant element in the universe but has a unique position in the periodic table. This chapter covers its isotopes, preparation, and roles as a fuel and chemical reagent.",
        keyPoints: [
          "Unique Position: Shows properties of both Alkali metals and Halogens.",
          "Isotopes: Protium, Deuterium, and Tritium (Radioactive).",
          "Preparation: Bosch process and electrolysis of water.",
          "Hydrides: Ionic, Covalent, and Metallic hydrides.",
          "Hard and Soft Water: Presence of Mg and Ca salts.",
          "Heavy Water (D2O): Used as a moderator in nuclear reactors.",
          "Hydrogen Peroxide (H2O2): A powerful oxidizing and reducing agent.",
          "Hydrogen as a Fuel: High energy density and zero carbon emissions."
        ],
        sections: [
          {
            id: "isotopes",
            title: "Isotopes of Hydrogen",
            body: "Hydrogen has three isotopes. Protium (1H) has no neutron. Deuterium (2H or D) has one neutron and is used in heavy water. Tritium (3H or T) has two neutrons and is a beta-emitter with a half-life of 12.3 years.",
            formula: "1H1, 1H2, 1H3",
            note: "Protium constitutes 99.98% of natural hydrogen."
          },
          {
            id: "h2o2",
            title: "Hydrogen Peroxide (H2O2)",
            body: "H2O2 is an important industrial chemical. It has a non-planar 'open book' structure. It acts as both an oxidizing and reducing agent in both acidic and basic mediums.",
            formula: "2H2O2 → 2H2O + O2",
            note: "It must be stored in wax-lined glass or plastic vessels in the dark to prevent decomposition."
          },
          {
            id: "water-hardness",
            title: "Hard and Soft Water",
            body: "Hard water contains dissolved bicarbonates, chlorides, and sulphates of calcium and magnesium. It doesn't lather with soap. Temporary hardness can be removed by boiling, while permanent hardness requires chemical treatment like Ion-exchange.",
            formula: "Ca(HCO3)2 --heat--> CaCO3 + H2O + CO2",
            note: "Hard water is unsuitable for boilers as it forms scales, reducing efficiency."
          }
        ],
        examples: [
          {
            title: "Hydride Example",
            description: "Sodium Hydride (NaH) is an ionic hydride, while Methane (CH4) is a covalent hydride."
          },
          {
            title: "Fuel Cell",
            description: "In a Hydrogen fuel cell, H2 and O2 react to produce electricity and pure water."
          }
        ],
        summary: "Hydrogen is simple yet versatile. Its isotopes and compounds like water and H2O2 are indispensable to life and industry.",
        quickFacts: [
          "Hydrogen is the lightest known gas.",
          "Sun's energy comes from the fusion of hydrogen nuclei into helium.",
          "Liquid hydrogen is used as rocket fuel."
        ]
      }
    },
    {
      id: "tn11-5",
      title: "Gaseous State",
      duration: "55 mins",
      difficulty: "Intermediate",
      content: {
        overview: "The gaseous state is characterized by high compressibility and lack of fixed volume. This chapter describes the laws governing gas behavior and the transition from ideal to real gas behavior.",
        keyPoints: [
          "Gas Laws: Boyle's Law, Charles's Law, and Avogadro's Law.",
          "Ideal Gas Equation: PV = nRT.",
          "Dalton's Law of Partial Pressures: Total pressure is the sum of individual pressures.",
          "Graham's Law of Diffusion: Rate of diffusion is inversely proportional to square root of mass.",
          "Kinetic Molecular Theory: Explains gas properties based on particle motion.",
          "Real Gases: Deviate from ideal behavior at high pressure and low temperature.",
          "Van der Waals Equation: Corrects for molecular volume and intermolecular forces.",
          "Critical Phenomena: Critical temperature, pressure, and volume."
        ],
        sections: [
          {
            id: "ideal-gas",
            title: "The Ideal Gas Law",
            body: "By combining Boyle's, Charles's, and Avogadro's laws, we get the ideal gas equation. It describes the relationship between pressure (P), volume (V), temperature (T), and amount (n) of an ideal gas.",
            formula: "PV = nRT (R = 0.0821 L atm/mol K)",
            note: "Temperature must always be in Kelvin (K = °C + 273.15)."
          },
          {
            id: "kinetic-theory",
            title: "Kinetic Molecular Theory",
            body: "Gases consist of large numbers of tiny particles in constant random motion. The volume of particles is negligible compared to empty space, and there are no forces of attraction between them. Collisions are perfectly elastic.",
            formula: "KE = (3/2)kT",
            note: "The average kinetic energy depends only on the absolute temperature."
          },
          {
            id: "real-gases",
            title: "Real Gases and Van der Waals",
            body: "Real gases deviate from ideality because molecules do have volume and they do attract each other. Van der Waals introduced 'a' for attraction and 'b' for volume correction.",
            formula: "(P + an^2/V^2)(V - nb) = nRT",
            note: "Gases behave most ideally at low pressure and high temperature."
          }
        ],
        examples: [
          {
            title: "Charles's Law",
            description: "A balloon expands when taken out on a hot day because volume increases with temperature."
          },
          {
            title: "Diffusion",
            description: "Ammonia gas (NH3) diffuses faster than Hydrochloric acid gas (HCl) because it is lighter."
          }
        ],
        summary: "Gas laws provide a mathematical model for gas behavior. While ideal laws are simple, Van der Waals' corrections are needed for accurate real-world applications.",
        quickFacts: [
          "Absolute zero (0 K) is the theoretical temperature where all molecular motion stops.",
          "Critical temperature of CO2 is 31.1°C; above this, it cannot be liquefied by pressure alone.",
          "The atmospheric pressure at sea level is approx 101.3 kPa."
        ]
      }
    },
    {
      id: "tn11-6",
      title: "Thermodynamics",
      duration: "60 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Thermodynamics explores the transfer of energy as heat and work. It allows us to predict whether a chemical reaction will occur spontaneously and what energy changes will accompany it.",
        keyPoints: [
          "System and Surroundings: The part of the universe under study and everything else.",
          "State Functions: Properties like U, H, S, and G that depend only on the current state.",
          "First Law: Energy conservation (ΔU = q + w).",
          "Enthalpy (H): Heat content at constant pressure (ΔH = ΔU + PΔV).",
          "Hess’s Law: Enthalpy change is the same whether a reaction occurs in one step or many.",
          "Entropy (S): A measure of disorder or randomness in a system.",
          "Gibbs Free Energy (G): Predicts spontaneity (ΔG = ΔH - TΔS).",
          "Third Law: Entropy of a perfect crystal is zero at 0 Kelvin."
        ],
        sections: [
          {
            id: "internal-energy",
            title: "Internal Energy and First Law",
            body: "Internal energy (U) is the sum of all microscopic forms of energy in a system. The First Law states that ΔU equals the heat absorbed plus the work done on the system. Work of expansion is -PΔV.",
            formula: "ΔU = q - PΔV",
            note: "In an adiabatic process, q = 0, so ΔU = w."
          },
          {
            id: "hess-law",
            title: "Hess's Law of Constant Heat Summation",
            body: "Since enthalpy is a state function, the total enthalpy change for a chemical reaction is independent of the route taken. This allows us to calculate ΔH for reactions that are difficult to measure directly.",
            formula: "ΔH = ΔH1 + ΔH2 + ΔH3...",
            note: "Standard enthalpy of formation for elements in their stable state is zero."
          },
          {
            id: "spontaneity",
            title: "Gibbs Free Energy and Spontaneity",
            body: "A reaction is spontaneous if ΔG is negative. This happens if ΔH is negative (exothermic) and ΔS is positive (increasing disorder). Temperature can tip the balance for reactions where ΔH and ΔS have the same sign.",
            formula: "ΔG = ΔH - TΔS",
            note: "ΔG represents the maximum useful work that can be obtained from a reaction."
          }
        ],
        examples: [
          {
            title: "Exothermic Reaction",
            description: "Combustion of Methane: CH4 + 2O2 → CO2 + 2H2O (ΔH is negative)."
          },
          {
            title: "Entropy Increase",
            description: "Melting of ice: H2O(s) → H2O(l). The liquid state is more disordered than the solid."
          }
        ],
        summary: "Thermodynamics provides the laws for energy transformation. Enthalpy tells us about heat, while Gibbs Free Energy tells us about the possibility of a reaction.",
        quickFacts: [
          "Energy can't be created, but the 'quality' of energy degrades (Entropy increases).",
          "The universe is an isolated system, so its entropy is constantly increasing.",
          "Perpetual motion machines of the first kind are impossible because they violate the First Law."
        ]
      }
    },
    {
      id: "tn11-7",
      title: "Chemical Equilibrium",
      duration: "55 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Many chemical reactions do not go to completion but reach a state where reactants and products exist together in a fixed ratio. This chapter explores the dynamic nature of equilibrium and how to shift it.",
        keyPoints: [
          "Dynamic Equilibrium: Rate of forward reaction equals rate of backward reaction.",
          "Law of Mass Action: Rate is proportional to the product of active masses.",
          "Equilibrium Constant (Kc/Kp): Ratio of product concentrations to reactant concentrations.",
          "Homogeneous vs Heterogeneous: Reactants in same vs different phases.",
          "Le Chatelier’s Principle: System shifts to counteract any change in conditions.",
          "Effect of Concentration: Adding reactant shifts equilibrium toward products.",
          "Effect of Pressure: Increasing pressure shifts toward fewer gas moles.",
          "Effect of Temperature: Increasing T favors endothermic reactions."
        ],
        sections: [
          {
            id: "equilibrium-constant",
            title: "The Equilibrium Constant",
            body: "For a reaction aA + bB ⇌ cC + dD, the constant K is the product of concentrations of products divided by reactants, each raised to their stoichiometric coefficient. K depends only on temperature.",
            formula: "Kc = [C]^c [D]^d / [A]^a [B]^b",
            note: "Pure solids and liquids are excluded from the K expression as their concentration is constant."
          },
          {
            id: "le-chatelier",
            title: "Le Chatelier's Principle",
            body: "If a system at equilibrium is disturbed by changing concentration, pressure, or temperature, the system shifts in a direction that tends to undo the effect of the disturbance. This is widely used in industry.",
            formula: null,
            note: "Adding a catalyst does not change the position of equilibrium, only how fast it is reached."
          },
          {
            id: "industrial-apps",
            title: "Industrial Applications",
            body: "In the Haber process for Ammonia, high pressure and low temperature (optimized) are used to maximize yield according to Le Chatelier’s principle. Similarly, in the Contact process for H2SO4.",
            formula: "N2 + 3H2 ⇌ 2NH3 (Exothermic)",
            note: "Removing Ammonia as it forms shifts the equilibrium to the right, increasing production."
          }
        ],
        examples: [
          {
            title: "Pressure Effect",
            description: "For 2NO2 (brown) ⇌ N2O4 (colorless), increasing pressure favors N2O4 as it has fewer moles."
          },
          {
            title: "Temperature Effect",
            description: "Dissolving Salt in water is endothermic; heating the water increases solubility."
          }
        ],
        summary: "Equilibrium is a delicate balance in reversible reactions. Le Chatelier's principle is the key to controlling these reactions in the lab and factory.",
        quickFacts: [
          "At equilibrium, the concentrations of reactants and products become constant.",
          "Equilibrium can be reached from either the reactant or product side.",
          "The 'equilibrium' in a soda bottle is CO2 dissolved in water vs gas in the space above."
        ]
      }
    },
    {
      id: "tn11-8",
      title: "Solutions",
      duration: "50 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Solutions are homogeneous mixtures. This chapter focuses on liquid solutions, solubility, and colligative properties which depend solely on the number of solute particles.",
        keyPoints: [
          "Types of Solutions: Gas-liquid, liquid-liquid, solid-liquid.",
          "Solubility: Maximum amount of solute that can dissolve at a given T.",
          "Henry's Law: Solubility of a gas in a liquid is proportional to its partial pressure.",
          "Raoult's Law: Vapor pressure of a solution is proportional to the mole fraction of solvent.",
          "Ideal Solutions: Obey Raoult's law over the entire concentration range.",
          "Colligative Properties: Boiling point elevation, freezing point depression.",
          "Osmotic Pressure: Pressure required to stop osmosis.",
          "Van't Hoff Factor (i): Accounts for dissociation or association of solute."
        ],
        sections: [
          {
            id: "raoult-law",
            title: "Vapor Pressure and Raoult's Law",
            body: "For a solution of volatile liquids, the partial vapor pressure of each component is the product of its mole fraction and its pure state vapor pressure. Ideal solutions have ΔH_mix = 0 and ΔV_mix = 0.",
            formula: "Pa = Xa * P°a",
            note: "Non-ideal solutions show positive or negative deviations from Raoult's Law."
          },
          {
            id: "colligative",
            title: "Colligative Properties",
            body: "These properties depend only on the number of particles, not their nature. Adding a non-volatile solute lowers the vapor pressure, which leads to a higher boiling point and a lower freezing point.",
            formula: "ΔTb = Kb * m | ΔTf = Kf * m",
            note: "Antifreeze (ethylene glycol) added to car radiators lowers the freezing point of water."
          },
          {
            id: "osmosis",
            title: "Osmosis and Osmotic Pressure",
            body: "Osmosis is the flow of solvent through a semi-permeable membrane from low to high concentration. Osmotic pressure (π) is the pressure needed to stop this flow. It is used to determine molecular masses of polymers.",
            formula: "π = CRT",
            note: "Reverse osmosis (RO) is used for desalination of seawater by applying pressure greater than π."
          }
        ],
        examples: [
          {
            title: "Henry's Law",
            description: "Soft drink bottles are sealed under high pressure to increase CO2 solubility."
          },
          {
            title: "Elevation of B.P.",
            description: "Adding salt to water while cooking pasta makes the water boil at a higher temperature."
          }
        ],
        summary: "Solutions behave predictably based on solute concentration. Colligative properties are essential tools in medicine, engineering, and everyday life.",
        quickFacts: [
          "The 'i' factor for NaCl is 2, while for Glucose it is 1.",
          "Seawater is a complex solution containing many dissolved salts.",
          "Osmotic pressure can be used to lift water to the top of tall trees."
        ]
      }
    },
    {
      id: "tn11-9",
      title: "Hydrocarbons",
      duration: "65 mins",
      difficulty: "Beginner",
      content: {
        overview: "Hydrocarbons are the parent organic compounds. This chapter covers the structure, nomenclature, and reactions of Alkanes, Alkenes, Alkynes, and Aromatic hydrocarbons like Benzene.",
        keyPoints: [
          "Classification: Acyclic (Aliphatic) and Cyclic hydrocarbons.",
          "Alkanes: Saturated, show substitution reactions (e.g., Chlorination).",
          "Alkenes: Unsaturated with C=C, show addition reactions.",
          "Alkynes: Unsaturated with C≡C, show addition and acidic character.",
          "Conformations: Different spatial arrangements due to rotation around C-C bond.",
          "Aromaticity: Huckel's (4n+2) rule for stability.",
          "Benzene: Hexagonal ring with delocalized pi electrons.",
          "Directive Influence: How existing groups on benzene direct new substituents."
        ],
        sections: [
          {
            id: "alkanes-alkenes",
            title: "Alkanes and Alkenes",
            body: "Alkanes (Paraffins) are stable and undergo free radical substitution. Alkenes (Olefins) have a double bond and undergo electrophilic addition, such as hydrogenation or halogenation.",
            formula: "CH4 + Cl2 --hv--> CH3Cl + HCl",
            note: "Markownikoff's rule predicts the product in addition of HX to asymmetric alkenes."
          },
          {
            id: "alkynes-acidic",
            title: "Alkynes and their Acidity",
            body: "Alkynes contain a triple bond. Terminal alkynes (like Ethyne) are slightly acidic because the s-character of the C-H bond is high (50%), making the carbon more electronegative.",
            formula: "CH≡CH + Na → CH≡CNa + 1/2H2",
            note: "Alkynes can be converted to alkanes by controlled hydrogenation using Lindlar's catalyst."
          },
          {
            id: "benzene",
            title: "Aromatic Hydrocarbons",
            body: "Benzene (C6H6) is exceptionally stable due to resonance. It undergoes electrophilic substitution (nitration, sulphonation, halogenation) rather than addition, to preserve its aromaticity.",
            formula: "C6H6 + HNO3 --H2SO4--> C6H5NO2 + H2O",
            note: "Friedel-Crafts alkylation is used to attach alkyl groups to the benzene ring."
          }
        ],
        examples: [
          {
            title: "Conformations",
            description: "Ethane has staggered (more stable) and eclipsed (less stable) conformations."
          },
          {
            title: "Addition Reaction",
            description: "Ethylene + Br2 → 1,2-Dibromoethane. This reaction decolors bromine water (test for unsaturation)."
          }
        ],
        summary: "Hydrocarbons are the building blocks of organic chemistry. Their reactions—substitution for alkanes/aromatics and addition for alkenes/alkynes—are fundamental.",
        quickFacts: [
          "LPG is primarily a mixture of Propane and Butane.",
          "Acetylene (Ethyne) is used in oxy-acetylene welding torches.",
          "Michael Faraday discovered Benzene in 1825."
        ]
      }
    },
    {
      id: "tn11-10",
      title: "Alkali and Alkaline Earth Metals",
      duration: "50 mins",
      difficulty: "Beginner",
      content: {
        overview: "The s-block elements are highly reactive metals. Group 1 (Alkali) and Group 2 (Alkaline Earth) metals show distinct trends in reactivity, solubility, and biological importance.",
        keyPoints: [
          "Group 1: Lithium, Sodium, Potassium, etc. (ns1).",
          "Group 2: Beryllium, Magnesium, Calcium, etc. (ns2).",
          "Reactivity: Increases down the group as ionization energy decreases.",
          "Flame Colors: Characteristic colors due to electron excitation (Na-Yellow, K-Violet).",
          "Hydration Enthalpy: Smaller ions have higher hydration energy (Li+ > Cs+).",
          "Diagonal Relationship: Similarity between Li-Mg and Be-Al.",
          "Compounds: Oxides, Hydroxides, Carbonates, and Sulphates.",
          "Biological Role: Na/K pump for nerve signals, Ca for bones and teeth."
        ],
        sections: [
          {
            id: "alkali-metals",
            title: "Alkali Metals (Group 1)",
            body: "These metals have one valence electron and are the most electropositive elements. They react vigorously with water to form hydroxides and hydrogen gas. They are stored in kerosene to prevent oxidation.",
            formula: "2Na + 2H2O → 2NaOH + H2",
            note: "Lithium shows anomalous behavior due to its exceptionally small size."
          },
          {
            id: "alkaline-earth",
            title: "Alkaline Earth Metals (Group 2)",
            body: "These have two valence electrons and are harder and less reactive than Alkali metals. Their oxides and hydroxides are less basic. Magnesium and Calcium are very abundant in nature.",
            formula: "Mg + H2O (hot) → Mg(OH)2 + H2",
            note: "Magnesium is a key component of chlorophyll in plants."
          },
          {
            id: "industrial-compounds",
            title: "Important Compounds",
            body: "Sodium Carbonate (Washing Soda) and Sodium Bicarbonate (Baking Soda) are produced via the Solvay process. Calcium Carbonate (Limestone) and Plaster of Paris are vital in construction.",
            formula: "CaSO4.1/2H2O (Plaster of Paris)",
            note: "Plaster of Paris hardens on mixing with water to form Gypsum."
          }
        ],
        examples: [
          {
            title: "Flame Test",
            description: "Sodium gives a persistent golden yellow flame, while Calcium gives a brick red flame."
          },
          {
            title: "Diagonal Relationship",
            description: "Both Lithium and Magnesium form nitrides when heated in air (Li3N, Mg3N2)."
          }
        ],
        summary: "The s-block metals are essential for life and industry. Their high reactivity dictates their chemistry and how they are found in nature.",
        quickFacts: [
          "Cesium is used in atomic clocks and photoelectric cells.",
          "Dead Sea has high concentrations of Magnesium and Potassium salts.",
          "Beryllium is used in making X-ray tube windows as it is transparent to X-rays."
        ]
      }
    }
  ],
  "class-12": [
    {
      id: "tn12-1",
      title: "Metallurgy",
      duration: "45 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Metallurgy is the science of extracting metals from their ores and refining them for use. It involves various physical and chemical processes like concentration, reduction, and electrolytic refining.",
        keyPoints: [
          "Minerals and Ores: Minerals containing high metal content are ores.",
          "Concentration: Removing impurities (gangue) via gravity, froth flotation, or leaching.",
          "Roasting and Calcination: Converting ores to oxides using heat.",
          "Smelting: Reduction of metal oxide using carbon or other reducing agents.",
          "Ellingham Diagram: Predicts the feasibility of reduction reactions.",
          "Refining: Purification via distillation, liquation, or electrolysis.",
          "Zone Refining: Used for producing ultra-pure semiconductors like Silicon.",
          "Thermite Process: Reduction of metal oxides using Aluminum powder."
        ],
        sections: [
          {
            id: "concentration",
            title: "Concentration of Ores",
            body: "Froth flotation is used for sulphide ores like Zinc blende. The ore is mixed with oil and water; the ore particles stick to the froth while impurities sink. Leaching uses chemical solvents like Cyanide for Gold extraction.",
            formula: null,
            note: "Magnetic separation is used for ores like Wolframite which are magnetic."
          },
          {
            id: "ellingham",
            title: "Thermodynamics of Metallurgy",
            body: "The Ellingham diagram plots ΔG° vs T. It shows which reducing agent is effective at what temperature. A metal can reduce the oxide of any other metal that appears above it in the diagram.",
            formula: "ΔG = ΔH - TΔS",
            note: "Carbon is a better reducing agent than CO at high temperatures."
          },
          {
            id: "refining-tech",
            title: "Refining Techniques",
            body: "In electrolytic refining (e.g., Copper), the impure metal is the anode and pure metal is the cathode. In Mond's process, Nickel is purified by forming a volatile carbonyl compound.",
            formula: "Ni + 4CO → Ni(CO)4 → Ni + 4CO",
            note: "Vapor phase refining requires the metal to form a volatile compound that decomposes easily."
          }
        ],
        examples: [
          {
            title: "Froth Flotation",
            description: "Used to separate Galena (PbS) from rocky impurities."
          },
          {
            title: "Aluminothermy",
            description: "Fe2O3 + 2Al → 2Fe + Al2O3. The heat produced melts the iron, used for welding rails."
          }
        ],
        summary: "Extraction of metals requires a combination of physical separation and chemical reduction. Choice of method depends on the reactivity of the metal and the nature of the ore.",
        quickFacts: [
          "Aluminum is the most abundant metal in the Earth's crust.",
          "Iron was extracted in ancient India using charcoal in small furnaces.",
          "Bauxite is the primary ore for Aluminum extraction."
        ]
      }
    },
    {
      id: "tn12-2",
      title: "p-Block Elements",
      duration: "65 mins",
      difficulty: "Advanced",
      content: {
        overview: "The p-block is unique as it contains metals, metalloids, and non-metals. This chapter covers Groups 13 to 18, focusing on their diverse chemistry, bonding patterns, and important industrial gases.",
        keyPoints: [
          "Inert Pair Effect: Reluctance of s-electrons to participate in bonding in heavier elements.",
          "Group 13 (Boron family): Boron, Aluminum, etc. Boranes and Alum.",
          "Group 14 (Carbon family): Silicates, Zeolites, and Allotropes.",
          "Group 15 (Nitrogen family): Ammonia, Nitric acid, Phosphine.",
          "Group 16 (Chalcogens): Oxygen, Sulphur, Sulphuric acid.",
          "Group 17 (Halogens): Chlorine, Fluorine, Interhalogen compounds.",
          "Group 18 (Noble Gases): Xenon fluorides and their structures.",
          "Allotropy: Diverse forms of P, S, and C."
        ],
        sections: [
          {
            id: "inert-pair",
            title: "Inert Pair Effect",
            body: "In heavier p-block elements (like Pb, Tl, Bi), the ns2 electrons are held tightly by the nucleus and don't easily hybridize. This leads to a stable oxidation state that is 2 units lower than the group valence.",
            formula: null,
            note: "Pb(+2) is more stable than Pb(+4) due to this effect."
          },
          {
            id: "oxoacids",
            title: "Oxoacids of Phosphorus and Sulphur",
            body: "Phosphorus forms acids like H3PO3 (basic) and H3PO4. Sulphur forms H2SO4 (King of Chemicals) and H2S2O7 (Oleum). These acids have complex structures with P=O and S=O bonds.",
            formula: "P4O10 + 6H2O → 4H3PO4",
            note: "H2SO4 is a strong dehydrating agent; it can char sugar by removing water."
          },
          {
            id: "halogens",
            title: "Halogens and Interhalogens",
            body: "Halogens are highly reactive non-metals. They can react with each other to form interhalogen compounds (XY, XY3, XY5, XY7). Chlorine is used as a bleach and disinfectant.",
            formula: "I2 + 3Cl2 → 2ICl3",
            note: "Interhalogen compounds are generally more reactive than pure halogens."
          }
        ],
        examples: [
          {
            title: "Silicates",
            description: "Glass and cement are primarily made of silicates."
          },
          {
            title: "Noble Gas Compound",
            description: "XeF4 (Xenon tetrafluoride) has a square planar structure."
          }
        ],
        summary: "The p-block showcases the transition from metallic to non-metallic behavior. Its compounds are the backbone of the chemical industry.",
        quickFacts: [
          "Helium has the lowest boiling point of any element.",
          "White Phosphorus is stored under water because it catches fire in air.",
          "Fluorine is the strongest oxidizing agent."
        ]
      }
    },
    {
      id: "tn12-3",
      title: "d and f Block Elements",
      duration: "60 mins",
      difficulty: "Advanced",
      content: {
        overview: "Transition (d-block) and inner transition (f-block) elements are known for their colorful compounds, variable oxidation states, and catalytic properties. This chapter explores their unique electronic structures.",
        keyPoints: [
          "Transition Metals: Elements with partially filled d-orbitals.",
          "Variable Oxidation States: Ability to lose different numbers of electrons (e.g., Mn from +2 to +7).",
          "Color of Ions: Due to d-d transitions and light absorption.",
          "Magnetic Properties: Paramagnetism due to unpaired electrons.",
          "Catalytic Activity: Metals like Pt, Pd, and Fe serve as catalysts.",
          "Lanthanoid Contraction: Steady decrease in size due to poor shielding of 4f electrons.",
          "Actinoids: Radioactive elements with complex chemistry.",
          "Potassium Permanganate (KMnO4): A strong laboratory oxidant."
        ],
        sections: [
          {
            id: "d-properties",
            title: "General Properties of d-block",
            body: "Transition metals have high melting points and form alloys easily. They show variable valency because the energy difference between ns and (n-1)d orbitals is very small. Most transition metal ions are colored.",
            formula: "μ = √[n(n+2)] Bohr Magnetons",
            note: "Scandium (+3) and Zinc (+2) ions are colorless as they have no d-d transition possible."
          },
          {
            id: "lanthanoid-contraction",
            title: "Lanthanoid Contraction",
            body: "The 4f electrons provide very poor shielding. As the nuclear charge increases across the series, the atomic and ionic radii decrease significantly. This makes the properties of 4d and 5d series elements very similar.",
            formula: null,
            note: "This explains why Zirconium (4d) and Hafnium (5d) have nearly identical sizes."
          },
          {
            id: "kmno4",
            title: "Potassium Permanganate (KMnO4)",
            body: "KMnO4 is prepared from pyrolusite ore. It is a powerful oxidizing agent in acidic, neutral, and basic mediums. It is used in volumetric analysis (permanganometry).",
            formula: "MnO4- + 8H+ + 5e- → Mn2+ + 4H2O",
            note: "In acidic medium, it changes from deep purple to colorless."
          }
        ],
        examples: [
          {
            title: "Catalyst Example",
            description: "Iron is used in the Haber process; Vanadium Pentoxide (V2O5) in the Contact process."
          },
          {
            title: "Magnetic Moment",
            description: "Fe3+ has 5 unpaired electrons; its magnetic moment is approx 5.92 BM."
          }
        ],
        summary: "d and f block elements are the masters of coordination and catalysis. Their unique electronic configurations lead to complex magnetic and optical properties.",
        quickFacts: [
          "Tungsten has the highest melting point of all metals.",
          "Mercury is the only transition metal that is liquid at room temperature.",
          "Gadolinium is used in MRI contrast agents."
        ]
      }
    },
    {
      id: "tn12-4",
      title: "Coordination Chemistry",
      duration: "65 mins",
      difficulty: "Advanced",
      content: {
        overview: "Coordination compounds consist of a central metal atom bonded to molecules or ions called ligands. This chapter covers nomenclature, isomerism, and theories of bonding like Crystal Field Theory.",
        keyPoints: [
          "Ligands: Ions or molecules that donate electron pairs (Mono, Bi, Polydentate).",
          "Coordination Number: Total number of bonds from ligands to metal.",
          "IUPAC Nomenclature: Systematic naming of complex ions.",
          "Werner's Theory: Primary and secondary valencies.",
          "Valence Bond Theory (VBT): Explains hybridization and geometry.",
          "Crystal Field Theory (CFT): Explains color and splitting of d-orbitals.",
          "Isomerism: Structural (linkage, ionization) and Stereo (geometrical, optical).",
          "Applications: EDTA for water hardness, Chlorophyll, and Hemoglobin."
        ],
        sections: [
          {
            id: "cft",
            title: "Crystal Field Theory (CFT)",
            body: "CFT treats the interaction between metal and ligands as purely electrostatic. In an octahedral field, the five d-orbitals split into two sets: t2g (lower energy) and eg (higher energy). The energy gap is Δo.",
            formula: "CFSE = [-0.4n(t2g) + 0.6n(eg)]Δo",
            note: "Strong field ligands like CN- cause large splitting, resulting in low-spin complexes."
          },
          {
            id: "isomerism-coord",
            title: "Isomerism in Complexes",
            body: "Geometrical isomerism (cis/trans) is common in square planar and octahedral complexes. Optical isomerism occurs in chiral complexes that lack a plane of symmetry, often involving bidentate ligands.",
            formula: "[Co(en)3]3+",
            note: "Fac-mer isomerism is a special type of geometrical isomerism in MA3B3 complexes."
          },
          {
            id: "bonding-vbt",
            title: "Valence Bond Theory (VBT)",
            body: "VBT uses hybridization to explain geometry. sp3 is tetrahedral, dsp2 is square planar, and d2sp3/sp3d2 are octahedral. It helps predict magnetic behavior (inner vs outer orbital complexes).",
            formula: null,
            note: "[Ni(CN)4]2- is square planar and diamagnetic according to VBT."
          }
        ],
        examples: [
          {
            title: "Nomenclature",
            description: "[Co(NH3)6]Cl3 is Hexaamminecobalt(III) chloride."
          },
          {
            title: "Chelate Effect",
            description: "Complexes with ring-forming ligands (chelates) like EDTA are exceptionally stable."
          }
        ],
        summary: "Coordination chemistry is the study of metal-ligand interactions. It explains why some solutions are colorful and how metals function in biological systems.",
        quickFacts: [
          "Chlorophyll is a coordination compound of Magnesium.",
          "Hemoglobin contains Iron in a coordination environment.",
          "Cis-platin is a powerful anti-cancer drug."
        ]
      }
    },
    {
      id: "tn12-5",
      title: "Electrochemistry",
      duration: "60 mins",
      difficulty: "Advanced",
      content: {
        overview: "Electrochemistry deals with the conversion between chemical energy and electrical energy. It covers galvanic cells, electrolytic cells, and the quantitative laws of electrolysis.",
        keyPoints: [
          "Galvanic Cells: Spontaneous reactions producing electricity (e.g., Daniel cell).",
          "Standard Electrode Potential (E°): Measure of oxidizing/reducing power.",
          "Nernst Equation: Relates cell potential to concentration and temperature.",
          "Kohlrausch's Law: Independent migration of ions in electrolytes.",
          "Faraday's Laws of Electrolysis: Amount of substance is proportional to charge passed.",
          "Conductance: Specific, Molar, and Equivalent conductance.",
          "Batteries: Primary (Dry cell) and Secondary (Lead storage, Li-ion).",
          "Corrosion: Electrochemical process of metal deterioration."
        ],
        sections: [
          {
            id: "nernst",
            title: "The Nernst Equation",
            body: "The Nernst equation allows us to calculate the electrode potential under non-standard conditions. It shows that potential depends on the concentration of ions and the number of electrons transferred.",
            formula: "E = E° - (RT/nF)lnQ",
            note: "At equilibrium, E_cell = 0 and Q = K_eq."
          },
          {
            id: "faraday-laws",
            title: "Faraday's Laws of Electrolysis",
            body: "First Law: Mass (w) of substance deposited is proportional to charge (Q). Second Law: For same charge, masses deposited are proportional to their chemical equivalent weights.",
            formula: "w = ZIt | w1/E1 = w2/E2",
            note: "1 Faraday (96500 C) is the charge of one mole of electrons."
          },
          {
            id: "corrosion",
            title: "Mechanism of Corrosion (Rusting)",
            body: "Rusting is an electrochemical phenomenon. Iron acts as an anode, and a spot with oxygen acts as a cathode. H2CO3 from moisture serves as the electrolyte. Iron is oxidized to Fe2+, then to hydrated Fe2O3.",
            formula: "4Fe + 3O2 + xH2O → 2Fe2O3.xH2O",
            note: "Galvanization (coating with Zinc) protects iron by sacrificial protection."
          }
        ],
        examples: [
          {
            title: "Standard Cell",
            description: "Zn | Zn2+(1M) || Cu2+(1M) | Cu. The E° of this cell is 1.10 Volts."
          },
          {
            title: "Fuel Cell",
            description: "Hydrogen-Oxygen fuel cells are used in spacecraft for power and water."
          }
        ],
        summary: "Electrochemistry is the foundation of modern power (batteries) and material science (electroplating). The Nernst equation is the key to understanding cell thermodynamics.",
        quickFacts: [
          "Lithium-ion batteries are preferred for electronics due to their high energy density.",
          "A 'salt bridge' completes the circuit and maintains electrical neutrality.",
          "Standard Hydrogen Electrode (SHE) is assigned a potential of 0.00 V."
        ]
      }
    },
    {
      id: "tn12-6",
      title: "Chemical Kinetics",
      duration: "55 mins",
      difficulty: "Advanced",
      content: {
        overview: "Chemical kinetics studies the rates of reactions and the factors that influence them. It allows us to determine the mechanism of a reaction and predict how fast it will proceed.",
        keyPoints: [
          "Rate of Reaction: Change in concentration per unit time.",
          "Order of Reaction: Sum of powers of concentrations in the rate law.",
          "Molecularity: Number of reacting species in an elementary step.",
          "Integrated Rate Equations: For zero and first-order reactions.",
          "Half-life (t1/2): Time taken for concentration to reduce by half.",
          "Arrhenius Equation: Dependence of rate on temperature and activation energy.",
          "Collision Theory: Reactions occur when particles collide with sufficient energy.",
          "Pseudo First Order: Reactions that appear first-order but involve multiple reactants."
        ],
        sections: [
          {
            id: "order-molecularity",
            title: "Order vs Molecularity",
            body: "Order is an experimental quantity that can be zero or fractional. Molecularity is a theoretical concept for elementary reactions and must be a whole number. For complex reactions, the slowest step determines the rate.",
            formula: "Rate = k[A]^x [B]^y (Order = x + y)",
            note: "Zero-order reactions proceed at a constant rate regardless of concentration."
          },
          {
            id: "integrated-rate",
            title: "Integrated Rate Laws",
            body: "For a first-order reaction, the log of concentration decreases linearly with time. The half-life of a first-order reaction is independent of the initial concentration.",
            formula: "k = (2.303/t)log([Ao]/[At]) | t1/2 = 0.693/k",
            note: "Radioactive decay always follows first-order kinetics."
          },
          {
            id: "arrhenius",
            title: "Temperature and Rate (Arrhenius)",
            body: "Reaction rate increases exponentially with temperature. Svante Arrhenius showed that this is because a higher fraction of molecules gain enough 'Activation Energy' (Ea) to overcome the barrier.",
            formula: "k = A * e^(-Ea/RT)",
            note: "Roughly, for every 10°C rise in temperature, the rate of reaction doubles."
          }
        ],
        examples: [
          {
            title: "First Order",
            description: "Decomposition of N2O5 and all nuclear disintegrations."
          },
          {
            title: "Pseudo First Order",
            description: "Acid-catalyzed hydrolysis of Ethyl acetate, where water is in large excess."
          }
        ],
        summary: "Kinetics tells us 'how fast'. The rate law and Arrhenius equation are essential for controlling chemical processes in industry.",
        quickFacts: [
          "Catalysts lower the activation energy, speeding up the reaction.",
          "Enzymes are biological catalysts that work with high specificity.",
          "Photochemical reactions depend on light intensity, not just temperature."
        ]
      }
    },
    {
      id: "tn12-7",
      title: "Surface Chemistry",
      duration: "50 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Surface chemistry deals with phenomena that occur at interfaces. It covers adsorption, catalysis, and the fascinating world of colloids like milk, fog, and blood.",
        keyPoints: [
          "Adsorption: Accumulation of molecular species at the surface (not bulk).",
          "Physisorption vs Chemisorption: Weak Van der Waals vs strong chemical bonds.",
          "Adsorption Isotherms: Freundlich isotherm relating adsorption to pressure.",
          "Catalysis: Homogeneous, Heterogeneous, and Enzyme catalysis.",
          "Colloids: Heterogeneous systems with particle size 1-1000 nm.",
          "Tyndall Effect: Scattering of light by colloidal particles.",
          "Brownian Movement: Zig-zag motion of particles providing stability.",
          "Emulsions: Liquid-liquid colloidal systems (Oil in water vs Water in oil)."
        ],
        sections: [
          {
            id: "adsorption",
            title: "Adsorption Phenomena",
            body: "Adsorption is an exothermic process. Physisorption is reversible and forms multi-layers, while Chemisorption is irreversible and forms a single layer. Adsorption decreases with increasing temperature.",
            formula: "x/m = k * P^(1/n)",
            note: "Activated charcoal is used in gas masks to adsorb poisonous gases."
          },
          {
            id: "colloids-types",
            title: "Classification of Colloids",
            body: "Based on the state of dispersed phase and medium, we have Sols (solid in liquid), Aerosols (liquid/solid in gas), Foams (gas in liquid), and Emulsions (liquid in liquid).",
            formula: null,
            note: "Milk is an emulsion of liquid fat dispersed in water."
          },
          {
            id: "colloid-stability",
            title: "Stability and Coagulation",
            body: "Colloidal particles carry a charge (positive or negative), which prevents them from clumping. Coagulation is the precipitation of colloids by adding an electrolyte (Hardy-Schulze Rule).",
            formula: null,
            note: "Alum is used to purify water by coagulating suspended clay particles."
          }
        ],
        examples: [
          {
            title: "Tyndall Effect",
            description: "A beam of sunlight becomes visible when it passes through a dusty room."
          },
          {
            title: "Enzyme Catalysis",
            description: "Invertase converts sucrose into glucose and fructose."
          }
        ],
        summary: "Interfaces have unique properties. Surface chemistry explains everything from how soap cleans to how enzymes power our metabolism.",
        quickFacts: [
          "The blue color of the sky is due to light scattering by dust and water particles (Colloids).",
          "Deltas are formed at river mouths by coagulation of river clay by sea electrolytes.",
          "Silica gel is used to remove moisture from air via adsorption."
        ]
      }
    },
    {
      id: "tn12-8",
      title: "Organic Nitrogen Compounds",
      duration: "60 mins",
      difficulty: "Advanced",
      content: {
        overview: "Nitrogen-containing compounds like Amines and Cyanides are vital in dyes, drugs, and biology. This chapter covers their synthesis, basicity, and the important Diazonium salts.",
        keyPoints: [
          "Amines: Derivatives of ammonia (Primary, Secondary, Tertiary).",
          "Basicity of Amines: Influenced by +I effect, solvation, and steric hindrance.",
          "Gabriel Phthalimide Synthesis: For producing pure primary amines.",
          "Hofmann Bromamide Degradation: Reduces carbon chain length by one.",
          "Carbylamine Reaction: Test for primary amines using chloroform.",
          "Diazotization: Formation of Benzene Diazonium Chloride from Aniline.",
          "Coupling Reactions: Formation of colorful Azo dyes.",
          "Nitrocompounds: Reduction pathways in different mediums."
        ],
        sections: [
          {
            id: "amine-basicity",
            title: "Basicity of Amines",
            body: "Amines are basic due to the lone pair on Nitrogen. In the gaseous phase, the order is 3° > 2° > 1°. In aqueous solution, the order changes to 2° > 1° > 3° (for methyl amines) due to hydration effects.",
            formula: "R-NH2 + H2O ⇌ R-NH3+ + OH-",
            note: "Aniline is less basic than ammonia due to resonance delocalization of the lone pair."
          },
          {
            id: "diazonium",
            title: "Benzene Diazonium Salts",
            body: "These are versatile intermediates. They can be converted into phenols, chlorobenzene (Sandmeyer), fluorobenzene (Balz-Schiemann), or dyes. They are only stable at low temperatures (0-5°C).",
            formula: "C6H5N2Cl + CuCl → C6H5Cl + N2",
            note: "Azo dyes (like Methyl Orange) are formed by coupling diazonium salts with phenols or amines."
          },
          {
            id: "hofmann-degradation",
            title: "Hofmann Bromamide Reaction",
            body: "An amide is treated with Bromine and KOH to yield a primary amine with one less carbon atom. This is a very useful 'step-down' reaction in organic synthesis.",
            formula: "RCONH2 + Br2 + 4KOH → RNH2 + K2CO3 + 2KBr + 2H2O",
            note: "This reaction involves a nitrene intermediate."
          }
        ],
        examples: [
          {
            title: "Synthesis",
            description: "Aniline is prepared by the reduction of Nitrobenzene using Sn/HCl."
          },
          {
            title: "Test",
            description: "Hinsberg test is used to distinguish between 1°, 2°, and 3° amines."
          }
        ],
        summary: "Organic nitrogen chemistry is the chemistry of the lone pair. Amines and diazonium salts are essential for the pharmaceutical and dye industries.",
        quickFacts: [
          "Quaternary ammonium salts are used as surfactants in fabric softeners.",
          "Alkaloids are naturally occurring nitrogen compounds in plants (e.g., Caffeine, Nicotine).",
          "The characteristic 'fishy' smell of rotting fish is due to methylamines."
        ]
      }
    },
    {
      id: "tn12-9",
      title: "Biomolecules",
      duration: "55 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Biomolecules are the organic molecules that build and power living systems. This chapter covers Carbohydrates (sugars), Proteins (amino acids), and Nucleic Acids (DNA/RNA).",
        keyPoints: [
          "Carbohydrates: Monosaccharides (Glucose, Fructose) and Polysaccharides.",
          "Glucose Structure: Open chain vs Cyclic hemiacetal forms.",
          "Proteins: Polymers of alpha-amino acids linked by peptide bonds.",
          "Amino Acids: Essential vs Non-essential; Zwitterion property.",
          "Protein Structure: Primary, Secondary (alpha-helix), Tertiary, and Quaternary.",
          "Denaturation: Loss of biological activity due to heat or pH change.",
          "Nucleic Acids: DNA (double helix) and RNA (single strand).",
          "Vitamins and Hormones: Micronutrients and chemical messengers."
        ],
        sections: [
          {
            id: "glucose",
            title: "Glucose: The Energy Molecule",
            body: "Glucose is an aldohexose. It exists primarily in cyclic α and β forms. It shows mutarotation. It reduces Tollen's reagent and Fehling's solution, proving the presence of an aldehyde group.",
            formula: "C6H12O6",
            note: "Starch and Cellulose are both polymers of glucose but with different linkages."
          },
          {
            id: "amino-acids",
            title: "Amino Acids and Peptides",
            body: "Amino acids contain both -NH2 and -COOH groups. In water, they exist as dipolar Zwitterions. Peptide bonds (-CONH-) link amino acids to form proteins. Some amino acids cannot be synthesized by the body and must be in the diet.",
            formula: "NH2-CHR-COOH",
            note: "Insulin was the first protein to have its primary sequence determined."
          },
          {
            id: "dna-rna",
            title: "DNA and RNA",
            body: "Nucleic acids consist of a pentose sugar, a phosphoric acid group, and nitrogenous bases (A, T, G, C, U). DNA stores genetic information, while RNA is responsible for protein synthesis.",
            formula: null,
            note: "Adenine always pairs with Thymine (2 bonds), and Guanine with Cytosine (3 bonds)."
          }
        ],
        examples: [
          {
            title: "Sugar Type",
            description: "Sucrose (Table sugar) is a disaccharide of Glucose and Fructose."
          },
          {
            title: "Protein Type",
            description: "Keratin in hair is a fibrous protein; Hemoglobin is a globular protein."
          }
        ],
        summary: "Biomolecules are complex polymers that perform the chemistry of life. Their specific shapes and sequences determine their function in every cell.",
        quickFacts: [
          "Vitamin B12 contains Cobalt.",
          "DNA is the longest molecule in the human body.",
          "Fructose is the sweetest naturally occurring sugar."
        ]
      }
    }
  ],
  "university-cy3151": [
    {
      id: "au-1",
      title: "Water Technology",
      duration: "60 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Water is the most critical resource in engineering. This chapter covers the treatment of water for domestic and industrial use, focusing on hardness removal and desalination.",
        keyPoints: [
          "Hardness: Temporary vs Permanent; Units like ppm and °Cl.",
          "EDTA Method: Quantitative estimation of total hardness.",
          "Boiler Troubles: Scales, sludge, caustic embrittlement, and priming/foaming.",
          "Internal Treatment: Carbonate, phosphate, and calgon conditioning.",
          "External Treatment: Zeolite process and Ion-exchange process.",
          "Desalination: Removal of salt via Reverse Osmosis and Electrodialysis.",
          "Municipal Treatment: Screening, sedimentation, and disinfection (Chlorination).",
          "Potable Water: Standards and requirements for safe drinking water."
        ],
        sections: [
          {
            id: "edta-method",
            title: "Hardness Estimation by EDTA",
            body: "EDTA forms stable complexes with Ca2+ and Mg2+. Using EBT indicator at pH 10, the color changes from wine red to steel blue at the endpoint. This allows precise calculation of total, permanent, and temporary hardness.",
            formula: "M1V1 = M2V2",
            note: "Buffer solution (NH4Cl + NH4OH) is used to maintain pH 10."
          },
          {
            id: "ion-exchange",
            title: "Demineralization (Ion Exchange)",
            body: "Water is passed through cation exchange resins (R-H+) and then anion exchange resins (R-OH-). All ions are replaced by H+ and OH-, which combine to form water. This produces ultra-pure 'deionized' water.",
            formula: "R-H + Ca2+ → R2-Ca + 2H+",
            note: "Resins can be regenerated using HCl (for cation) and NaOH (for anion)."
          },
          {
            id: "reverse-osmosis",
            title: "Reverse Osmosis (RO)",
            body: "When pressure greater than the osmotic pressure is applied to the salt water side, pure water flows back through the semi-permeable membrane. This is the most efficient method for large-scale desalination.",
            formula: "P > π",
            note: "Cellulose acetate or polymethyl methacrylate are used as membranes."
          }
        ],
        examples: [
          {
            title: "Boiler Scale",
            description: "Calcium sulphate (CaSO4) is the main culprit for hard scales in high-pressure boilers."
          },
          {
            title: "Disinfection",
            description: "Bleaching powder (CaOCl2) releases nascent oxygen to kill germs in water."
          }
        ],
        summary: "Engineering water must be free from scales and corrosive ions. Ion-exchange and RO are the pillars of modern water purification.",
        quickFacts: [
          "Deionized water is pure but not necessarily free from microbes.",
          "Calgon is Sodium hexametaphosphate; it forms a soluble complex with Ca ions.",
          "Specific conductance is used to measure the purity of distilled water."
        ]
      }
    },
    {
      id: "au-2",
      title: "Electrochemistry and Corrosion",
      duration: "65 mins",
      difficulty: "Advanced",
      content: {
        overview: "Building on basic electrochemistry, this chapter applies these principles to engineering problems like corrosion control and battery design for modern devices.",
        keyPoints: [
          "Electrode Potentials: Nernst equation applications.",
          "Electrochemical Series: Predicting feasibility and displacement.",
          "Dry Corrosion: Oxidation by atmospheric gases at high temperatures.",
          "Wet Corrosion: Electrochemical theory involving anodes and cathodes.",
          "Factors Influencing Corrosion: Nature of metal and environment.",
          "Corrosion Control: Proper design, galvanization, and tinning.",
          "Cathodic Protection: Sacrificial anode and impressed current methods.",
          "Electroplating: Surface coating for protection and aesthetics."
        ],
        sections: [
          {
            id: "corrosion-theory",
            title: "Electrochemical Theory of Corrosion",
            body: "Corrosion occurs when a metal surface has anodic and cathodic areas in contact with an electrolyte. The metal is oxidized at the anode (Fe → Fe2+ + 2e-). Oxygen is reduced at the cathode, forming rust.",
            formula: "4Fe + 3O2 + 2H2O → 2Fe2O3.H2O",
            note: "Small anode and large cathode lead to very rapid localized corrosion (pitting)."
          },
          {
            id: "tinning-galv",
            title: "Galvanization vs Tinning",
            body: "Galvanization is coating iron with Zinc (sacrificial). Even if the coating is scratched, Zinc corrodes first. Tinning is coating with Tin (barrier). If scratched, the iron corrodes faster than usual because iron is more anodic than tin.",
            formula: null,
            note: "Food containers are tinned as tin is non-toxic and doesn't react with organic acids."
          },
          {
            id: "cathodic-protection",
            title: "Cathodic Protection Methods",
            body: "Sacrificial Anode: Attaching a more active metal like Mg or Zn to the structure. Impressed Current: Forcing electrons into the structure using an external DC power source to make it the cathode.",
            formula: null,
            note: "Used for buried pipelines, ship hulls, and storage tanks."
          }
        ],
        examples: [
          {
            title: "Battery",
            description: "Lead-acid storage battery used in cars (Pb/PbO2 with H2SO4)."
          },
          {
            title: "Pilling-Bedworth Rule",
            description: "If the volume of oxide formed is greater than the metal, the oxide layer is protective."
          }
        ],
        summary: "Corrosion is an inevitable but controllable natural process. Engineers use electrochemical principles to extend the life of infrastructure.",
        quickFacts: [
          "Gold and Platinum are 'Noble' because they resist oxidation.",
          "Stainless steel forms a thin, invisible protective layer of Chromium oxide.",
          "Sea water is very corrosive because the salt increases its electrical conductivity."
        ]
      }
    },
    {
      id: "au-3",
      title: "Polymer Chemistry",
      duration: "55 mins",
      difficulty: "Intermediate",
      content: {
        overview: "Polymers are long-chain molecules that have replaced traditional materials in almost every field. This chapter covers their synthesis, properties, and engineering applications.",
        keyPoints: [
          "Monomers and Polymers: Small units and the large chains they form.",
          "Functionality: Number of bonding sites (Bifunctional vs Polyfunctional).",
          "Polymerization: Addition (chain-growth) and Condensation (step-growth).",
          "Thermoplastics vs Thermosets: Softening on heating vs permanent setting.",
          "Plastics: PE, PVC, Teflon, Nylon 6,6, and Terylene.",
          "Elastomers: Natural rubber and synthetic rubbers (Buna-S, Buna-N).",
          "Vulcanization: Improving rubber properties using sulphur cross-linking.",
          "Conducting Polymers: Polyacetylene and Polyaniline for electronics."
        ],
        sections: [
          {
            id: "polymer-types",
            title: "Thermoplastics and Thermosets",
            body: "Thermoplastics have linear chains and soften on heating (e.g., PVC). Thermosetting polymers have 3D cross-linked structures; they undergo chemical changes on heating and cannot be reshaped (e.g., Bakelite).",
            formula: null,
            note: "Thermosets are generally more heat-resistant and brittle than thermoplastics."
          },
          {
            id: "nylon-synthesis",
            title: "Nylon 6,6 and Polyesters",
            body: "Nylon 6,6 is a polyamide formed from adipic acid and hexamethylene diamine. It is used for fibers, ropes, and bristles. Terylene (Dacron) is a polyester used for durable clothing.",
            formula: "[-(CH2)6-NH-CO-(CH2)4-CO-NH-]-n",
            note: "The '6,6' denotes the number of carbon atoms in each monomer."
          },
          {
            id: "rubber-vulcan",
            title: "Vulcanization of Rubber",
            body: "Natural rubber is soft and sticky. Heating it with 3-5% sulphur creates cross-links between polymer chains. This improves tensile strength, elasticity, and resistance to temperature changes.",
            formula: "-S-S- cross-links",
            note: "Charles Goodyear discovered vulcanization by accident in 1839."
          }
        ],
        examples: [
          {
            title: "Addition Polymer",
            description: "Polyethylene (PE) used for bags and bottles."
          },
          {
            title: "Conducting Polymer",
            description: "Polyaniline used for making lightweight rechargeable batteries."
          }
        ],
        summary: "Polymers are engineered molecules. By controlling the chain length and cross-linking, we can create materials for everything from food wraps to aircraft parts.",
        quickFacts: [
          "Kevlar is a polymer that is five times stronger than steel.",
          "Polycarbonate is used for bulletproof glass.",
          "Biodegradable polymers like PLA are being developed to reduce pollution."
        ]
      }
    },
    {
      id: "au-4",
      title: "Energy Sources",
      duration: "50 mins",
      difficulty: "Intermediate",
      content: {
        overview: "With depleting fossil fuels, the study of energy sources is paramount. This chapter covers traditional fuels, nuclear energy, and renewable sources like solar and wind.",
        keyPoints: [
          "Nuclear Energy: Fission and Fusion processes.",
          "Nuclear Reactor: Fuel, moderator, control rods, and coolant.",
          "Solar Cells: P-N junction for light to electricity conversion.",
          "Wind Energy: Harnessing kinetic energy for power.",
          "Geothermal Energy: Utilizing Earth's internal heat.",
          "Batteries for EVs: Lithium-ion and Nickel-metal hydride.",
          "Supercapacitors: Rapid charging and high power density.",
          "Biofuels: Ethanol and Biodiesel from organic waste."
        ],
        sections: [
          {
            id: "nuclear-fission",
            title: "Nuclear Fission and Reactors",
            body: "Nuclear fission involves splitting a heavy nucleus like U-235 into lighter nuclei, releasing immense energy. A nuclear reactor controls this chain reaction. Heavy water (D2O) acts as a moderator to slow down neutrons.",
            formula: "U-235 + n → Ba + Kr + 3n + Energy",
            note: "Control rods made of Cadmium or Boron absorb excess neutrons to prevent melt-down."
          },
          {
            id: "solar-energy",
            title: "Solar Photovoltaics",
            body: "Solar cells are made of semiconductors like Silicon. When photons hit the cell, they create electron-hole pairs, generating a DC current. Solar energy is clean but depends on weather and daytime.",
            formula: "Efficiency = Output Power / Input Solar Power",
            note: "Photovoltaic systems require storage batteries for night-time use."
          },
          {
            id: "supercapacitors",
            title: "Supercapacitors",
            body: "Unlike batteries which store energy chemically, supercapacitors store energy in an electric double layer. They have very high capacitance and can charge/discharge in seconds, making them ideal for regenerative braking.",
            formula: "C = q / V",
            note: "They bridge the gap between traditional capacitors and batteries."
          }
        ],
        examples: [
          {
            title: "Moderator",
            description: "Graphite or Heavy water used in nuclear power plants."
          },
          {
            title: "Hybrid EVs",
            description: "Use a combination of internal combustion engine and electric battery for better efficiency."
          }
        ],
        summary: "The future of engineering is in clean and sustainable energy. Nuclear and solar power are the primary candidates for a low-carbon world.",
        quickFacts: [
          "One gram of Uranium-235 produces energy equivalent to 3 tons of coal.",
          "India's three-stage nuclear power program focuses on using Thorium.",
          "Lithium-ion batteries were popularized by the mobile phone revolution."
        ]
      }
    },
    {
      id: "au-5",
      title: "Spectroscopy Basics",
      duration: "65 mins",
      difficulty: "Advanced",
      content: {
        overview: "Spectroscopy is the study of interaction between matter and electromagnetic radiation. It is the most powerful tool for identifying unknown chemical structures and quantifying substances.",
        keyPoints: [
          "Electromagnetic Radiation: From Gamma rays to Radio waves.",
          "Beer-Lambert Law: Relates absorbance to concentration and path length.",
          "UV-Visible Spectroscopy: Electronic transitions in molecules.",
          "IR Spectroscopy: Molecular vibrations and functional group identification.",
          "NMR Spectroscopy: Nuclear spin and chemical environment (1H-NMR).",
          "Mass Spectrometry: Fragmentation and molecular weight determination.",
          "Chromatography: Separation technique based on differential partition.",
          "Applications: Forensics, quality control, and drug design."
        ],
        sections: [
          {
            id: "beer-lambert",
            title: "Beer-Lambert Law",
            body: "The absorbance (A) of a solution is directly proportional to its molar concentration (c) and the path length (l). This law is the foundation of all quantitative spectrophotometric analysis.",
            formula: "A = εcl",
            note: "ε is the molar absorptivity, a characteristic of the substance."
          },
          {
            id: "ir-spectroscopy",
            title: "Infrared (IR) Spectroscopy",
            body: "Molecules absorb IR radiation, causing bonds to vibrate (stretching and bending). Since every functional group absorbs at a specific frequency (fingerprint region), IR is used to identify molecules.",
            formula: "ν = (1/2πc) * √(k/μ)",
            note: "The 'fingerprint region' (below 1500 cm-1) is unique for each compound."
          },
          {
            id: "uv-vis",
            title: "UV-Visible Spectroscopy",
            body: "Absorbing UV-Vis light causes electrons to jump from lower to higher energy levels (π to π* or n to π*). It is used to study conjugated systems like dyes and transition metal complexes.",
            formula: "ΔE = hν",
            note: "Chromophores are the part of the molecule responsible for its color."
          }
        ],
        examples: [
          {
            title: "NMR Use",
            description: "Used in MRI machines to see detailed images of soft tissues in the body."
          },
          {
            title: "UV Application",
            description: "Checking the concentration of proteins or DNA in a solution."
          }
        ],
        summary: "Spectroscopy allows us to see the 'unseen' structure of molecules. Each technique provides a different piece of the chemical puzzle.",
        quickFacts: [
          "The 'H' in 1H-NMR stands for the Hydrogen nucleus (Proton).",
          "Microwave spectroscopy is used to study the rotation of molecules.",
          "Mass spectrometry doesn't actually involve light; it uses electron beams."
        ]
      }
    }
  ]
};

export default CHEMISTRY_LESSONS;
