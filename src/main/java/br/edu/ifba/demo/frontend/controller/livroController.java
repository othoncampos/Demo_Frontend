package br.edu.ifba.demo.frontend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import br.edu.ifba.demo.frontend.service.UsuarioService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class livroController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/")
    public ModelAndView index() {
        String valor = usuarioService.listAllUsuarios().toString();
        ModelAndView mv = new ModelAndView();
        mv.addObject("teste", valor);
        mv.setViewName("index");
        return mv;
    }

    @GetMapping("/delete/{id}")
    public ModelAndView delete(@PathVariable int id) {
        boolean valor = usuarioService.delete(id);
        ModelAndView mv = new ModelAndView();
        mv.addObject("delete", valor);
        mv.setViewName("index");
        return mv;
    }
    

}
