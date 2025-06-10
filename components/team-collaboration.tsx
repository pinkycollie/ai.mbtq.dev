import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Steps } from "@/components/ui/steps"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TeamCollaboration() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Team Collaboration</CardTitle>
          <CardDescription>Learn how to collaborate with your team on Vercel projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Steps>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Creating and managing teams</Steps.Title>
                <Steps.Description>Set up teams to collaborate on projects</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <p>Teams in Vercel allow you to collaborate with other developers on your projects:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Go to the{" "}
                    <a
                      href="https://vercel.com/dashboard"
                      className="text-primary underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Vercel dashboard
                    </a>
                  </li>
                  <li>Click on your profile picture in the top-right corner</li>
                  <li>Select "New Team"</li>
                  <li>Enter your team name and select a plan</li>
                  <li>Invite team members by email</li>
                </ol>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Team roles and permissions</Steps.Title>
                <Steps.Description>Understand the different roles in a Vercel team</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Permissions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Owner</Badge>
                          <span>Team Owner</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ul className="list-disc pl-5">
                          <li>Full access to all projects and settings</li>
                          <li>Can add/remove team members</li>
                          <li>Can change billing information</li>
                          <li>Can delete the team</li>
                        </ul>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Member</Badge>
                          <span>Team Member</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ul className="list-disc pl-5">
                          <li>Can create and deploy projects</li>
                          <li>Can modify project settings</li>
                          <li>Cannot access billing or team settings</li>
                        </ul>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Viewer</Badge>
                          <span>Team Viewer</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ul className="list-disc pl-5">
                          <li>Can view projects and deployments</li>
                          <li>Cannot create or modify projects</li>
                          <li>Read-only access</li>
                        </ul>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Steps.Step>
            <Steps.Step>
              <Steps.Header>
                <Steps.Title>Collaboration features</Steps.Title>
                <Steps.Description>Tools and features for effective team collaboration</Steps.Description>
              </Steps.Header>
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Preview Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>Leave comments directly on preview deployments to provide feedback:</p>
                      <div className="border rounded-md p-4 space-y-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Jane Doe</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</span>
                            </div>
                            <p className="text-sm">The navigation menu doesn't work correctly on mobile devices.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">John Smith</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</span>
                            </div>
                            <p className="text-sm">Fixed in the latest commit. Please check again.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Activity Feed</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>Track all team activity in one place:</p>
                      <div className="border rounded-md p-4 space-y-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            Jane deployed <strong>main</strong> to production
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">2h ago</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">John added a new environment variable</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">3h ago</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">Jane connected a custom domain</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">5h ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Steps.Step>
          </Steps>
        </CardContent>
      </Card>
    </div>
  )
}

