package org.geppetto.frontend.controllers;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.geppetto.core.auth.IAuthService;
import org.geppetto.core.common.GeppettoInitializationException;
import org.geppetto.core.manager.IGeppettoManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class Application
{

	@Autowired
	private IGeppettoManager geppettoManager;

	private static Log logger = LogFactory.getLog(Application.class);

	@RequestMapping(value = "/geppetto", method = RequestMethod.GET)
	public String geppetto(HttpServletRequest req)
	{
		try
		{
			IAuthService authService = AuthServiceCreator.getService();
			boolean auth = false;

			if(authService.isDefault())
			{
				// Default no persistence, no users
				auth = true;
			}
			else if(geppettoManager.getUser() != null)
			{
				// This is with Geppetto DB, for the user to not be null inside the GeppettoManager somebody must have used
				// the Login servlet
				Subject currentUser = SecurityUtils.getSubject();
				auth = currentUser.isAuthenticated();
			}
			else if(geppettoManager.getUser() == null)
			{
				// This is with any other authentication system from another web application.
				// since sharing the scope session across the different web application bundles
				// is more complex than expected (if possible at all) we are using cookies
				for(Cookie c : req.getCookies())
				{
					if(c.getName().equals(authService.getSessionId()))
					{
						auth = authService.isAuthenticated(c.getValue());
						break;
					}
				}
			}
			if(auth)
			{
				return "dist/geppetto";
			}
			else
			{
				return "redirect:" + authService.authFailureRedirect();
			}
		}
		catch(GeppettoInitializationException e)
		{
			logger.error("Error while retrieving an authentication service", e);
		}
		return "redirect:http://geppetto.org";
	}

	@RequestMapping(value = "/GeppettoNeuronalTests.html", method = RequestMethod.GET)
	public String testNeuronal()
	{
		return "dist/GeppettoNeuronalTests";
	}
	
	@RequestMapping(value = "/GeppettoNeuronalSimulationTests.html", method = RequestMethod.GET)
	public String testNeuronalSimulation()
	{
		return "dist/GeppettoNeuronalSimulationTests";
	}
	
	@RequestMapping(value = "/GeppettoCoreTests.html", method = RequestMethod.GET)
	public String testCore()
	{
		return "dist/GeppettoCoreTests";
	}
	
	@RequestMapping(value = "/GeppettoPersistenceTests.html", method = RequestMethod.GET)
	public String testPersistence()
	{
		return "dist/GeppettoPersistenceTests";
	}
	
	@RequestMapping(value = "/GeppettoFluidDynamicsTests.html", method = RequestMethod.GET)
	public String testFluidDynamics()
	{
		return "dist/GeppettoFluidDynamicsTests";
	}

	@RequestMapping(value = "/GeppettoAllTests.html", method = RequestMethod.GET)
	public String runTests()
	{
		return "dist/GeppettoAllTests";
	}
	
	@RequestMapping(value = "/tests.html", method = RequestMethod.GET)
	public String tests()
	{
		return "dist/Tests";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String dashboard()
	{
		return "dist/dashboard";
	}

}
