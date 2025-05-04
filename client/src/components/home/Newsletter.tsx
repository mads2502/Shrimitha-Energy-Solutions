import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      setStatus("success");
      setMessage("Thank you for subscribing to our newsletter!");
      setEmail("");
    },
    onError: (error: Error) => {
      setStatus("error");
      setMessage(error.message || "Failed to subscribe. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    mutation.mutate(email);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Informed with Our Newsletter</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to receive updates on our latest projects, upcoming workshops,
              and industry insights directly to your inbox.
            </p>

            {status === "idle" ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow"
                    required
                  />
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="whitespace-nowrap"
                  >
                    {mutation.isPending ? (
                      <div className="flex items-center">
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent rounded-full"></div>
                        Subscribing...
                      </div>
                    ) : (
                      <>
                        Subscribe <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <Alert 
                className={`max-w-md mx-auto ${
                  status === "success" ? "bg-secondary/10" : "bg-destructive/10"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              We respect your privacy and will never share your information.
              You can unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
