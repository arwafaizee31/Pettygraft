const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"]},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"]},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"]},"login":{"uri":"login","methods":["GET","HEAD"]},"logout":{"uri":"logout","methods":["POST"]},"register":{"uri":"register","methods":["GET","HEAD"]},"register.store":{"uri":"register","methods":["POST"]},"password.request":{"uri":"password\/reset","methods":["GET","HEAD"]},"password.email":{"uri":"password\/email","methods":["POST"]},"password.reset":{"uri":"password\/reset\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.update":{"uri":"password\/reset","methods":["POST"]},"password.confirm":{"uri":"password\/confirm","methods":["GET","HEAD"]},"verification.notice":{"uri":"email\/verify","methods":["GET","HEAD"]},"verification.verify":{"uri":"email\/verify\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.resend":{"uri":"email\/resend","methods":["POST"]},"admin-dashboard":{"uri":"admin\/dashboard","methods":["GET","HEAD"]},"petOwner-dashboard":{"uri":"petowner\/dashboard","methods":["GET","HEAD"]},"vendor-dashboard":{"uri":"vendor\/dashboard","methods":["GET","HEAD"]},"profile.edit":{"uri":"profile","methods":["GET","HEAD"]},"profile.update":{"uri":"profile","methods":["PATCH"]},"profile.destroy":{"uri":"profile","methods":["DELETE"]},"password.requestCustom":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.emailCustom":{"uri":"forgot-password","methods":["POST"]},"password.resetCustom":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.store":{"uri":"reset-password","methods":["POST"]},"verification.noticeCustom":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verifyCustom":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirmCustom":{"uri":"confirm-password","methods":["GET","HEAD"]},"password.updateCustom":{"uri":"password","methods":["PUT"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
