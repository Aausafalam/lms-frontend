import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare } from "lucide-react";

export function CourseFAQ({ faqs }) {
    return (
        <div className="space-y-8 mt-3 dark:text-white">
            <h2 className="text-lg font-semibold flex items-center">
                <span className="w-1.5 h-6 bg-primary rounded-full mr-3 inline-block"></span>
                Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border rounded-xl overflow-hidden bg-card shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 [&[data-state=open]]:bg-muted/30 font-bold text-md">{item.question}</AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2">
                            <p className="text-md leading-relaxed">{item.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 mt-10 border border-primary/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/3">
                        <MessageSquare className="h-20 w-20 text-primary mx-auto md:mx-0" />
                    </div>
                    <div className="md:w-2/3 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                        <p className="text-lg mb-6 leading-relaxed">
                            If you couldn't find the answer to your question in our FAQ, feel free to reach out directly. Our support team is always happy to help!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="rounded-full py-2 px-6">Contact Support</Button>
                            <Button variant="outline" className="rounded-full py-2 px-6">
                                Browse Knowledge Base
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
