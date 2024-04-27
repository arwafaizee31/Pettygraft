<table align="center" border="0" cellpadding="0" cellspacing="0" width="95%">
    <tbody>
    @php
            
            $aracudaInfo = getAracudaInfo();
            @endphp
    <tr>
        <td align="center">
            <table align="center" bgcolor="#ffffff" border="0" cellpadding="2" cellspacing="0" width="900">
                <tbody>
                <tr>
                @if ($aracudaInfo)
                    <td align="center" style="padding: 0px;">
                        <img src="{{asset('storage/' .  $aracudaInfo->aracuda_logo)}}" alt="aracuda-logo" style="width: 20%; max-width: 40% !important;">
                    </td>
                    @else
                    @endif
                </tr>
                <tr>
                    <td bgcolor="#ffffff">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                                <td style="padding: 0px 10px 0px 10px; font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';">
                                    
                                @yield('content')
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#c02034" style="padding: 15px 15px 15px 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                                <td align="center">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tbody>
                                        <tr>
                                            <td><span style="font-size: 12px; color: white;">
                                                    Copyright &copy; {{date("Y")}} Aracuda - All Rights Reserved.
                                                </span></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table>
