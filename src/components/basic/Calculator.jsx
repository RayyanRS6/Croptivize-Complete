import { useState, useEffect } from "react"
import { Calculator, Leaf, Info, DollarSign, FlaskConical, Ruler, Sun, Map, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import useAuth from "@/hooks/useAuth"

// Fertilizer data for different crops (kg/ha)
const fertilizerData = [
    { crop: "Potato", N: 150, P2O5: 100, K2O: 150 },
    { crop: "Wheat", N: 120, P2O5: 60, K2O: 40 },
    { crop: "Cotton", N: 90, P2O5: 60, K2O: 60 },
    { crop: "Maize", N: 160, P2O5: 70, K2O: 80 },
    { crop: "Rice", N: 100, P2O5: 50, K2O: 50 },
    { crop: "Sugarcane", N: 200, P2O5: 80, K2O: 160 },
    { crop: "Soybean", N: 20, P2O5: 60, K2O: 80 },
    { crop: "Barley", N: 80, P2O5: 40, K2O: 40 },
    { crop: "Sunflower", N: 60, P2O5: 60, K2O: 80 },
    { crop: "Canola", N: 90, P2O5: 40, K2O: 40 },
]

// Maximum values for progress bars
const maxValues = {
    N: 200,
    P2O5: 100,
    K2O: 160,
}

// --- New constants and helpers ---
const fieldShapes = [
    { label: "Rectangle", value: "rectangle" },
    { label: "Circle", value: "circle" },
    { label: "Triangle", value: "triangle" },
]
const applicationMethods = [
    "Broadcast Spreading",
    "Row Banding",
    "Drip Irrigation",
    "Foliar Spray",
    "Top Dressing",
]
const fertilizerTypes = [
    { label: "Synthetic", value: "synthetic" },
    { label: "Organic", value: "organic" },
    { label: "Custom Blend", value: "custom" },
]
const seasons = ["Spring", "Summer", "Fall", "Winter"]

export default function CalculatorComp() {
    const { isAuthenticated } = useAuth()
    // --- UI state ---
    const [selectedCrop, setSelectedCrop] = useState("")
    const [area, setArea] = useState("")
    const [fieldShape, setFieldShape] = useState("rectangle")
    const [dimensions, setDimensions] = useState({ length: "", width: "", diameter: "", sideA: "", sideB: "", sideC: "" })
    const [soilTest, setSoilTest] = useState({ pH: "", N: "", P: "", K: "" })
    const [fertilizerType, setFertilizerType] = useState("synthetic")
    const [applicationMethod, setApplicationMethod] = useState(applicationMethods[0])
    const [season, setSeason] = useState(seasons[0])
    const [bagWeight, setBagWeight] = useState("")
    const [bagCost, setBagCost] = useState("")
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    // --- Helper: Calculate area based on shape ---
    function calculateArea() {
        if (fieldShape === "rectangle") {
            const l = parseFloat(dimensions.length)
            const w = parseFloat(dimensions.width)
            if (!isNaN(l) && !isNaN(w)) return l * w / 10000 // m² to hectares
        } else if (fieldShape === "circle") {
            const d = parseFloat(dimensions.diameter)
            if (!isNaN(d)) return (Math.PI * Math.pow(d / 2, 2)) / 10000 // m² to hectares
        } else if (fieldShape === "triangle") {
            const a = parseFloat(dimensions.sideA)
            const b = parseFloat(dimensions.sideB)
            const c = parseFloat(dimensions.sideC)
            if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
                const s = (a + b + c) / 2
                const areaM2 = Math.sqrt(s * (s - a) * (s - b) * (s - c))
                return areaM2 / 10000
            }
        }
        return ""
    }

    // --- Real-time calculation logic ---
    useEffect(() => {
        if (!selectedCrop) {
            setResult(null)
            return
        }
        // Area
        const areaHa = area ? parseFloat(area) : calculateArea()
        if (!areaHa || isNaN(areaHa) || areaHa <= 0) {
            setResult(null)
            return
        }
        // Find crop data
        const cropData = fertilizerData.find((crop) => crop.crop === selectedCrop)
        if (!cropData) {
            setResult(null)
            return
        }
        // Soil test adjustment (if provided)
        const soilN = parseFloat(soilTest.N)
        const soilP = parseFloat(soilTest.P)
        const soilK = parseFloat(soilTest.K)
        // Assume if soil test is blank, use full recommendation
        let N = cropData.N
        let P2O5 = cropData.P2O5
        let K2O = cropData.K2O
        if (!isNaN(soilN)) N = Math.max(N - soilN, 0)
        if (!isNaN(soilP)) P2O5 = Math.max(P2O5 - soilP, 0)
        if (!isNaN(soilK)) K2O = Math.max(K2O - soilK, 0)
        // pH recommendation
        let phRecommendation = ""
        const pH = parseFloat(soilTest.pH)
        if (!isNaN(pH)) {
            if (pH < 6.0) phRecommendation = "Soil is acidic. Consider adding lime to raise pH to 6.0-7.5."
            else if (pH > 7.5) phRecommendation = "Soil is alkaline. Consider adding sulfur or organic matter to lower pH to 6.0-7.5."
            else phRecommendation = "Soil pH is optimal for most crops (6.0-7.5)."
        }
        setResult({
            crop: selectedCrop,
            area: areaHa,
            N, P2O5, K2O,
            N_total: N * areaHa,
            P2O5_total: P2O5 * areaHa,
            K2O_total: K2O * areaHa,
            phRecommendation,
            applicationMethod,
            fertilizerType,
            season
        })
    }, [selectedCrop, area, fieldShape, dimensions, soilTest, fertilizerType, applicationMethod, season])

    // --- UI ---
    return (
        <Card className="w-full max-w-3xl mx-auto pt-0">
            <CardHeader className="border-b bg-primary/5 py-4 rounded-t-lg">
                <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    <CardTitle>Fertilizer Calculator</CardTitle>
                </div>
                <CardDescription>
                    Calculate the required NPK fertilizer amounts for your crops, based on your field, soil, and fertilizer type.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="grid gap-6">
                    {/* Field Shape and Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="crop">Select Crop</Label>
                            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                                <SelectTrigger id="crop">
                                    <SelectValue placeholder="Select a crop" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fertilizerData.map((crop) => (
                                        <SelectItem key={crop.crop} value={crop.crop}>{crop.crop}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="field-shape">Field Shape</Label>
                            <Select value={fieldShape} onValueChange={setFieldShape}>
                                <SelectTrigger id="field-shape">
                                    <SelectValue placeholder="Select shape" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fieldShapes.map((shape) => (
                                        <SelectItem key={shape.value} value={shape.value}>{shape.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Field Dimensions */}
                    {fieldShape === "rectangle" && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="length">Length (m)</Label>
                                <Input id="length" type="number" min="0" value={dimensions.length} onChange={e => setDimensions(d => ({ ...d, length: e.target.value }))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="width">Width (m)</Label>
                                <Input id="width" type="number" min="0" value={dimensions.width} onChange={e => setDimensions(d => ({ ...d, width: e.target.value }))} />
                            </div>
                        </div>
                    )}
                    {fieldShape === "circle" && (
                        <div className="space-y-2">
                            <Label htmlFor="diameter">Diameter (m)</Label>
                            <Input id="diameter" type="number" min="0" value={dimensions.diameter} onChange={e => setDimensions(d => ({ ...d, diameter: e.target.value }))} />
                        </div>
                    )}
                    {fieldShape === "triangle" && (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sideA">Side A (m)</Label>
                                <Input id="sideA" type="number" min="0" value={dimensions.sideA} onChange={e => setDimensions(d => ({ ...d, sideA: e.target.value }))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sideB">Side B (m)</Label>
                                <Input id="sideB" type="number" min="0" value={dimensions.sideB} onChange={e => setDimensions(d => ({ ...d, sideB: e.target.value }))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sideC">Side C (m)</Label>
                                <Input id="sideC" type="number" min="0" value={dimensions.sideC} onChange={e => setDimensions(d => ({ ...d, sideC: e.target.value }))} />
                            </div>
                        </div>
                    )}
                    {/* Area override */}
                    <div className="space-y-2">
                        <Label htmlFor="area">Area (hectares, optional override)</Label>
                        <Input id="area" type="number" min="0.01" step="0.01" placeholder="Enter area in hectares" value={area} onChange={e => setArea(e.target.value)} />
                        <div className="text-xs text-muted-foreground">If you know your area, enter it directly. Otherwise, fill in field shape and dimensions above.</div>
                    </div>
                    {/* Soil Test Results */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ph">Soil pH</Label>
                            <Input id="ph" type="number" min="0" max="14" step="0.01" value={soilTest.pH} onChange={e => setSoilTest(s => ({ ...s, pH: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="soilN">Soil Nitrogen (kg/ha)</Label>
                            <Input id="soilN" type="number" min="0" value={soilTest.N} onChange={e => setSoilTest(s => ({ ...s, N: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="soilP">Soil Phosphorus (kg/ha)</Label>
                            <Input id="soilP" type="number" min="0" value={soilTest.P} onChange={e => setSoilTest(s => ({ ...s, P: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="soilK">Soil Potassium (kg/ha)</Label>
                            <Input id="soilK" type="number" min="0" value={soilTest.K} onChange={e => setSoilTest(s => ({ ...s, K: e.target.value }))} />
                        </div>
                    </div>
                    {/* Fertilizer Type, Application Method, Season */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fertilizer-type">Fertilizer Type</Label>
                            <Select value={fertilizerType} onValueChange={setFertilizerType}>
                                <SelectTrigger id="fertilizer-type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fertilizerTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="application-method">Application Method</Label>
                            <Select value={applicationMethod} onValueChange={setApplicationMethod}>
                                <SelectTrigger id="application-method">
                                    <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                    {applicationMethods.map((method) => (
                                        <SelectItem key={method} value={method}>{method}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="season">Season</Label>
                            <Select value={season} onValueChange={setSeason}>
                                <SelectTrigger id="season">
                                    <SelectValue placeholder="Select season" />
                                </SelectTrigger>
                                <SelectContent>
                                    {seasons.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Exclamation mark statement */}
                    <div className="flex items-center gap-2 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <span className="text-sm font-medium">The amount of nutrients is based on your field size and assumes no existing nutrients. If you've tested your field and found nutrient levels, please adjust the recommended amount accordingly.</span>
                    </div>
                    {/* Recommendations Section */}
                    {result && (
                        <div className="mt-4 space-y-6">
                            {/* Nutrient Analysis Report */}
                            <div className="rounded-lg border p-4 bg-muted/30">
                                <h3 className="sm:text-lg font-medium mb-2 flex items-center gap-2">
                                    <FlaskConical className="h-6 w-6 text-primary" />
                                    Nutrient Analysis Report
                                </h3>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>Nitrogen (N): {soilTest.N ? soilTest.N + " kg/ha" : "Not provided"}</li>
                                    <li>Phosphorus (P₂O₅): {soilTest.P ? soilTest.P + " kg/ha" : "Not provided"}</li>
                                    <li>Potassium (K₂O): {soilTest.K ? soilTest.K + " kg/ha" : "Not provided"}</li>
                                    <li>Soil pH: {soilTest.pH ? soilTest.pH : "Not provided"}</li>
                                </ul>
                            </div>
                            {/* Recommended Nutrient Rates */}
                            <div className="rounded-lg border p-4 bg-muted/30">
                                <h3 className="sm:text-lg font-medium mb-2 flex items-center gap-2">
                                    <Leaf className="h-6 w-6 text-primary" />
                                    Recommended Nutrient Rates (per hectare)
                                </h3>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>Nitrogen (N): {result.N} kg/ha</li>
                                    <li>Phosphorus (P₂O₅): {result.P2O5} kg/ha</li>
                                    <li>Potassium (K₂O): {result.K2O} kg/ha</li>
                                </ul>
                                <div className="mt-2 text-xs text-muted-foreground">These rates are adjusted for your soil test results if provided.</div>
                            </div>
                            {/* Total Fertilizer Needed */}
                            <div className="rounded-lg border p-4 bg-muted/30">
                                <h3 className="sm:text-lg font-medium mb-2 flex items-center gap-2">
                                    <Ruler className="h-6 w-6 text-primary" />
                                    Total Fertilizer Needed for Your Field
                                </h3>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>Nitrogen (N): {result.N_total} kg</li>
                                    <li>Phosphorus (P₂O₅): {result.P2O5_total} kg</li>
                                    <li>Potassium (K₂O): {result.K2O_total} kg</li>
                                </ul>
                                <div className="mt-2 text-xs text-muted-foreground">Calculated for your total field area.</div>
                            </div>
                            {/* pH Amendment Recommendation */}
                            <div className="rounded-lg border p-4 bg-muted/30">
                                <h3 className="sm:text-lg font-medium mb-2 flex items-center gap-2">
                                    <FlaskConical className="h-6 w-6 text-primary" />
                                    pH Amendment Recommendation
                                </h3>
                                <div className="text-muted-foreground">{result.phRecommendation}</div>
                            </div>
                            {/* Application Method & Season */}
                            <div className="rounded-lg border p-4 bg-muted/30">
                                <h3 className="sm:text-lg font-medium mb-2 flex items-center gap-2">
                                    <Sun className="h-6 w-6 text-primary" />
                                    Application & Seasonal Advice
                                </h3>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>Application Method: {result.applicationMethod}</li>
                                    <li>Season: {result.season}</li>
                                    <li>Fertilizer Type: {result.fertilizerType}</li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {/* Source citation */}
                    <div className="text-xs text-muted-foreground mt-6">
                        Data and recommendations based on:
                        <ul className="list-disc pl-4">
                            <li><a href="https://plantcalculators.com/gardening-landscaping/soil-fertilizer/" target="_blank" rel="noopener noreferrer" className="underline">PlantCalculators.com</a></li>
                            <li><a href="https://morningchores.com/fertilizer-calculator/" target="_blank" rel="noopener noreferrer" className="underline">MorningChores.com</a></li>
                            <li><a href="https://aesl.ces.uga.edu/soil/fertcalc/" target="_blank" rel="noopener noreferrer" className="underline">UGA Extension</a></li>
                            <li><a href="https://precisionag.sites.clemson.edu/Calculators/Fertility/npkRec/" target="_blank" rel="noopener noreferrer" className="underline">Clemson University Extension</a></li>
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardFooter className={cn("flex justify-between text-xs text-muted-foreground border-t pt-2", !result && "hidden")}>Values based on standard agricultural recommendations<div>Last updated: March 2025</div></CardFooter>
        </Card>
    )
}

