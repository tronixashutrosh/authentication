# authentication
firts create a folder Authentication at src/Components/
create 4 components Login.js, Signup.js, ForgotPass.js, PrivateRoute.js at src/Components/Authentication
then just call Private route like in Routelist.js like :-
    <Route element={<PrivateRoute />}>
        <Route index element={<LaunchpadPage />} />
        <Route path=":address" element={<ViewPool />} />
        <Route path="createlaunchpad" element={<CreateLaunchpadPage />} />
     </Route>
