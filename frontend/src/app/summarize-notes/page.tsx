import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SummarizeNotesPage = () => {
    return (
        <div className="flex w-full h-full min-h-[70vh] items-start justify-center pt-16">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Summarize Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-gray-700">
                        Upload your notes or paste your text below. StudAIs will generate a concise summary powered by AI.
                    </p>
                    <textarea
                        className="w-full border rounded-md p-2 mb-4 min-h-[200px] resize-y"
                        placeholder="Paste your notes here..."
                    />
                    <button
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                        type="button"
                    >
                        Summarize
                    </button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SummarizeNotesPage;