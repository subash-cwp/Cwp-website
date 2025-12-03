import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ABTestResult {
  variant: "a" | "b";
  testId: string;
  variantData: any;
}

export const useABTest = (testName: string): ABTestResult | null => {
  const [result, setResult] = useState<ABTestResult | null>(null);

  useEffect(() => {
    const runTest = async () => {
      // Check if user already has a variant assigned
      const storageKey = `ab_test_${testName}`;
      const existingVariant = localStorage.getItem(storageKey);

      // Fetch active test
      const { data: test } = await supabase
        .from("ab_tests")
        .select("*")
        .eq("name", testName)
        .eq("status", "active")
        .maybeSingle();

      if (!test) return;

      let variant: "a" | "b";
      const visitorId = getOrCreateVisitorId();

      if (existingVariant === "a" || existingVariant === "b") {
        variant = existingVariant;
      } else {
        // Assign variant based on traffic split
        const random = Math.random() * 100;
        variant = random < test.traffic_split ? "a" : "b";
        localStorage.setItem(storageKey, variant);

        // Record the assignment
        await supabase.from("ab_test_results").insert({
          test_id: test.id,
          variant,
          visitor_id: visitorId,
        });
      }

      setResult({
        variant,
        testId: test.id,
        variantData: variant === "a" ? test.variant_a : test.variant_b,
      });
    };

    runTest();
  }, [testName]);

  return result;
};

export const trackConversion = async (testName: string) => {
  const storageKey = `ab_test_${testName}`;
  const variant = localStorage.getItem(storageKey);
  const visitorId = getOrCreateVisitorId();

  if (!variant) return;

  const { data: test } = await supabase
    .from("ab_tests")
    .select("id")
    .eq("name", testName)
    .eq("status", "active")
    .maybeSingle();

  if (!test) return;

  await supabase
    .from("ab_test_results")
    .update({ converted: true })
    .eq("test_id", test.id)
    .eq("visitor_id", visitorId);
};

const getOrCreateVisitorId = (): string => {
  const key = "visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(key, id);
  }
  return id;
};