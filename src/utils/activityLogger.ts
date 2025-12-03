import { supabase } from "@/integrations/supabase/client";

type EntityType = 
  | "blog_post" 
  | "case_study" 
  | "service" 
  | "team_member" 
  | "testimonial" 
  | "lead" 
  | "user"
  | "settings"
  | "media";

type Action = 
  | "create" 
  | "update" 
  | "delete" 
  | "publish" 
  | "unpublish" 
  | "login" 
  | "logout"
  | "view";

interface LogActivityParams {
  action: Action;
  entityType: EntityType;
  entityId?: string;
  details?: Record<string, any>;
}

export const logActivity = async ({
  action,
  entityType,
  entityId,
  details,
}: LogActivityParams) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("activity_logs").insert({
      user_id: user?.id || null,
      action,
      entity_type: entityType,
      entity_id: entityId || null,
      details: details || null,
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};

// Helper functions for common actions
export const logCreate = (entityType: EntityType, entityId: string, details?: Record<string, any>) =>
  logActivity({ action: "create", entityType, entityId, details });

export const logUpdate = (entityType: EntityType, entityId: string, details?: Record<string, any>) =>
  logActivity({ action: "update", entityType, entityId, details });

export const logDelete = (entityType: EntityType, entityId: string, details?: Record<string, any>) =>
  logActivity({ action: "delete", entityType, entityId, details });

export const logPublish = (entityType: EntityType, entityId: string) =>
  logActivity({ action: "publish", entityType, entityId });

export const logUnpublish = (entityType: EntityType, entityId: string) =>
  logActivity({ action: "unpublish", entityType, entityId });

export const logLogin = () =>
  logActivity({ action: "login", entityType: "user" });

export const logLogout = () =>
  logActivity({ action: "logout", entityType: "user" });