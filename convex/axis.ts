import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addAxis = mutation({
    args: {
        x: v.number(),
        y: v.number(),
        z: v.number()
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("axis",{
            x: args.x,
            y: args.y,
            z: args.z
        })
    }
})

