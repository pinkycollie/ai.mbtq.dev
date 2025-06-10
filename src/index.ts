import type { Probot } from "probot"

/**
 * This is the main entry point for your Probot application
 */
export default (app: Probot) => {
  app.log.info("Yay, the app was loaded!")

  // Respond to new issues being opened
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue! A team member will review it shortly.",
    })
    return context.octokit.issues.createComment(issueComment)
  })

  // Respond to new pull requests being opened
  app.on("pull_request.opened", async (context) => {
    const prComment = context.issue({
      body: "Thanks for submitting this pull request! We'll review it as soon as possible.",
    })
    return context.octokit.issues.createComment(prComment)
  })

  // Auto-assign issues with specific labels
  app.on(["issues.labeled"], async (context) => {
    const { payload } = context
    const label = payload.label.name

    // Define label to assignee mapping
    const labelAssignees: Record<string, string[]> = {
      bug: ["bugFixTeamMember"],
      feature: ["featureDevTeamMember"],
      documentation: ["docsTeamMember"],
    }

    if (label in labelAssignees) {
      const assignees = labelAssignees[label]

      await context.octokit.issues.addAssignees(
        context.issue({
          assignees,
        }),
      )

      app.log.info(`Assigned issue #${payload.issue.number} to ${assignees.join(", ")} based on label "${label}"`)
    }
  })
}
