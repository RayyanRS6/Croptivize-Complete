import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

const DiseaseDetailDialog = ({ disease, open, onOpenChange }) => {
    if (!disease) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="!max-w-2xl !rounded-3xl !p-0 !border-none !shadow-2xl !bg-white max-h-[90vh] overflow-y-auto custom-scrollbar"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
            >
                <div className="pt-8 pb-8">
                    <DialogHeader className="px-8 pb-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <DialogTitle className="text-3xl font-extrabold text-gray-900">{disease.common_name}</DialogTitle>
                                <DialogDescription className="mt-1 italic text-base text-gray-500">{disease.scientific_name}</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {disease.images?.[0] && (
                        <div className="mt-6 mx-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                            <img
                                src={disease.images[0].regular_url || "/placeholder.jpg"}
                                alt={disease.common_name}
                                className="w-full object-cover max-h-72 transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    )}

                    <div className="mt-8 px-8 space-y-8">
                        {disease.description?.map((section, index) => (
                            <div key={`desc-${index}`} className="space-y-2">
                                <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-primary pl-3">{section.subtitle}</h3>
                                <p className="text-gray-600 whitespace-pre-line leading-relaxed">{section.description}</p>
                            </div>
                        ))}

                        {disease.solution?.length > 0 && (
                            <div className="space-y-4 mt-6">
                                <h2 className="text-2xl font-bold text-primary">Solutions</h2>
                                {disease.solution.map((solution, index) => (
                                    <div key={`solution-${index}`} className="space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-800">{solution.subtitle}</h3>
                                        <p className="text-gray-600 whitespace-pre-line leading-relaxed">{solution.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {disease.host?.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-800">Affects these plants:</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {disease.host.map((host, index) => (
                                        <span
                                            key={`host-${index}`}
                                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20"
                                        >
                                            {host}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DiseaseDetailDialog